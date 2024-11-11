import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth/authApi';
import AuthService from '../../utils/authServices';
import { useUser } from '../../context/userContext';

const initialData = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialData);
  const [errorMsg, setErrorMsg] = useState(initialData);
  const {setUserData} = useUser()

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData(prev => ({...prev,[name]:value}))
    setErrorMsg(prev => ({...prev,[name]:''}))
  }

  const isValidate = () => {
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
        const res = await loginUser(formData)
        if (res.success && res?.data) {
          const { accessToken, refreshToken, user } = res.data;
            setUserData(user);
            localStorage.setItem('user', JSON.stringify(user))
            AuthService.setTokens(accessToken, refreshToken);
            navigate('/');
          }
    }
  }

  return (
    <div style={{ margin: 'auto', width: '500px', textAlign: 'center' }}>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        <Button type='submit' variant='contained'>Login</Button>
      </form>
      <p>
        don't have an account <Link to={'/signup'}>signup</Link>
      </p>
    </div>
  );
};

export default Login;
