import React, {useState} from 'react';
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginSuperAdmin } from '../../redux/actions';
import { Redirect } from 'react-router-dom';

const SuperLogin = ({ loginSuperAdmin, SuperAdminAuthenticated }) => {
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

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginSuperAdmin(email, password);
  };

  if (SuperAdminAuthenticated) {
    return <Redirect to='/api/hiddenPath/superDashboard' />;
  }
  
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>SuperAdmin Sign In</h2>
        </Grid>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            style={marginbottom}
            label='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            type='email'
            fullWidth
            required
          />
          <TextField
            style={marginbottom}
            label='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
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
            Sign in
          </Button>
        </form>
        <Typography style={margintop}>
          <Link href='#' display='block'>
            Forgot password ?
          </Link>
          <Link href='/api/hiddenPath/superSignup'>Create Super Admin ?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

SuperLogin.propTypes = {
  loginSuperAdmin: PropTypes.func.isRequired,
  SuperAdminAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  SuperAdminAuthenticated: state.auth.SuperAdminAuthenticated
})

export default connect(mapStateToProps, {loginSuperAdmin})(SuperLogin);
