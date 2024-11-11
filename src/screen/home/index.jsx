import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import { useUser } from '../../context/userContext';

const Home = () => {
  const { user } = useUser();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        padding: 2
      }}
    >
      <Paper sx={{ width: '100%', maxWidth: 600 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <CardContent>
            <Typography variant='h4' component='h1' gutterBottom>
              Welcome, {user?.userName}!
            </Typography>
            <Typography variant='h6' color='textSecondary' gutterBottom>
              User Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='body1' fontWeight='bold'>
                  User Name:
                </Typography>
                <Typography variant='body1'>{user?.userName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1' fontWeight='bold'>
                  Email:
                </Typography>
                <Typography variant='body1'>{user?.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1' fontWeight='bold'>
                  Role:
                </Typography>
                <Typography variant='body1'>{user?.role?.name}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default Home;
