import React, { useEffect, useState } from 'react';
import { deleteUser, fetchUsers } from '../../api/users';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import UserForm from './UserForm';
import { fetchRoles } from '../../api/roles';
import { LoadingButton } from '@mui/lab';
import { useUser } from '../../context/userContext';

const UsersPage = () => {
  const [userList, setUserList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleList, setRoleList] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { hasPermission } = useUser();
  
  const getAllUsers = async () => {
    const res = await fetchUsers();
    if (res.success) {
      setUserList(res.data);
    }
  };

  const getAllRoles = async () => {
    const res = await fetchRoles();
    if (res.success) {
      setRoleList(res.data);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setLoadingDelete(true)
      const res = await deleteUser(userId);
      if (res.success) {
        getAllUsers();
        setOpenDeleteDialog(false);
        setSelectedUser(null)
      }
    } catch (error) {
      
    } finally {
      setLoadingDelete(false)
    }
  };

  const handleEdit = async (user) => {
    setSelectedUser(user)
    setOpenDialog(true)
  };

  useEffect(() => {
    if(hasPermission('view')){
      getAllUsers();
      getAllRoles();
    }
  }, []);

  const findRoleName = (roleId) => {
    const role = roleList?.find(role => role._id === roleId);
    return role?.name
  }

  return (
    <Box sx={{ px: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Users</h1>
        {hasPermission('create') && <Button variant='contained' onClick={() => setOpenDialog(true)}>
          Create User
        </Button>}
      </Box>
      {hasPermission('view') ? <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>user Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Role</TableCell>
              {(hasPermission('update') || hasPermission('delete')) && <TableCell align='right'>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row) => (
              <TableRow
                key={row?.email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row?.userName}
                </TableCell>
                <TableCell align='center'>{row?.email}</TableCell>
                <TableCell align='center'>{findRoleName(row?.role)}</TableCell>
                {(hasPermission('update') || hasPermission('delete')) && <TableCell align='right'>
                  <Box>
                    {hasPermission('update') && <Button
                      variant='contained'
                      sx={{ mr: 2 }}
                      onClick={() => handleEdit(row)}
                      disabled={row?.userName === 'Admin'}
                    >
                      Edit
                    </Button>}
                    {hasPermission('delete') && <Button
                      variant='contained'
                      color='error'
                      disabled={row?.userName === 'Admin'}
                      onClick={() => {setOpenDeleteDialog(true); setSelectedUser(row)}}
                    >
                      Delete
                    </Button>}
                  </Box>
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        :
      <Box>
        <h1 style={{textAlign:'center', marginTop:'50px'}}>You dont have permission to view users.</h1>
      </Box>}

      <Dialog open={openDialog} onClose={() => {setOpenDialog(false); setSelectedUser(null)}}>
        <DialogTitle>{selectedUser ? 'Update User' : 'Create User'}</DialogTitle>
        <DialogContent>
          <UserForm roleList={roleList} selectedUser={selectedUser} handleClose={() => {setOpenDialog(false); getAllUsers(); setSelectedUser(null)}}/>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => { setOpenDeleteDialog(false); setSelectedUser(null)}}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user "{selectedUser?.userName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDeleteDialog(false); setSelectedUser(null)}} color="primary">
            Cancel
          </Button>
          <LoadingButton
            onClick={() => handleDelete(selectedUser?._id)}
            color="error"
            variant="contained"
            loading={loadingDelete} 
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default UsersPage;
