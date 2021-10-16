import React, { useState , useEffect } from "react";
import TeacherLayout from "../../../component/layout/teacher";
import Editor from "../../../component/teacher/Editor";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { logoutTeacher,editExamObjective , editExamWritten , getAllExamsObjective , getAllExamsSubjective } from '../../../redux/actions'

import { useParams , useHistory } from "react-router-dom";

import queryString from 'query-string'

import Loader from 'react-loader-spinner'

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #aaaaaa",
    width: "60%",
    margin: "4% auto",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
}));

const Instruction = ({location}) => {

  const history = useHistory()

  const { id , roomId } = useParams()

  const classes = useStyles();
  const dispatch = useDispatch();

  const exams = useSelector((state)=>state.exams)

  const [ submit , setSubmit ] = useState(false)
  
  const [instruction , setInstruction] = useState('-1')

  const { type } = queryString.parse(location.search)

  useEffect(()=>{

    if (type==='subjective') {

      if(exams.subjectiveExams){
        
      
        const exam = exams.subjectiveExams.filter((EXAM)=>EXAM.exam._id===id)

        setInstruction(exam[0].exam.instruction)
        
        return
      }

      dispatch(getAllExamsSubjective(roomId));
    } else {

      if(exams.objectiveExams){

        const exam = exams.objectiveExams.filter((EXAM)=>EXAM.exam._id===id)

        console.log('exam',exam)

        setInstruction(exam[0].exam.instruction)     
        return
      }

      dispatch(getAllExamsObjective(roomId));
    }
  },[exams.objectiveExams , exams.subjectiveExams])

  useEffect(() => {

     if(!submit) return

     if(type==='objective'){

          const data = {
            instruction ,
            _id:id
          }
       
          dispatch(editExamObjective(data,history,roomId))
     }else{

          var formData = new FormData()

          formData.append('editType','ONLY_INSTRUCTION')
          formData.append('instruction',instruction)          
          
          dispatch(editExamWritten(id,roomId,formData,history))
     }
  }, [submit])

  return (
    <>
      <TeacherLayout logoutTeacher={logoutTeacher} dispatch={dispatch} useSelector={useSelector}>
        <div className={classes.card}>
          <center>
            <h2>Instructions to Students</h2>
          </center>
          {
            instruction!=='-1' ?
            <Editor
                dispatch={dispatch}
                useSelector={useSelector}
                location={window.location}
                height={"75vh"}
                setInstruction={setInstruction}
                setSubmit={setSubmit}
                content={instruction}
            />
            : 
            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Loader />
            </div>
          }
        </div>
      </TeacherLayout>
    </>
  );
};

export default Instruction;