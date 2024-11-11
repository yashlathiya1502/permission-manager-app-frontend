import React, { useEffect, useState } from 'react';
import { deleteRole, fetchRoles, updateRolePermissions } from '../../api/roles';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import RoleForm from './CreateRoleForm';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useUser } from '../../context/userContext';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const RolesPage = () => {
  const [roleList, setRoleList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { hasPermission } = useUser();

  const getAllRoles = async () => {
    const res = await fetchRoles();
    if (res.success) {
      setRoleList(res.data);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const handleDelete = async(roleId) => {
    const res = await deleteRole(roleId)
    if(res.success){
        getAllRoles()
    }
  };

  const handlePermissionChange = async (roleId, permissionKey, value) => {
    const updatedPermissions = { [permissionKey]: value };
    const res = await updateRolePermissions(roleId, updatedPermissions);

    if (res.success) {
      getAllRoles();
    }
  };

  return (
    <Box sx={{ px: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Roles</h1>
        {hasPermission('create') && <Button variant='contained' onClick={() => setOpenDialog(true)}>
          Create Role
        </Button>}
      </Box>

      {hasPermission('view') ? <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>role name</TableCell>
              <TableCell align='right'>create</TableCell>
              <TableCell align='right'>update</TableCell>
              <TableCell align='right'>view</TableCell>
              <TableCell align='right'>delete</TableCell>
              {hasPermission('delete') && (<TableCell align='right'>Action</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
      {roleList?.map((role) => (
        <TableRow key={role._id}>
          <TableCell>{role.name}</TableCell>
          {['create', 'update', 'view', 'delete'].map((perm) => (
            <TableCell key={perm} align="right">
              <Checkbox
                checked={role[perm]}
                disabled={role.name === 'Admin'}
                onChange={(e) => handlePermissionChange(role._id, perm, e.target.checked)}
              />
            </TableCell>
          ))}
          {hasPermission('delete') && <TableCell align="right">
            <Button variant="contained" color="error" onClick={() => handleDelete(role._id)} disabled={role.name === 'Admin'}>
              Delete
            </Button>
          </TableCell>}
        </TableRow>
      ))}
    </TableBody>
        </Table>
      </TableContainer>
      :
      <Box>
        <h1 style={{textAlign:'center', marginTop:'50px'}}>You dont have permission to view roles.</h1>
      </Box>}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Role</DialogTitle>
        <DialogContent>
          <RoleForm
            handleClose={() => {
              setOpenDialog(false);
              getAllRoles();
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RolesPage;
