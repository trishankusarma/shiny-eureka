import React, { useState , useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ChatIcon from '@material-ui/icons/Chat';
import PersonPinIcon from "@material-ui/icons/PersonPin";
import StudentHistory from "../StudentHistory"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import TeacherLayout from "../../../component/layout/teacher";
import PdfRender from "../../../component/shared/PdfRender";
import TestView from "../../../component/teacher/TestView";

import ViewQuestionMcq from '../ViewQuestionMcq'

import {getExamWritten , getExamMCQ ,logoutTeacher} from  "../../../redux/actions"
import { useHistory, useParams } from "react-router-dom";

import io from 'socket.io-client'

import queryString from 'query-string'

import { END_POINT } from '../../../helper/constants'

let socket

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce({location}) {
  
  const [ students , setStudents ] = useState(null)
  const [ cheatedStudents , setCheatedStudents ] = useState(null)

  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const  history=useHistory();
  const exams =useSelector(state=>state.exams);
  const {id}=useParams()

  const [ notification , setNotification ] = useState('')
  const [ sendNotification , setSendNotification ] = useState(false)

  const { examType } = queryString.parse(location.search)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(async() => {
     if(examType==='subjective')
       await dispatch(getExamWritten(id,history));
     else
       await dispatch(getExamMCQ(id,history));
  },[])

  useEffect(async ()=>{
    
    socket = io(END_POINT,{
      autoConnect:false
    })

    // console.log(socket)
    socket.connect()

    socket.emit('joinRoomTeacher', { examHall : exams.oneExam?.exam?.name})

    socket.on('studentsInRoom', (users)=>{
        console.log("studentsInRoom",users)
        setStudents(users)
    })

    socket.on('cheatedStudents', ({ cheatedStudents, students })=>{
        setCheatedStudents(cheatedStudents)
        setStudents( students )
    })

    return()=>{
      socket.on('disconnect');
      socket.off();
    } 

  },[END_POINT , window.search, exams.oneExam ])


  useEffect(() => {
        
         if(sendNotification){
              socket.emit("sendNotification",{
                   notification,
                   examHall : exams.oneExam?.exam?.name
              })

              setNotification('')
              setSendNotification(false)

         }
        
  }, [sendNotification])

  return (
    <TeacherLayout timer={true} logoutTeacher={logoutTeacher} dispatch={dispatch} useSelector={useSelector}>
      <div className={classes.root}>
        <AppBar position="static" color="default" >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="on"
            centered={true}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab style={{fontSize:".8rem"}} label="Student List" icon={<PersonPinIcon style={{height:"20px"}}/>} {...a11yProps(0)} />
            <Tab style={{fontSize:".8rem"}} label="Question Paper" icon={<MenuBookIcon style={{height:"20px"}} />} {...a11yProps(1)} />
            <Tab
            style={{fontSize:".8rem"}}
              label="Chat/Notice"
              icon={<ChatIcon style={{height:"20px"}} />}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
             <StudentHistory exams={exams} examType={examType} id={id}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            {
              examType==='subjective' ?
                <PdfRender exams={exams}/> :
                <ViewQuestionMcq exams={exams}/>
            }
        </TabPanel>
        <TabPanel value={value} index={2}>
             <TestView 
                 exams={exams} 
                 students={students} 
                 notification = {notification}
                 setNotification = {setNotification}
                 sendNotification = {sendNotification}
                 setSendNotification = {setSendNotification}
                 cheatedStudents = { cheatedStudents }
                 socket = { socket }
                 
             />
        </TabPanel>
      </div>
    </TeacherLayout>
  );
}
