import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import StudentNav from "../../../component/student/StudentNav/StudentNav";
import Loader from '../../../component/shared/Loader'
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { logoutStudent , studentSubExamEntry , studentObjExamEntry } from "../../../redux/actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginTop:'40px',
    "& > *": {
      margin: theme.spacing(1),
      width: "80%",
      margin: "1% auto",
    },
  },
  header: {
    fontSize: "2rem",
    fontWeight: "500",
    width: "80%",
    margin: "5% auto",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop:"10%"
    },
  },
  form: {
    display: "flex",
    flexDirection: "center",
    justifyContent: "center",
    alignItem: "center",
  },
  button: {
    width: "50%",
    marginTop:'5%',
    [theme.breakpoints.up("sm")]: {
      width: "30%",
    },
  },
  item:
  {
    [theme.breakpoints.down("sm")]: {
      marginTop:"5%"
    },
  }
}));

export default function StudentEntryForm() {

  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  const _student = useSelector((state) => state.student)

  const [student, setStudent] = useState({
      name    : auth.student.name,
      email   : auth.student.email,
      scholarId : _student.scholarId,
      examCode : _student.examCode,
      examType : _student.examType
  });

  const { name, email, scholarId, examCode, examType } = student

  const dispatch = useDispatch();

  const history = useHistory();

  const handleChange = (e)=>{
      setStudent({
          ...student,
          [e.target.name]:e.target.value
      })
  }

  useEffect(() => {
    if (!auth.StudentAuthenticated) {
      return history.replace("/");
    }
  }, [auth.StudentAuthenticated]);

  const handleSubmit = (e)=>{
      e.preventDefault()

      if(examType==='subjective')
          return dispatch(studentSubExamEntry(examCode,email,scholarId))
      
      return dispatch(studentObjExamEntry(examCode,email,scholarId))
  }

  const enterExamHall = () => { 
    // socket.connect();
    // socket.emit('join', { name, room:examCode }, (error) => {
    //   if(error) {
    //     alert(error);
    //   }
    // });
    history.push(`/student/ExamInstructions?student_id=${_student.student_id}&exam_id=${_student.exam_id}&examType=${examType}`)
  }

  return (
    <>
      <StudentNav dispatch={dispatch} logoutStudent={logoutStudent} />
     
      <Grid container className={classes.form}>
        <Grid item xl={7} xs={12} lg={7} md={7} sm={7}>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <h3 className={classes.header}>ENTRY TO EXAM</h3>

            <TextField
              id="outlined-basic1"
              label="Enter Your Name"
              variant="outlined"
              name='name'
              value={name}
              className={classes.item}
              readOnly
            />

            <TextField
              id="outlined-basic2"
              label="Enter Your email"
              variant="outlined"
              name='email'
              value={email}
              className={classes.item}
              readOnly
            />

            <TextField
              id="outlined-basic3"
              label="Exam Code"
              variant="outlined"
              name='examCode'
              className={classes.item}
              value={examCode}
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic4"
              label="Scholar ID"
              variant="outlined"
              name='scholarId'
              className={classes.item}
              value={scholarId}
              onChange={handleChange}
            />

            <TextField id="select" name='examType' label="Exam Type" value={examType} variant="outlined" onChange={handleChange} className={classes.item} select>
                <MenuItem value="subjective">subjective</MenuItem>
                <MenuItem value="objective">objective</MenuItem>
            </TextField>
            
           {
             _student.loading 
               ? <Loader loader={1} />
               :  
               _student.student_id 
               ?  
               <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={enterExamHall}
                >
                     Click to go to exam hall
                 </Button>
               : 
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type='submit'
                >
                  Check Exam status
                </Button>
           }
          </form>
        </Grid>
      </Grid>
    
    </>
  );
}