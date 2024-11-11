import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { registerUser } from '../../api/auth/authApi';
import { updateUser } from '../../api/users';
import { LoadingButton } from '@mui/lab';

const initialData = {
  userName: '',
  email: '',
  password: '',
  roleName: ''
};

const UserForm = ({ handleClose, roleList, selectedUser }) => {
  const [formData, setFormData] = useState(initialData);
  const [errorMsg, setErrorMsg] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg((prev) => ({ ...prev, [name]: '' }));
  };

  const isValidate = () => {
    if (!formData.userName.trim()) {
      setErrorMsg((prev) => ({ ...prev, userName: 'please enter username' }));
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMsg((prev) => ({ ...prev, email: 'please enter email' }));
      return false;
    }
    if (!selectedUser && !formData.password.trim()) {
      setErrorMsg((prev) => ({ ...prev, password: 'please enter password' }));
      return false;
    }
    if (!formData?.roleName && !formData?.roleName?.trim()) {
      setErrorMsg((prev) => ({ ...prev, roleName: 'please select role' }));
      return false;
    }
    return true;
  };

  const handleCreateUser = async() => {
    try {
      setLoading(true);
      const res = await registerUser(formData)
      if (res.success) {
        handleClose();
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handeUpdateUser = async () => {
    try {
      setLoading(true);
      const res = await updateUser(selectedUser?._id,formData)
      if (res.success) {
        handleClose();
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidate()) {
      if (selectedUser) {
        handeUpdateUser();
      } else {
        handleCreateUser();
      }
    }
  };

  const handleEditData = () => {
    const selectedRole = roleList?.find(
      (item) => item?._id === selectedUser?.role
    );
    setFormData((prev) => ({
      ...prev,
      userName: selectedUser?.userName,
      email: selectedUser?.email,
      roleName: selectedRole?.name
    }));
  };

  useEffect(() => {
    if (selectedUser) {
      handleEditData();
    }
  }, []);

  return (
    <div style={{ margin: 'auto', width: '500px', textAlign: 'center' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 , paddingTop: 16, paddingBottom:16}}
      >
        <TextField
          name='userName'
          label='userName'
          variant='outlined'
          type='text'
          value={formData.userName}
          onChange={handleChange}
          error={errorMsg.userName}
          helperText={errorMsg.userName}
        />
        <TextField
          name='email'
          label='email'
          variant='outlined'
          type='email'
          value={formData.email}
          onChange={handleChange}
          error={errorMsg.email}
          helperText={errorMsg.email}
        />
        {!selectedUser && <TextField
          name='password'
          label='password'
          variant='outlined'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={errorMsg.password}
          helperText={errorMsg.password}
        />}

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Role</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='roleName'
            value={formData.roleName}
            label='Role'
            onChange={handleChange}
            error={errorMsg.roleName}
            helperText={errorMsg.roleName}
          >
            {roleList?.map((item) => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <LoadingButton
            type='submit'
            color="primary"
            variant="contained"
            loading={loading} 
          >
            {selectedUser ? 'Update' : 'Create'}
          </LoadingButton>
      </form>
    </div>
  );
};

export default UserForm;
