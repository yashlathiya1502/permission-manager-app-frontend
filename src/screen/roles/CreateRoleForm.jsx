import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth/authApi';
import { createRole } from '../../api/roles';

const initialData = {
  name: '',
};

const RoleForm = ({handleClose}) => {
  const [formData, setFormData] = useState(initialData);
  const [errorMsg, setErrorMsg] = useState(initialData);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData(prev => ({...prev,[name]:value}))
    setErrorMsg(prev => ({...prev,[name]:''}))
  }

  const isValidate = () => {
    if(!formData.name.trim()){
        setErrorMsg(prev => ({...prev,name:'please enter name'}))
        return false
    }
    return true
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isValidate()){
        const res = await createRole(formData)
        if(res.success){
            handleClose();
        }
    }
  }

  return (
    <div style={{ margin: 'auto', width: '500px', textAlign: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <TextField
          name='name'
          label='name'
          variant='outlined'
          type='text'
          value={formData.name}
          onChange={handleChange}
          error={errorMsg.name}
          helperText={errorMsg.name}
        />
        <Button type='submit' variant='contained'>Create</Button>
      </form>
    </div>
  );
};

export default RoleForm;
