import React,{ useEffect } from "react";
import TeacherLayout from "../../../component/layout/teacher";
import McqCreateForm from "../../../component/teacher/ExamForm";
import { makeStyles } from "@material-ui/core/styles";
import { useParams , useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutTeacher } from '../../../redux/actions'

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

const ExamsRoom = () => {
  const classes = useStyles();

  const { _classroomId } = useParams()

  const dispatch = useDispatch()

  const exams = useSelector((state)=>state.exams)

  const history = useHistory()

  useEffect(() => {

       if(!exams.created || !exams.objectiveExam) return

        history.replace(`/teacher/CreateMcq/${exams.objectiveExam._id}?examName=${exams.objectiveExam.name}`)
  }, [exams.created])

  return (
    <>
      <TeacherLayout dispatch={dispatch} logoutTeacher={logoutTeacher} useSelector={useSelector} >
        <div className={classes.card}>
          <McqCreateForm examType='objective' useSelector={useSelector}  _classroomId={_classroomId} dispatch={dispatch} exams={exams}/>
        </div>
    
      </TeacherLayout>
    </>
  );
};

export default ExamsRoom;
