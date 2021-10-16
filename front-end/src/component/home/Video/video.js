import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Grid, Typography, Paper } from "@material-ui/core";
// import VideocamIcon from "@material-ui/icons/Videocam";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
// const video1 = "https://www.youtube.com/embed/E7wJTI-1dvQ";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    margin:"2rem auto",
    flexWrap: "wrap",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      width: "85%",
      margin:"4.1rem auto",
    },
  },
  left: {
    flex: "50%",
    color: "blue",
    [theme.breakpoints.up("md")]: {
      width: "100%",
      margin: "auto",
    },
  },
  right: {
    textAlign: "center",
    display: "flex",

    flex: "50%",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      width: "100%",
      margin: "auto",
    },
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight:'600',
    marginTop:'2rem',
    [theme.breakpoints.down("md")]: {
      fontSize: "1.7rem",
      fontWeight:'600',
    },
  },
  video: {
    minWidth: "85%",
    minHeight: "180px",
    borderRadius: "0.5rem",
    [theme.breakpoints.up("md")]: {
   
        height: "300px",
    },
  },
  button: {
    maxWidth: "100px",

    [theme.breakpoints.up("md")]: {},
  },
  body:{
    fontSize:"0.95rem",
    [theme.breakpoints.up("md")]: {
      fontSize:"1rem",
    },
  },
  head:{
    marginTop:'1rem',
    fontWeight:'600',
    color:'#0063C6',
    fontSize:'2.8rem',
    [theme.breakpoints.down("md")]: {
     fontSize:'1.5rem'
    },
  },
  buttonCon:{
    display:'flex',
    justifyContent:'flex-end',
    [theme.breakpoints.down("md")]: {
      justifyContent:'center',
    },
  }
}));

export default function VideoElement() {
  const classes = useStyles();

  return (
    <div style={{margin:'2rem auto'}}>
    <center><Typography className={classes.head}>Complete Online Exam Management System</Typography></center>
      <div className={classes.container}>
        <div className={classes.left}>
          {/* <video
            className={classes.video}
            src={video1}
            controls="controls"
            autoplay="true"
          /> */}
        <iframe src='https://www.youtube.com/embed/oRjqoGDqdwo'
       
        allow='autoplay; encrypted-media'
        className={classes.video}
        title='video'
/>
        </div>
  
        <div className={classes.right}>
          <div className={classes.heading}>Why Porikkha ?</div>
          <p className={classes.body}>
          With online classes taking over offline ones, especially with the pandemic situation enveloping the globe, the quality of education is under threat of degradation. With no proper platform for conduction of proctored exams, learning is being compromised. The team behind Porikkha, has realised the imminent danger of the situation and brought forward this application by incorporating a whole array of services that provide anti-cheat, efficient answer script checking and more.
          </p>
         
            <div className={classes.buttonCon}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Explore
            </Button>
            </div>
          
        </div>
      </div>
    </div>
  );
}
