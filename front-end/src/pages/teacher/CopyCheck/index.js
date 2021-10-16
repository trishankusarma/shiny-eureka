import React from 'react'
import Collap from "../../../component/teacher/CopyCheck/CopyCheck"
import { makeStyles } from '@material-ui/core/styles';
import TopBar from "../../../component/teacher/TopBar1"
import StudentDetails from "../../../component/teacher/CopyCheck/studentDetails"
import QuestionEntry from "../../../component/teacher/CopyCheck/QuestionEntry"
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { logoutTeacher } from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  studentdet:
  {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'40px'
  },
  button:
  {
    margintop:'10px',
    marginBottom:'10px',
  }
    
  }));

function Index() {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
      <div className={classes.root}>
        <div className={classes.topbar}>
        <TopBar 
          dispatch={dispatch}
        useSelector={useSelector}
        logoutTeacher={logoutTeacher}
        />
      </div>
      <div className={classes.studentdet}>
        <StudentDetails />
        <QuestionEntry />
      </div>
        <div className={classes.collap}>
           <Collap /> 
        </div>
        <center>
        <Button variant="contained" color="primary" className={classes.button}>
          Submit Marks
        </Button>
      </center>
      </div>
      
    )
}

export default Index
