import React,{ useEffect , useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper,Tooltip } from '@material-ui/core';
import StudentNav from "../../../component/student/StudentNav/StudentNav"
import McqForm from "../../../component/student/McqFrom"

import { useHistory } from 'react-router-dom';

import { useDispatch , useSelector } from 'react-redux';

import { logoutStudent , getExamDetailsObjective , getStudentDetails , updateStudentDetails , examEnded , updateStudentMarks } from "../../../redux/actions";
import Loader from 'react-loader-spinner'

import queryString from 'query-string'

import Face from "../../../component/shared/FaceDetection/index"
import Modal from "../../../component/student/Modal"
import McqNavigation from '../../../component/student/McqNavigation';

import { Toastify } from "../../../App";

const useStyles = makeStyles((theme) => ({

    navi:{
        [theme.breakpoints.down('sm')]: {
          display:'none'
        }
    },

    root:{
    marginTop:"65px",
    [theme.breakpoints.down('sm')]: {
          marginTop:'-30px'
      }
    },
    ExamName:
    {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1.6rem',
        fontWeight: '600'
    },
    head:
    {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        width: '90%',
        margin: '0 auto'
    },
    paper1:
    {
        padding: '10px'
    },
    Details:
    {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paper3:
    {
        marginTop: '0px',
        padding: '5px'
    },
    heading:
    {
        fontSize: '1.4rem',
        fontWeight: '600'
    },
    face:
    {
        // width: '200px',
        // height: '200px',
        // marginTop: '20px'
    },
    // face1:
    // {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     [theme.breakpoints.down('sm')]: {
    //         display:'hidden'
    //     }
    // },
    name:
    {
        fontSize:'1.3rem',
        fontWeight:'500',
        [theme.breakpoints.down('sm')]: {
            fontSize:'.8rem',
        },
    }
}));

export default function SpacingGrid(props) {
    const classes = useStyles()

    const student = useSelector((state)=>state.student)

    const auth = useSelector((state)=>state.auth)

    const dispatch = useDispatch()

    const { exam_id , student_id  } = queryString.parse(props.location.search)

    const [Case, setCase] = React.useState(false);

    const history = useHistory()

    const [ index , setIndex ] = useState(
        localStorage.getItem('index') 
         ?  parseInt(localStorage.getItem('index')) 
         :  0
    )

    const [ response , setResponse ] = useState(null)

    const [ sectionNo , setSectionNo ] = useState(1)

    const [ totalAttepts , setTotalAttepts ] = useState(0)

    const [timeDuration, setTimeDuration] = useState(
        localStorage.getItem('submitStatus') ? parseInt(localStorage.getItem('submitStatus')) : null
    )

    useEffect(() => {

        dispatch(getStudentDetails(student_id))
         
         if(sectionNo===1){
            dispatch(getExamDetailsObjective( exam_id, "mcq", student.exam?.jumbleStatus ? student.studentMCQ?.jumbleOrderMcq[index].jumble : index ))
         }else{
            dispatch(getExamDetailsObjective( exam_id, "fillUp",  student.exam?.jumbleStatus ? student.studentMCQ?.jumbleOrderFillUp[index].jumble : index ))
         }

    }, [])

    useEffect(()=>{

        if(!student.studentMCQ)
              return 

        console.log('index',index)

        let INDEX = student.exam?.jumbleStatus ? parseInt(student.studentMCQ.jumbleOrderMcq[index].jumble) : index

        setResponse(student.studentMCQ.mcq[ INDEX ]['studentResponse'])

    },[student.studentMCQ])

    useEffect(() => {
        if (!auth.StudentAuthenticated) {
          return history.replace("/");
        }
    }, [auth.StudentAuthenticated]);

    const goToQuestion =async (idx) => {

        console.log(idx)

        if(!student.exam?.navigationStatus){
             return
        }

        dispatch(getExamDetailsObjective( exam_id, "mcq", student.exam?.jumbleStatus ? student.studentMCQ?.jumbleOrderMcq[idx].jumble : idx))
      
        setResponse(student.studentMCQ?.mcq[
            student.exam?.jumbleStatus ? parseInt(student.studentMCQ?.jumbleOrderMcq[idx].jumble) : idx
        ]['studentResponse'])
          
        setIndex(idx)
    }

    const submitAndGoNext =async (goal,lastIndex) => {


        console.log(index,lastIndex)

        if(student.examStatus===1){
            return
        }

        if(goal===1){
            await dispatch(updateStudentDetails(student_id, 
                student.exam?.jumbleStatus ? parseInt(student.studentMCQ?.jumbleOrderMcq[index].jumble) : index
            , response))
        }

        if(index+1===lastIndex)
             return

        setResponse(null)

        dispatch(getExamDetailsObjective( exam_id, "mcq", 
             student.exam?.jumbleStatus ? student.studentMCQ?.jumbleOrderMcq[index+1].jumble : index+1
        ))
    
        setResponse(student.studentMCQ.mcq[
            student.exam?.jumbleStatus ? parseInt(student.studentMCQ?.jumbleOrderMcq[index+1].jumble) : index+1
        ]['studentResponse'])

        localStorage.setItem("index",index+1)

        setIndex(index+1)
    }

    const goToPrev = async ()=>{

        if(!student.exam.navigationStatus){
            return
        }

        dispatch(getExamDetailsObjective( exam_id, "mcq", 
             student.exam?.jumbleStatus ? student.studentMCQ?.jumbleOrderMcq[index-1].jumble : index-1
        ))

        setResponse(student.studentMCQ?.mcq[
            student.exam?.jumbleStatus ? parseInt(student.studentMCQ?.jumbleOrderMcq[index-1].jumble) : index-1
        ]['studentResponse'])

        setIndex(index-1)
    }

    useEffect(() => {
        if (!student.exam) return;
        
        const hour = parseInt(student.exam.timeLength.split(":")[0]);
        const minute = parseInt(student.exam.timeLength.split(":")[1]);
        const startTime = student.exam.startTime;
    
        const timeDuration = (hour * 60 + minute) * 60000 + startTime;

        console.log(timeDuration)

        setTimeDuration(timeDuration)
        
        if((timeDuration - new Date().getTime())<0){

            examEnd()
        }
    
        const timeOut = setTimeout(()=>{

            examEnd()
            clearTimeout( timeOut )

        },[ timeDuration - new Date().getTime() ] )
    }, [student.exam, timeDuration]);

    const examEnd = ()=>{
         dispatch(examEnded())

         dispatch( logoutStudent() )

         Toastify("error", "Exam Ended!");

         dispatch(updateStudentMarks(student_id,exam_id))

         return history.replace("/");
    }

    const getSummary = async ()=>{

        if(!student.studentMCQ)
           return

        console.log( "student.studentMCQ" , student.studentMCQ)

        let attepts = 0

        await student.studentMCQ.mcq.forEach((mcq)=>{
             if(mcq.status)
                 attepts = attepts+1
        })
        setTotalAttepts(attepts)
    }

    return (
        <div className={classes.root}>
        <StudentNav 
           exam={student.exam}
           logoutStudent={logoutStudent}
           dispatch={dispatch}
           timeDuration={timeDuration}
           student={student}
           messageicon={true}
           Case={Case}
           setCase={setCase}
        />
        <div className={classes.header}>
        
            <Grid container style={{ postion: 'fixed' }}>
            <Grid xs={12} md={1} lg={1} className={classes.face1}>
                  
                  <div className={classes.navi}>
                      <McqNavigation 
                         studentMCQ = {student.studentMCQ}
                         jumbleStatus = {student.exam?.jumbleStatus}
                         goToQuestion = {goToQuestion}
                         index = {index} 
                      />
                  </div>

                  <div className={classes.face} style={{opacity:'0' , transforrmX:'-100px'}}>
                      <Face/>
                  </div>
          
          </Grid>
                <Grid xs={12} md={11} lg={11} className={classes.ExamName}>
                <div className={classes.head}>
                <p className={classes.name}>Exam Name: {student.examCode}</p>
              
              <Button variant="contained" color="secondary" style={{ height: '40px' }} onClick={getSummary}>
                
              
               <Modal mcq={true} examEnd={examEnd}  totalAttepts={totalAttepts} totalQuestions={student.studentMCQ?.mcq.length}>Finish</Modal>
            </Button>
            </div>

                {
                    student.mcqs && response

                    ?

                    <div className={classes.question}>
                        <McqForm 
                           mcq={student.mcqs[0]} 
                           index={index} 
                           setResponse={setResponse}
                           response={response}
                           lastIndex={student.studentMCQ?.mcq.length}
                           submitAndGoNext={submitAndGoNext}
                           goToPrev={goToPrev}
                           type={student.mcqs[0].mcq.mcqType}
                           navigationStatus={student.exam.navigationStatus}
                           examStatus={student.examStatus}
                           screenBlank = {student.screenBlank}
                        />
                    </div>
                    :
                    <Loader/>
                 }
                </Grid>

            </Grid>
        </div>
    </div>
    );
}
