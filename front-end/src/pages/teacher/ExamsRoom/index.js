import React from "react";
import TeacherLayout from "../../../component/layout/teacher";
import HistoryExam from "../../../component/teacher/HistoryExam";
import PopOver from "../../../component/teacher/Popover";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutTeacher } from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1%",
  },
  options: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "3% 3%",
  },
}));

const ExamsRoom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _classroomId = useParams().id;
  const history=useHistory();
  const [value, setValue] = React.useState(0);
  
  return (
    <>
      <TeacherLayout
        // createRoom={createRoom}
        dispatch={dispatch}
        useSelector={useSelector}
        logoutTeacher={logoutTeacher}
        examType = { value }
      >
        <div className={classes.root}>
          <div className={classes.options}>
            <PopOver _classroomId={_classroomId}>
              {" "}
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
              >
                Create exam
              </Button>
            </PopOver>
          </div>
          <HistoryExam  history={history}_classroomId={_classroomId}  dispatch={dispatch} useSelector={useSelector} value={value} setValue={setValue}/>
        </div>
      </TeacherLayout>
    </>
  );
};

export default ExamsRoom;
