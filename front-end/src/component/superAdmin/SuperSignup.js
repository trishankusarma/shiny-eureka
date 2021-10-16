import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const SuperLogin = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 280,
    margin: '20px auto'
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };
  const margintop = { marginTop: '5px' };
  const marginbottom = { marginBottom: '5px' };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>SuperAdmin Sign Up</h2>
        </Grid>
        <TextField
          style={marginbottom}
          label='Username'
          placeholder='Enter Admin Name'
          fullWidth
          required
        />
        <TextField
          style={marginbottom}
          label='Email'
          placeholder='Enter Email'
          type='email'
          fullWidth
          required
        />
        <TextField
          style={marginbottom}
          label='Password'
          placeholder='Enter password'
          type='password'
          fullWidth
          required
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={btnstyle}
          fullWidth
        >
          Sign Up
        </Button>
        <Typography style={margintop}>
          <Link href='/api/hiddenPath/superLogin'>Sign In Instead ?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SuperLogin;
