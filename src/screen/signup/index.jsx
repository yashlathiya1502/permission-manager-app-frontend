import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth/authApi';

const initialData = {
  userName: '',
  email: '',
  password: '',
};

const Signup = () => {
  const [formData, setFormData] = useState(initialData);
  const [errorMsg, setErrorMsg] = useState(initialData);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData(prev => ({...prev,[name]:value}))
    setErrorMsg(prev => ({...prev,[name]:''}))
  }

  const isValidate = () => {
    if(!formData.userName.trim()){
        setErrorMsg(prev => ({...prev,userName:'please enter username'}))
        return false
    }
    if(!formData.email.trim()){
        setErrorMsg(prev => ({...prev,email:'please enter email'}))
        return false
    }
    if(!formData.password.trim()){
        setErrorMsg(prev => ({...prev,password:'please enter password'}))
        return false
    }
    return true
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isValidate()){
        const res = await registerUser(formData)
        if(res.success){
            navigate('/login');
        }
    }
  }

  return (
    <div style={{ margin: 'auto', width: '500px', textAlign: 'center' }}>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        <TextField
          name='password'
          label='password'
          variant='outlined'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={errorMsg.password}
          helperText={errorMsg.password}
        />
        <Button type='submit' variant='contained'>Signup</Button>
      </form>
      <p>
        already have an account <Link to={'/login'}>Login</Link>
      </p>
    </div>
  );
};

export default Signup;
