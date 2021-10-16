import React from "react";
import TeacherLayout from "../../../component/layout/teacher";
import EditExam from "../../../component/teacher/EditExam";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import { logoutTeacher } from "../../../redux/actions";

import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

const CreateWrittenExam = ({location}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const exams = useSelector((state) => state.exams);

  
  if (exams.loading) {
    return <div style={{width:'15%', margin:'200px auto'}}>
       <CircularProgressbar
               value={exams.progress}
               text={`${exams.progress}%`}
               styles={buildStyles({
                   rotation: 0.25,
                   strokeLinecap: 'butt',
                   textSize: '16px',
                   pathTransitionDuration: 0.5,
                   pathColor: `rgba(0, 255, 0, ${exams.progress / 100})`,
                   textColor: '#f88',
                   trailColor: '#d6d6d6',
                   backgroundColor: '#3e98c7',
               })}
          />;
    </div>
 }

  return (
    <>
      <TeacherLayout dispatch={dispatch} useSelector={useSelector} logoutTeacher={logoutTeacher}>
        <div className={classes.card}>
         <EditExam
              examType={queryString.parse(location.search).type}
              examId={id}
              exams={exams}
              dispatch={dispatch}
              useSelector={useSelector}
              _classroomId={queryString.parse(location.search)._classroomId}
          />
        </div>
      </TeacherLayout>
    </>
  );
};

export default CreateWrittenExam;
