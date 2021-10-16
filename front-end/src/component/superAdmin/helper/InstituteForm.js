import React, { useState } from 'react';
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Hidden,
  TextField,
  FormControlLabel,
  withStyles,
  Checkbox,
  Button
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '80vw',
    background: '#eee'
  },
  paperC: {
    padding: theme.spacing(0),
    margin: '0 auto',
    maxWidth: '80vw',
    background: '#fff'
  },
  heading: {
    textAlign: 'center',
    color: 'blue',
    margin: '4rem 0'
  },
  block: {
    display: 'block'
  },
  formControl: {
    width: '80%',
    marginLeft: '10px',
    paddingLeft: '5px',
    marginBottom: '15px'
  },
  btnStyle: {
    marginLeft: '1.5rem'
  },
  btnC: {
    textAlign: 'right',
    padding: theme.spacing(1.5)
  }
}));

const GreenCheckbox = withStyles({
  root: {
    color: red[600],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const InstituteForm = ({ institute, index, changed, click, deleteOne }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedG: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paperC}>
        <form>
          <Paper elevation={0} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item lg={1} xs={2}>
                <Typography align='center'>{index}.</Typography>
              </Grid>
              <Grid item lg={6} xs={10} container>
                <Grid lg={12} xs={12}>
                  <TextField
                    id='standard-full-width'
                    style={{
                      width: '85%',
                      marginBottom: '15px'
                    }}
                    label='Institute Name'
                    name='instituteName'
                    value={institute.name}
                    onChange={changed}
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid lg={12} xs={12}>
                  <TextField
                    id='standard-full-width'
                    style={{
                      width: '70%',
                      marginBottom: '5px'
                    }}
                    label='Institute Email'
                    name='email'
                    onChange={changed}
                    value={institute.email}
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
              <Hidden lgUp>
                <Grid xs={2}></Grid>
              </Hidden>
              <Grid item lg={3} xs={5}>
                <TextField
                  id='standard-full-width'
                  style={{
                    width: '80%',
                    marginLeft: '10px',
                    paddingLeft: '5px',
                    marginBottom: '15px'
                  }}
                  name='city'
                  label='City'
                  onChange={changed}
                  value={institute.city}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  id='standard-full-width'
                  style={{
                    width: '80%',
                    marginLeft: '10px',
                    paddingLeft: '5px',
                    marginBottom: '5px'
                  }}
                  name='state'
                  label='State'
                  onChange={changed}
                  value={institute.state}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item lg={2} xs={5}>
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={state.checkedG}
                      onChange={handleChange}
                      name='checkedG'
                    />
                  }
                  style={{
                    marginBottom: '20px',
                    marginTop: '10px',
                    marginLeft: '25px'
                  }}
                  label='Is Active'
                  labelPlacement='start'
                />
                <TextField
                  id='standard-full-width'
                  style={{
                    width: '80%',
                    marginLeft: '10px',
                    paddingLeft: '5px',
                    marginBottom: '5px'
                  }}
                  label='Paid'
                  name='paid'
                  onChange={changed}
                  value={institute.paid}
                  variant='outlined'
                  type='number'
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </form>
        <Paper elevation={0} className={classes.btnC}>
          <Button
            className={classes.btnStyle}
            variant='contained'
            color='primary'
            onClick={click}
          >
            Save
          </Button>
          <Button
            className={classes.btnStyle}
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={deleteOne}
          >
            Delete
          </Button>
        </Paper>
      </Paper>
    </div>
  );
};

export default InstituteForm;
