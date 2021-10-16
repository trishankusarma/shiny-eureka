import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, useTheme, Paper } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Image1 from '../../../assets/HomepageIcons/Classroom.png'
import Image2 from '../../../assets/HomepageIcons/System Information.png'
import Image3 from '../../../assets/HomepageIcons/Webcam.png'
import Image4 from '../../../assets/HomepageIcons/Test Results.png'
import Image5 from '../../../assets/HomepageIcons/Student Registration.png'
import Image6 from '../../../assets/HomepageIcons/Exam.png'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "85%",
    margin: "2rem auto",
    // gridGap: theme.spacing(7),
    [theme.breakpoints.down("md")]: {
      width: "90%",
      // gridGap: theme.spacing(1),
    },
  },
  content:
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:"center",
    padding:"1rem",
    cursor:'pointer',
    height:'450px',
    '&:hover': {
      transition: 'all .25s linear',
      boxShadow: '-1px 4px 15px 0px rgba(0,0,0,0.8)',
   },
   [theme.breakpoints.down("md")]: {
    height:'240px'
  },
  },
  head: {
    textAlign:"center",
    width:"80%",
    // fontFamily:'Poppins',
    margin:"1rem auto"
,    fontSize: '1.8rem',
    fontWeight: '600',
    color:'#0063C6',
    [theme.breakpoints.down("md")]: {
      fontSize: '1rem',
    },
  },
  para:{
    textAlign:"center",
    width:"80%",
    margin:"1rem auto",
    fontSize: '1rem',
    fontWeight: '400',
    // fontFamily:'Open Sans',
    [theme.breakpoints.down("md")]: {
      fontSize: '.5rem',
    },
  },
  image:{
    width:'150px',
    height:'150px',
    [theme.breakpoints.down("md")]: {
      width:'100px',
      height:'100px'
    },
  }
}));

export default function KeyFeatures() {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className='keyFreatureScroll'>

      <Grid container className={classes.root} spacing={isSmall ? 2 : 7} direction="row">
        <Grid item xs={6} md={4} item>
          <Paper className={classes.content}>
            <img src={Image1} alt="classroom" className={classes.image}/>
            <div className={classes.head}>Offline Like Environment</div>
            <div className={classes.para}>Interface designed to give offline feel in online mode. Ease of access for teachers as well as students</div>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4} item>
          <Paper className={classes.content}>
            <img src={Image2} alt="classroom" className={classes.image}/>
            <div className={classes.head}>Systematic Evaluation</div>
            <div className={classes.para}>Efficient answer script checking with systematic arrangement of answer scripts and automated system of totalling scores.</div>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4} item>
          <Paper className={classes.content}>
            <img src={Image3} alt="classroom" className={classes.image}/>
            <div className={classes.head}>Proctored Environment</div>
            <div className={classes.para}>Advanced ML model focuses on anti-cheat by checking on the camera frame and disqualification in occasions, when the number of times tabs are changed, exceeds a given value.</div>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4} item>
          <Paper className={classes.content}>
            <img src={Image4} alt="classroom" className={classes.image}/>
            <div className={classes.head}>Differentiated  exam halls</div>
            <div className={classes.para}>Subject and teacher-specific exam halls can be created for better organisation while exams are being conducted.</div>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4} item>
          <Paper className={classes.content}>
            <img src={Image5} alt="classroom" className={classes.image}/>
            <div className={classes.head}>Easy Registration</div>
            <div className={classes.para}>Everything from candidate registration and seat planning to test centre selection and payment integration–manage everything from a single dashboard. </div>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4} item>
          <Paper className={classes.content}>
            <img src={Image6} alt="classroom" className={classes.image}/>
            <div className={classes.head}>Instant Results</div>
            <div className={classes.para}>Publish result to portal as spreadsheet or directly into the result portal of institution</div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
