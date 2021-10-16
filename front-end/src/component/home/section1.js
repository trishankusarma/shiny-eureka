
import React from 'react';
import { makeStyles,Grid, Typography,Button } from '@material-ui/core';
import Image from '../../assets/Section1Page.png';
import { fontWeight } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:'100%',
    margin:'2rem auto'
  },
  text:
  {
    width:'80%',
    margin:'1rem auto',
    display:'flex',
    flexDirection:'column',
    alignContent:'space-between',
    [theme.breakpoints.down('md')]: {
       alignContent:"center",
       alignItems:'center',
       width:'90%',
    },
  },
  heading:
  {
    fontSize:'3.3rem',
    fontWeight:"600",
    // fontFamily:'Oswald',
    [theme.breakpoints.down('md')]: {
      fontSize:'2rem'
   },
  },
  para:
  {
    width:'80%',
    marginTop:'1.4rem',
    fontSize:'1.5rem',
    fontWeight:'600',
    // fontFamily:'Open Sans',
    [theme.breakpoints.down('md')]: {
      fontSize:'1rem'
   },
  },
  Button:
  {
    marginTop:'2rem',
    width:'30%',
    [theme.breakpoints.down('md')]: {
      width:'50%',
   },
  }

 
}));

export default function SectionOne({ scrollToAboutUs }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
       <Grid container justifyContent="center" alignItems="center" >
            <Grid xs={12} lg={6} md={6} item>

              <div className={classes.text}>     
              <Typography className={classes.heading}>Enhancing the quality of online exam</Typography> 
                  <Typography className={classes.para}>Conduct online AI proctored Online examination with ease, manage all records 
                  and answer scripts at your fingertips.</Typography>
                  <Button color="primary" variant="outlined" className={classes.Button}>view Demo</Button>
              </div>

            </Grid>
            <Grid xs={10} lg={5} md={5} item style={{width:'90%', margin:'auto'}}>
                <img src={Image} alt="backgorund" style={{width:'100%',height:'100%'}}/> 
            </Grid>
       </Grid>
    </div>
  );
}
