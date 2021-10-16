import React, { useState } from 'react';
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Hidden,
  FormControlLabel,
  withStyles,
  Button,
  Checkbox
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

const InstituteCard = ({ institute, index, click, deleteOne }) => {
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
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item lg={1} xs={2}>
              <Typography align='center'>{index}.</Typography>
            </Grid>
            <Grid item lg={6} xs={10} container>
              <Grid lg={12} xs={12}>
                <Typography variant='h6'>{institute.name}</Typography>
              </Grid>
              <Grid lg={12} xs={12}>
                <Typography>{institute.email}</Typography>
              </Grid>
            </Grid>
            <Hidden lgUp>
              <Grid xs={2}></Grid>
            </Hidden>
            <Grid item lg={3} xs={5}>
              <Typography>City: {institute.city}</Typography>
              <Typography>State: {institute.state}</Typography>
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
              <Typography>Paid: {institute.paid}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={0} className={classes.btnC}>
          <Button
            className={classes.btnStyle}
            variant='contained'
            color='primary'
            onClick={click}
          >
            Edit
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

export default InstituteCard;
