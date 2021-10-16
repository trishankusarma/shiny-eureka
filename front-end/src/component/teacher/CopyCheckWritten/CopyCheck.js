import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pdf from "./PdfRender";
import Loader from "../../shared/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:"98%",
    margin:"0 auto",
    // overflowX:Hidden,
  },
  paper1: {
    height: 700,
    overflow: "hidden",
    width: "98%",
    margin: "10px auto",
    marginRight:"10px",
    [theme.breakpoints.up("md")]: {
      height: 700,
    },
  },
  paper2: {
    height: 700,
    overflow: "hidden",
    width: "98%",
    margin: "10px auto",
    marginLeft:"10px",
    [theme.breakpoints.up("md")]: {
      height: 700,
    },
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid(props) {
  const classes = useStyles();
  console.log(props,"data")
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} lg={6}>
        <div className={classes.paper1}>
          {/* <Pdf linkIs={`https://drive.google.com/file/d/${props?.data?.student_sub?.exam.fileId}/preview`}/> */}
          {
            props?.data?.student_sub?.exam.fileId ?
               <Pdf linkIs={`https://drive.google.com/uc?id=${props?.data?.student_sub?.exam.fileId}#view=FitH&toolbar=0`} />
               :  <Loader />
          }
        </div>
      </Grid>
      <Grid item xs={12} sm={12} lg={6}>
        <div className={classes.paper2}>
          {/* <iframe
          frameborder="0"
          scrolling="no"
          seamless=""
          src={linkIs}
          style={{ width: "100%", height: "100%" }}></iframe> */}
          {
            props?.data?.student_sub?.answerScript ? 
               <Pdf linkIs={`https://drive.google.com/uc?id=${props?.data?.student_sub?.answerScript}#view=FitH&toolbar=0`} /> 
               : <Loader />
          }
        </div>
      </Grid>
    </Grid>
  );
}