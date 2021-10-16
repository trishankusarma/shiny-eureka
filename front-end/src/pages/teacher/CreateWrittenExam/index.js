import React from "react";
import TeacherLayout from "../../../component/layout/teacher";
import Editor from "../../../component/teacher/Editor";
import CreateExamForm from "../../../component/teacher/ExamForm";
import PopOver from "../../../component/teacher/Popover";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { logoutTeacher } from "../../../redux/actions";


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

const CreateWrittenExam = () => {
  const classes = useStyles();
  const item = [1, 2, 3, 4, 5];
  const dispatch = useDispatch()  
  const { _classroomId } = useParams()

  return (
    <>
      <TeacherLayout dispatch={dispatch} useSelector={useSelector} logoutTeacher={logoutTeacher}>
        <div className={classes.card}>
          <CreateExamForm dispatch={dispatch} useSelector={useSelector} examType='subjective' _classroomId={_classroomId}/>
        </div>
      </TeacherLayout>
    </>
  );
};

export default CreateWrittenExam;
