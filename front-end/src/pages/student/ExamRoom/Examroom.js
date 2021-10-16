import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import StudentNav from "../../../component/student/StudentNav/StudentNav";
import screenfull from "screenfull";
import { Toastify } from "../../../App";
import notificationMp3 from "../../../assets/music/notification.mp3";
import { useDispatch, useSelector } from "react-redux";
import Timer from "../../../component/shared/Timer/index";
import {
  logoutStudent,
  getExamDetailsSubjective,
  getStudentUploadStatus,
  cheatDetected
} from "../../../redux/actions";

import queryString from "query-string";

import { useHistory } from "react-router-dom";

import Face from "../../../component/shared/FaceDetection/index";
import QuestionPaper from "../../../component/shared/QuestionPaper";

import DragAndDrop from "../../../component/shared/DragAnddrop";

import io from "socket.io-client";

import { END_POINT } from "../../../helper/constants";

let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(),
    overflow: "hidden",
    marginTop: "100px",
  },
  input: {
    display: "none",
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontWeight: "600",
    fontSize: "1.5rem",
    color:'white',

    [theme.breakpoints.down("sm")]: {
      height: "2rem",
      fontSize: "1.2rem",
      marginBottom: "1rem",
    },
  },
  paper2: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "80vh",
    width: "100%",
    margin:'auto auto'
  },
  paper3: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 300,
    marginBottom: "30px",
    width: "400px",
  },
  face: {
    visibility:"hidden",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 300,
    zIndex: "11",
    marginTop: "-100%",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: 300,
      marginBottom: "30px",
      marginTop: "-30%",
    },
  },
  paper4: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 100,
    marginBottom: 20,
  },
  select: {
    marginTop: "20px",
    backgroundColor: "#3f50b5",
    color: "white",
    "&:hover": {
      backgroundColor: "#002884",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "30px",
    backgroundColor: "#f8f9fa",
  },
  modal : {
    position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex:100,
    transform: "scale(1.1)",
    transition: "visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s"
},
modalContent : {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "3rem 1.5rem",
    width: "50vw",
    borderRadius: "0.5rem",
    [theme.breakpoints.down("sm")]: 
    {
        width:"70vw",
    },
}
}));

export default function ExamRoomStudent({ location, props }) {
  const classes = useStyles();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timeDuration, setTimeDuration] = useState(localStorage.getItem("submitStatus")? parseInt(localStorage.getItem("submitStatus")): null);
  const [Case, setCase] = React.useState(false);

  const [ openSubmitModel , setOpenSubmitModel ] = useState(false)
  const [ openLogoutModel , setOpenLogoutModel ] = useState(false)
  const [ openMessenger , setOpenMessenger ] = useState(false)

  const [ tabChangeDetect , setTabChangeDetect ] = useState(false)

  const [count, setCount] = useState(
    localStorage.getItem("count") ? parseInt(localStorage.getItem("count")) : 3
  );

  const [ enableFullScreen , setEnableFullScreen ] = useState(
    localStorage.getItem("enableFullScreen") && parseInt(localStorage.getItem("enableFullScreen"))===-1 ? -1 : 0
  )

  const dispatch = useDispatch();

  const history = useHistory();

  const { exam_id, student_id } = queryString.parse(location.search);

  const auth = useSelector((state) => state.auth);

  const student = useSelector((state) => state.student);

  const [notifications, setNotifications] = useState([]);
  
  const [ fullScreenTime , setFullScreenTime ] = useState(

      localStorage.getItem('fullScreenTime') ? parseInt( localStorage.getItem('fullScreenTime') ) : null
  )
  const [ restriction , setRestriction ] = useState(false)

  const [submitStatus, setSubmitStatus] = useState(
    localStorage.getItem("submitStatus")
      ? parseInt(localStorage.getItem("submitStatus"))
      : 0
  );

  const handleRestrictions = ()=>{
  
    if( !auth.StudentAuthenticated || 
        ( localStorage.getItem("enableFullScreen") && parseInt(localStorage.getItem("enableFullScreen"))===-1) 
    ){
        return
    }

    localStorage.setItem("enableFullScreen", -1);

    setEnableFullScreen(-1)

    Toastify("error", " You have been found violating our rules! ");

    setSubmitStatus(1);

    setTimerStarted(false);

    localStorage.setItem("submitStatus", new Date().getTime());

    setTimeDuration(new Date().getTime());

  }

  useEffect(() => {
    if (!auth.StudentAuthenticated){
          
        const student_id = localStorage.getItem('studentId')

        return history.replace(`/student/feedback?student_id=${student_id}`);
    }   
  }, [auth.StudentAuthenticated]);


  /*** screen controllers ****/
  function openFullscreen() {
    let element = document.querySelector("#screen");
    
    if(count!==0 && screenfull.isEnabled) {

      setFullScreenTime(null)

      if( localStorage.getItem('fullScreenTime') )
            localStorage.removeItem('fullScreenTime')

      screenfull.request(element, { navigationUI: "hide" })
    }

    if (count === 0) {

      handleRestrictions()
      
      return
    }
  }

  if (document.getElementById("screen")) {
    document
      .getElementById("screen")
      .addEventListener("fullscreenchange", (e) => {
        check();
      });
  }

  const check = () => {

    if (!screenfull.isFullscreen) {

      if ( parseInt( localStorage.getItem('count') ) === 0) {
      
        return
      }

      if( enableFullScreen%2===1 ){

          localStorage.setItem("enableFullScreen",  enableFullScreen+1 );
          setEnableFullScreen(enableFullScreen+1)

          if(!fullScreenTime){

            const curr_time_stamp = new Date().getTime()
        
            setFullScreenTime( curr_time_stamp )
    
            localStorage.setItem('fullScreenTime', curr_time_stamp )
      
            const timeout = setTimeout(() => {
                      
              if( localStorage.getItem('fullScreenTime') && ( parseInt( localStorage.getItem('fullScreenTime') )+30000 <= new Date().getTime() )){

                  setCount(0)
                  localStorage.setItem('count',0)
                  setRestriction(true)
        
                  handleRestrictions()
              }
                
                clearTimeout(timeout)
            }, [ 30000 ] );
          
          }
      }

      setCount(count - 1);

        localStorage.setItem("count", count - 1);

    } else {

      if( enableFullScreen%2=== 0){

        localStorage.setItem("enableFullScreen",  enableFullScreen+1 );
        setEnableFullScreen(enableFullScreen+1)
      }
    }
  };

  socket = io(END_POINT, {
    autoConnect: true
  });

  // these restrictions are commented out for now
  const leaveExamHall = ()=>{
    socket.emit("removeUser", {
      email: auth.student.email,
      examHall: student.examCode,
    });

    dispatch(logoutStudent());
    Toastify("error", "Exam Ended!");
  }

  const timeUp = (timeDuration)=>{
     
    localStorage.setItem('submitStatus',timeDuration)
            
    localStorage.setItem("enableFullScreen", -1);
    localStorage.setItem("count", 0);

    setEnableFullScreen(-1)
    setCount(0)
    setTimerStarted(false)
    setSubmitStatus(1)
  }

  useEffect(() => {
    if (
      !student.exam ||
      timerStarted ||
      !student.exam.submissionTime ||
      !student.exam.timeLength ||
      !student.exam.startTime || 
      !auth.StudentAuthenticated
    )
      return;

    setTimerStarted(true);

    let timeOut;

    const submissionTime = parseInt(student.exam.submissionTime);

    const hour = parseInt(student.exam.timeLength.split(":")[0]);
    const minute = parseInt(student.exam.timeLength.split(":")[1]);
    const startTime = student.exam.startTime;

    const timeDuration = (hour * 60 + minute) * 60000 + startTime;

    if (submitStatus === 0) {

      setTimeDuration(timeDuration);

      if(timeDuration > new Date().getTime()){

        timeOut = setTimeout(() => {

            timeUp(new Date().getTime())
            setTimeDuration(new Date().getTime())
           
       }, [timeDuration - new Date().getTime()]);
      }else{
          
            timeUp(timeDuration)
            setTimeDuration(timeDuration)
      }
      
    } else {
      clearTimeout(timeOut);
      
      screenfull.exit() 

      setTimeout(() => {

        Toastify("error", "Exam Ended!");

      }, [timeDuration - new Date().getTime() + submissionTime * 60000]);
    }
  }, [student, timeDuration]);

  useEffect(async () => {
    
    await dispatch(getExamDetailsSubjective(exam_id))

    await dispatch(getStudentUploadStatus(student_id))

    localStorage.setItem('count',count);

    const curr_time_stamp 
           =  fullScreenTime ? fullScreenTime : new Date().getTime()

    if(!fullScreenTime){
        
        setFullScreenTime( curr_time_stamp )

        localStorage.setItem('fullScreenTime', curr_time_stamp )
    }

    const timeout = setTimeout(() => {
              
       if( localStorage.getItem('fullScreenTime') && ( parseInt( localStorage.getItem('fullScreenTime') )+65000 <= new Date().getTime() )){
          setCount(0)
          localStorage.setItem('count',0)
        
          setRestriction(true)

          handleRestrictions()
       }
        
        clearTimeout(timeout)
    }, [ curr_time_stamp - new Date().getTime() + 65000 ] );
  }, []);

  useEffect(() => {

    // console.log(socket)
    socket.connect();

    const data = {
      name: auth.student.name,
      email: auth.student.email,
      student_id,
      examHall: student.examCode,
    };

    console.log(data);

    socket.emit("joinUser", data);

    return()=>{
      socket.on('disconnect');
      socket.off();
    } 
    
  }, [END_POINT, location.search]);

  useEffect(() => {
    socket.on("sendMessage", (message) => {
      Toastify("success", message);
    });

    socket.on("errorMessage", (message) => {
      Toastify("warning", message);
    });

    socket.on("getNotification", (notification) => {
      setNotifications([...notifications, notification]);
      setCase(true);
      const audio = new Audio(notificationMp3);
      audio.play();
    });

    socket.on("disqualifyStudent", ({ msg, email }) => {
      if (email === auth.student.email) {
        Toastify("warning", msg);

        timeUp(new Date().getTime())
        setTimeDuration(new Date().getTime())

        const audio = new Audio(notificationMp3);
        audio.play();
      }
    });

    socket.on("giveChance", ({ msg, email }) => {
      if (email === auth.student.email) {
        Toastify("warning", msg);

        setNotifications([...notifications, msg]);

        setCase(true);

        const audio = new Audio(notificationMp3);
        audio.play();
      }
    });

    socket.on("getIndivisualMessage", ({ msg, email, errorUploading }) => {
      if (email === auth.student.email) {
        Toastify("warning", msg);

        setNotifications([...notifications, msg]);

        setCase(true);

        const audio = new Audio(notificationMp3);
        audio.play();
      }
    });

  },[]);

 const tabChangeDetected = ()=>{
     
      dispatch( 
        cheatDetected("Attepted tab change!", socket, auth.student.email, student.examCode , 'tabChange')
      )

      setTabChangeDetect(true)
 }  

 useEffect(()=>{
    const interval = setInterval(()=>{

      if(parseInt(localStorage.getItem("enableFullScreen")) === -1){
          
          clearInterval( interval )
          return
      }
          
      if(!( document.hasFocus() || document.activeElement===document.getElementsByTagName('embed')[0])){
        
          tabChangeDetected()
      }

      if( document.activeElement===document.getElementsByTagName('embed')[0]){
          
          let embedTimeOut = setTimeout(()=>{

               document.activeElement.blur();
               clearTimeout(embedTimeOut)
          },[100])
      }
    },3000)
  },[])

  console.log(window.innerHeight , window.innerWidth)
  
  // socket?.onAny((event, ...args) => {
  //   console.log(event, args,"socket events");
  // });

  const handleSubmit = ()=>{

    setCount(0)
    localStorage.setItem('count',0)

    localStorage.setItem("enableFullScreen", -1);
    setEnableFullScreen(-1)

    setSubmitStatus(1);

    setTimerStarted(false);

    localStorage.setItem("submitStatus", new Date().getTime());

    setTimeDuration(new Date().getTime());

    screenfull.exit()

    console.log("handleSubmit")

  }

  return (
    <div className={classes.UpperContainer}>
      <div id="screen">
        <StudentNav
          dispatch={dispatch}
          logoutStudent={logoutStudent}
          notifications={notifications}
          Case={Case}
          setCase={setCase}
          student={student}
          timeDuration={timeDuration}
          messageicon={true}
          socket={socket}
          setOpenLogoutModel={ setOpenLogoutModel }
          openLogoutModel = { openLogoutModel }

          setOpenMessenger = { setOpenMessenger }
          openMessenger = { openMessenger }

          enableFullScreen = { enableFullScreen }
        />

          {
               tabChangeDetect ? 

               <div className={classes.modal}>

                    <center className = {classes.modalContent}>
                      
                        <Button 
                                  variant="outlined" 
                                  color="secondary" 
                                  style={{marginRight:"40px"}} 
                                  onClick = {()=>setTabChangeDetect(false)}   
                        >
                                Attepted to tab change! Click to start Exam!
                        </Button>      
                    </center>                 
               </div> :

               null
          }

        {(!timeDuration || timeDuration > new Date().getTime()) &&
        submitStatus === 0 ? (

          enableFullScreen!==-1 && enableFullScreen%2===1 ? 

          <div className={classes.root}>

            {
              openSubmitModel ?

              <div className = {classes.modal}>

                    <div className = {classes.modalContent}> 
                          <h4>Are You Sure you want to submit ?</h4>
                          
                          <p>Once You Submit You Can't See the Question Paper & Anti Cheat will be disabled</p>
                          <p>Upload the answer Script within the submission time provided by your teacher</p>
        
                          <Button 
                              variant="outlined" 
                              color="primary" 
                              style={{marginRight:"40px"}} 
                              onClick = {()=>setOpenSubmitModel(!openSubmitModel)}   
                          >
                                Cancel
                          </Button>    
                              
                          <Button
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit}
                          >
                                SUBMIT
                          </Button>
                    </div>
              </div>  :
              
              null
            }

            {
               openMessenger  ?
                      
                  <div className={ classes.modal }>

                       <div className = {classes.modalContent}>
                          <h2 id="transition-modal-title">Exam notification</h2>
                          
                          <div className={classes.notification}>

                            {notifications?.reverse().map((notification)=>{

                                  return( <p> { notification } </p> )  
                            })}
                          </div>
                       </div>
                  </div> 
                :
                null
            }

            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <Grid
              container
              spacing={3}
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={8} md={10}>
                <div className={classes.paper1}>
                  Exam Name : {student.exam?.name}
                </div>
              </Grid>
              <Grid item xs={4} md={2}>
                <Button 
                     variant="contained" 
                     color="primary"
                     onClick = {()=>setOpenSubmitModel(!openSubmitModel)}   
                >
                    { openSubmitModel ? " Cancel " : " Submit " }
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={12} md={10}>
                <Paper className={classes.paper2}>
                
                  <QuestionPaper fileId={student?.exam?.fileId} />
                </Paper>
              </Grid>
            </Grid>
          </div>
            
          :
             
         enableFullScreen!==-1 && enableFullScreen%2===0 ? 
           
        <div
              id="warning_fullscreen"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                flexDirection: "column",
              }}
            > 

              {
               restriction  
                ? 
                  <p>You are restricted to give your examination</p>
                :  
                 <Timer
                    bgcolor = { 'white' }
                    padding = { '1rem' }
                    color = { 'red' }
                    fontSize = { "1rem" }
                    height = { "20px" } 
                    hour = { 0 }
                    minute = { 0 }
                    second = { count === 3 ? 60 : 30 }
                    startTime={ fullScreenTime }
                />
              }

              <p>On your fullscreen mode within {count===3 ? 60 : 30 } seconds or else you will be disquilified</p>

              { 
              count===3
                ?
                    <p>you will be given only { count } chances</p>
                :
                    <p>you have {count} chance left</p>
              }

              <Button variant="contained" color="primary" onClick={openFullscreen} >
                 {
                   count===0 ? " Submit " : " Full Screen " 
                 }
              </Button>
        </div>  

        :  

          <div style={{ marginTop: "20vh" }}>
            <DragAndDrop
              timeDuration={timeDuration}
              submissionTime={parseInt(student.exam.submissionTime)}
              student={student}
              socket={socket}
              email={auth.student.email}
              examHall={student.examCode}
              leaveExamHall = {leaveExamHall}
            />
      </div>
        
        ) : (
          <div style={{ marginTop: "20vh" }}>
            <DragAndDrop
              timeDuration={timeDuration}
              submissionTime={parseInt(student.exam?.submissionTime)}
              student={student}
              socket={socket}
              email={auth.student.email}
              examHall={student.examCode}
              leaveExamHall = {leaveExamHall}
            />
          </div>
        )}
                       
            <Face
                socket={socket}
                email={auth.student.email}
                examHall={student.examCode}
                timeDuration={timeDuration}
            />

      </div>
    </div>
  );
}