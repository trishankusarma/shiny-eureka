import React, { useEffect , useState } from "react";
import StudentNav from "../../../component/student/StudentNav/StudentNav";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutStudent,
  getExamDetailsSubjective,
  getExamDetailsObjective,
  examStarted,
} from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import parse from "html-react-parser";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button } from "@material-ui/core";

import { Toastify } from "../../../App";
import io from "socket.io-client";

import { END_POINT } from "../../../helper/constants";

import Face from '../../../component/shared/FaceDetection'

let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "70px",
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    width: "90%",
    height: "100%",
    margin: "20px auto",
  },
  text: {
    textAlign: "start",
    marginLeft: "10px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  paper2: {
    width: "90%",
    padding: "10px",
    marginTop: "10px",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  instructions: {
    margin: "30px 20px",
  },
  head: {
    margin: "20px 0 20px 0",
    fontWeight: "600",
  },
  instr: {
    // textDecoration:'underline'
    fontWeight: "520",
    marginTop: "30px",
  },
}));

export default function ExamInstructions({ location }) {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  const student = useSelector((state) => state.student);

  const [ runTest , setRunTest ] = useState(
    localStorage.getItem("testMessage") ? true  : false
  )

  const [ testMessage , setTestMessage ] = useState(
      localStorage.getItem("testMessage") ? parseInt( localStorage.getItem("testMessage"))  : null
  )

  const { exam_id, student_id, examType } = queryString.parse(location.search);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!auth.StudentAuthenticated) {
      return history.replace("/");
    }
  }, [auth.StudentAuthenticated]);

  useEffect(() => {
    if (examType === "subjective")
      return dispatch(getExamDetailsSubjective(exam_id));

    dispatch(getExamDetailsObjective(exam_id, "basic"));
  }, []);

  useEffect(() => {
    
    socket = io(END_POINT,{
      autoConnect:false
    })

    // console.log(socket)
    socket.connect()

    const data = {
      name: auth.student.name,
      email: auth.student.email,
      student_id,
      examHall: student.examCode,
    };

    console.log(data);

    socket.emit("joinUser", data);

    socket.on("sendMessage", (message) => {
      Toastify("success", message);
    });

    socket.on("errorMessage", (message) => {
      Toastify("warning", message);
    });

    socket.on("examStarted", (message) => {
      dispatch(examStarted());

      Toastify("success", message);
    });

    return()=>{
      socket.on('disconnect');
      socket.off();
    } 
        
  }, [END_POINT, location.search]);

  const enterExamHall = () => {
    if (examType === "subjective")
      return history.replace(
        `/student/ExamRoomStudent?exam_id=${exam_id}&student_id=${student_id}`
      );
    else
      return history.replace(
        `/student/mcqForm?exam_id=${exam_id}&student_id=${student_id}`
      );
  };

  const startCam = ()=>{

      console.log("hii")

      setRunTest(true)
  }

  return (
    <>
      <StudentNav dispatch={dispatch} logoutStudent={logoutStudent} socket={socket}/>

      <div className={classes.root}>

        <Paper elevation={3} className={classes.paper}>

          <center>

            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.head}
            >

              Note For Student
            </Typography>

            <Paper elevation={3} className={classes.paper2}>
              {student.exam ? (
                <div>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.text}
                  >
                    ClassRoom Name :{" "}
                    <span> {student.exam.classroom.name} </span>
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.text}
                  >
                    ExamName : <span>{student.exam.name}</span>
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.text}
                  >
                    TimeLength : <span> {student.exam.timeLength}</span>
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.text}
                  >
                    ClassRoom Name : <span></span>
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.text}
                  >
                    ExamName : <span></span>
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.text}
                  >
                    TimeLength : <span></span>
                  </Typography>
                </div>
              )}
            </Paper>
          </center>

          <br/>

          <center>
              
              {
                  runTest ? 

                  <Face 
                      forTesting = { true }
                      setTestMessage = { setTestMessage }
                      testMessage = { testMessage }
                  />  :
                  
                  <Button 
                    variant="contained"
                    color="primary"
                    onClick={startCam}
                  >
                      Click to test camera
                  </Button>
              }

                
                <div >
                      { 
                         runTest ? 
                         testMessage === 1  ? 

                         <Button style={{ color:'green' }}>
                             " Successfully alligned! You can now give your exam! " 
                         </Button>
                         :  
                          testMessage !== null ?
                         
                         <Button style={{ color:'red' }}>
                              Error : { testMessage }
                          </Button> :

                          <Button style={{ color:'blue' }}>
                                It may take upto few minutes....
                                Make sure to keep yourself align with perfect lighting and clear background
                          </Button>      
                       : null                    
                      }
                </div> 


          </center>

          <div className={classes.instructions}>
            <Typography
              gutterBottom
              variant="h5"
              display="block"
              color="secondary"
              className={classes.instr}
            >
              Instuctions from your Teacher:
            </Typography>

            {student.exam ? (
              <div>
                <Typography gutterBottom>
                  {student.exam.instruction
                    ? parse(student.exam.instruction)
                    : null}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography gutterBottom></Typography>
              </div>
            )}

            <Typography
              gutterBottom
              variant="h5"
              display="block"
              color="secondary"
              className={classes.instr}
            >
              WARNING
            </Typography>
            <div>
              Make sure you appear for the online exam sitting alone in a
              well-lit room with no background noise during the entire process
              of the exam without any mobile devices or any other electronic
              devices. (ML models shall detect more than one face if any and
              also any electronic gadget used and disqualify you).And It will take 
              screenshots of your face at random time .
            </div>
            <Typography
              gutterBottom
              variant="h5"
              display="block"
              color="secondary"
              className={classes.instr}
            >
              Don’t
            </Typography>
            <div>
              <ol>
                <li>
                  {" "}
                  Do not resize or minimize the browser during the online exam.{" "}
                </li>
                <li>
                  Do not close the browser during the test before your exam is
                  complete.{" "}
                </li>
                <li>
                  Do not click the ‘BACK’ button of the browser during the exam.{" "}
                </li>
                <li>
                  Do not bring any other face in the camera frame, make sure you
                  are alone.
                </li>
                <li>
                  {" "}
                  Do not use any electronic gadget other than the one where you
                  are appearing for exam.{" "}
                </li>
              </ol>
            </div>

            <Typography
              gutterBottom
              variant="h5"
              display="block"
              color="secondary"
              className={classes.instr}
            >
              Do
            </Typography>
            <ol>
            <li>
                {" "}
               If anything gone wrong refresh the browser once or contact to your instructor
              </li>
              <li>
                {" "}
                Keep an eye on the TIMER CLOCK on the top left of the online
                exam page of the browser to keep a track of the time left.
              </li>
              <li>
                After finishing the exam, click on the submit button at the
                bottom of the browser page.{" "}
              </li>
              <li>
                Once submitted, a message shall be displayed “Your Exam has been
                submitted successfully and you can log out from the student
                online portal.
              </li>
            </ol>
          </div>
          <center style={{ marginBottom: "30px" }}>
            {student.exam ? (
              student.exam.status ? (

                  testMessage===1 ?
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={enterExamHall}
                    >
                      Enter ExamHall
                    </Button> :
                     <Button
                        variant="contained"
                        color="red"
                        onClick={enterExamHall}
                    >
                      Enter ExamHall? Recommended to test your camera first!
                    </Button>
                    
              ) : (
                <Button variant="contained" color="primary">
                  Exam has not started
                </Button>
              )
            ) : (
              <Button variant="contained" color="primary">
                Exam has not started
              </Button>
            )}
          </center>
        </Paper>
      </div>
    </>
  );
}
