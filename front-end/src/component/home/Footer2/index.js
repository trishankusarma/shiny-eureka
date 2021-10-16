import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper } from '@material-ui/core';
import image from '../../../assets/Porikkha_logo.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    footer:
    {
        backgroundColor: '#0e2f5a',
        width: '100%',
        marginTop:'40px',
        paddingTop : '40px',
        paddingBottom : '20px',
        color : 'white',
        paddingBottom:'0px'
    },
    root: {
        flexGrow: 1,
        width: '100%',
        margin: 'auto',
        padding:'10px',
        [theme.breakpoints.up('md')]: {
            width: '95%',
        },
    },
    paper: {
        height: 100,
    },
    logo: {
        width: "150px",
        [theme.breakpoints.up("lg")]: {
            width: "200px",
        },
    },
    icons:
    {
        fontSize:'2.4rem',
        marginRight:'10px',
        '&:hover': {
           color: "#44B5EB",
          },
    },
    text:{
         fontWeight:'400',
         fontSize:'1.1rem',
         marginLeft:0,
         transition:'marginLeft 10sec',
         '&:hover': {
            color: "#44B5EB",
          
            cursor:'pointer',
           },
    },
    lasttext:{
marginBottom:'0px',
padding:'5px',
marginTop:'10px',
textAlign:'center',
color:'#323232',
backgroundColor:'#AEAEAE'

    }
}));

export default function Footer() {

    const classes = useStyles();

    return (
        <div className={classes.footer}>
            {/* <center className={classes.center}>
                <Typography variant="h3" gutterBottom>
                    Footer
                </Typography>
            </center> */}
            <Grid container className={classes.root} spacing={7}>
                <Grid item xs={6} md={3}>

                    <img src={image} alt="logo" className={classes.logo} />

                </Grid>
                <Grid item xs={6} md={3}>
                    <div className={classes.item}>
                        <Typography variant="h5" gutterBottom>
                            Quick Link
                        </Typography>
                        <Typography  display="block" gutterBottom  className={classes.text}>
                            Home
                        </Typography> 
                        <Typography  display="block" gutterBottom  className={classes.text}>
                            Pricing
                        </Typography> 
                        <Typography  display="block" gutterBottom  className={classes.text}>
                            About US
                        </Typography> 
                        <Typography  display="block" gutterBottom className={classes.text} >
                      <Link to='/privacypolicy' target='' style={{textDecoration:'none',color:'white'}}>Privacy Policy</Link>      
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={6} md={3}>
                    <div className={classes.item}>
                        <Typography variant="h5" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography  display="block" gutterBottom>
                            Unnamedcreators.in
                        </Typography> 
                        <Typography variant="button" display="block" gutterBottom>
                        +91 86387 69969
                        </Typography> 
                        <Typography variant="button" display="block" gutterBottom>
                           NIT SILCHAR ,SILCHAR
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={6} md={3}>
                    <div className={classes.item}>
                        <Typography variant="h5" gutterBottom>
                            Quick Link
                            </Typography>
                       <div >
                        <FacebookIcon className={classes.icons}/>
                        <InstagramIcon className={classes.icons}/>
                        <LinkedInIcon className={classes.icons}/>
                        <MailIcon className={classes.icons}/> 
                       </div> 
                    </div>
                </Grid>

            </Grid>

<div className={classes.lasttext}>Unnamed Creators © 2021 - All Rights Reserved</div>
        </div>

    );
}
