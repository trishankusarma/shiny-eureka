import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        background:"#F3F3F3",
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width:'90%',
        borderRadius:'0rem',
        padding:'2.4rem',
        marginTop:"60px",
        [theme.breakpoints.down('md')]: {
            padding:'1.4rem',
            width:'85%',
            margin:'auto',
            marginTop:"50px",
        
          },
    },
    heading: {
        fontWeight: '600',
        fontSize: '2rem',
        color:'#0063C6',
    },
    textfield: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: '2rem'
    }
}));

export default function ContactUs() {
    const classes = useStyles();

    return (
      <div className='contactUsScroll'>
        <Paper className={classes.root} elevation={5}>
            <Typography className={classes.heading}>Contact Us</Typography>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="standard-basic" className={classes.textfield} label="Enter Name" />
                <TextField id="standard-basic" className={classes.textfield} label="Email Id" />
                <TextField id="standard-basic" className={classes.textfield} label="Mobile Number" />
                <TextField id="standard-basic" className={classes.textfield} label="Enter Your Institute Name" />
                <TextField
                    className={classes.textfield}
                    label="Enter your message"
                    multiline
                    rows={4}
                    variant="outlined"
                />
                <Button variant="contained" color="primary">
              submit
            </Button>
          </form>
        </Paper>
      </div>
    );
}
