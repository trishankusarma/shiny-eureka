import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    maxWidth: 600,
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },

  head:
  {
    // fontFamily:'Poppins',
    margin:"1rem auto"
,    fontSize: '2.8rem',
    fontWeight: '600',
    color:'#0063C6',
    [theme.breakpoints.down("md")]: {
      fontSize: '1.8rem',
    },
  },
  para:{
    margin:"1rem auto",
    fontSize: '1rem',
    fontWeight: '400',
    // fontFamily:'Open Sans',
    [theme.breakpoints.down("md")]: {
      fontSize: '1rem',
    },
  },
  
}));

export default function AboutUS() {
  const classes = useStyles();

  return (
    <div className='aboutUsScroll'>
      <div className={classes.root}>
        <Typography className={classes.head} gutterBottom>
          About Us
        </Typography>

        <Typography className={classes.para}  gutterBottom >
          Porrikkha is an exam platform that helps in efficient, proctored exam
          conduction in an online environment. With effective anti-cheat
          measures implemented through advanced digital technology, effective
          answer script checking, online rooms mimicking offline exam halls,
          amongst other features, it is an application that aims at improving
          the quality of education in online mode, by establishing remote
          proctoring, in exams appeared over distances.
        </Typography>
    
      </div>
    </div>
  );
}
