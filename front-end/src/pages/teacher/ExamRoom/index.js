import React from "react";
import TeacherLayout from "../../../component/layout/teacher";
import ExamHalltabs from "../../../component/teacher/ExamHalltabs";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../component/shared/Loader"
import { logoutTeacher } from "../../../redux/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    marginTop: "2%",
  },
}));
const ExamHall = () => {
  const dispatch = useDispatch();
  
  const history = useHistory();
  const classes = useStyles();
  const teacherRoom = useSelector(state=>state.teacherRoom)
  if(teacherRoom.loading){
    return <Loader/>
  }
  return (
    <>
      <TeacherLayout  logoutTeacher={logoutTeacher}  dispatch={dispatch} useSelector={useSelector}>
        <div className={classes.root}>
          <Grid container>
            <Grid item xl={7} xs={12} lg={7} md={4} sm={7}>
              <div>asdasds</div>
            </Grid>
            <Grid item xl={4} xs={12} lg={4} md={4} sm={4}>
              <ExamHalltabs dispatch={dispatch} useSelector={useSelector} />
            </Grid>
          </Grid>
        </div>
      </TeacherLayout>
    </>
  );
};

export default ExamHall;
