import React, { useState, useEffect, Fragment } from 'react';
import { Paper, makeStyles, Typography, Button } from '@material-ui/core';
import InstituteForm from './helper/InstituteForm';
import InstituteCard from './helper/InstituteCard';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutSuperAdmin, getAllInstitutes } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paperC1: {
    padding: theme.spacing(0),
    margin: '4rem auto',
    maxWidth: '80vw',
    background: '#fff'
  },
  heading: {
    textAlign: 'center',
    color: 'blue',
    margin: '4rem 0'
  },
  btnLogout: {
    width: '100px',
    float: 'right',
    marginTop: '5px',
    marginRight: '40px',
    background: 'blue',
    color: '#fff'
  }
}));

const SuperDashboard = ({
  logoutSuperAdmin,
  getAllInstitutes,
  SuperAdminAuthenticated,
  institutes: { institutes, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    getAllInstitutes();
  }, [getAllInstitutes]);

  const [editState, setEditState] = useState(false);

  const toggleEditBtn = () => {
    console.log(editState);
    setEditState(!editState);
  };

  const deleteInstituteHandler = (email) => {
    const Institutes = [...institutes];
    const index = Institutes.findIndex((i) => {
      return i.email === email;
    });
    if (index === '-1') return;
    Institutes.splice(index, 1);
  };

  const changeHandler = (event) => {
    console.log('change attempted');
  };

  if (!SuperAdminAuthenticated) {
    console.log(SuperAdminAuthenticated);
    return <Redirect to='/api/hiddenPath/superLogin' />;
  }

  return (
    <Fragment>
    {institutes === null ? (
      <div>
      <Button
        type='submit'
        color='primary'
        className={classes.btnLogout}
        onClick={logoutSuperAdmin}
      >
        Sign Out
      </Button>
      </div>
    ) : (
    <div>
      <Button
        type='submit'
        color='primary'
        className={classes.btnLogout}
        onClick={logoutSuperAdmin}
      >
        Sign Out
      </Button>
      <Typography className={classes.heading} variant='h4' align='center'>
        SuperAdmin DashBoard
      </Typography>
      {institutes.map((institute, index) => {
        return (
          <div>
            <Paper elevation={2} className={classes.paperC1}>
              {editState ? (
                <InstituteForm
                  index={index + 1}
                  institute={institute}
                  click={() => toggleEditBtn(institute.emai)}
                  deleteOne={() => deleteInstituteHandler(institute.email)}
                />
              ) : (
                <InstituteCard
                  index={index + 1}
                  institute={institute}
                  changed={() => changeHandler()}
                  click={() => toggleEditBtn(institute.emai)}
                  deleteOne={() => deleteInstituteHandler(institute.email)}
                />
              )}
            </Paper>
          </div>
        );
      })}
    </div>
    )}
    </Fragment>
  );
};

SuperDashboard.propTypes = {
  logoutSuperAdmin: PropTypes.func.isRequired,
  getAllInstitutes: PropTypes.func.isRequired,
  SuperAdminAuthenticated: PropTypes.bool,
  institutes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  SuperAdminAuthenticated: state.auth.SuperAdminAuthenticated,
  institutes: state.institutes
});

export default connect(mapStateToProps, { logoutSuperAdmin, getAllInstitutes })(
  SuperDashboard
);
