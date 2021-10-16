import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { createWrittenExam , createMCQExam } from "../../../redux/actions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {v4 as codeName} from "uuid";

import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Toastify } from "../../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(2),
      width: "90%",
      margin: "2.5% auto",
    },
  },
  header: {
    fontSize: "1.8rem",
    fontWeight: "500",
    width: "90%",
    margin: "2% auto",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  timer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function WrittenExamForm({ examType, _classroomId, dispatch, useSelector }) {
  const classes = useStyles();
  const history = useHistory();
  const [exam, setExam] = useState({
    name:'',
    code: codeName().substring(0,6),
    hour: "",
    minute: "",
    submissionTime: "",
    upload_question_paper: null,
    navigationStatus: true,
    jumbleStatus: false,
    classroom_id: _classroomId,
  });

  const {
    name,
    code,
    hour,
    minute,
    submissionTime,
    navigationStatus,
    jumbleStatus,
  } = exam;
  
  const exams= useSelector(state=>state.exams)
  const handleChange = (e) => {
    const { name } = e.target;

    if (name === "upload_question_paper") {
      console.log(e.target.files[0]);

      return setExam({
        ...exam,
        [name]: e.target.files[0],
      });
    }

    if (name === "navigationStatus" || name === "jumbleStatus") {
      return setExam({
        ...exam,
        [name]: e.target.checked,
      });
    }
    
    return setExam({
      ...exam,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (examType === "subjective") {

      if(!exam.upload_question_paper){
         
          Toastify("error","Plaease upload your answer script")
          return
      }

      var formData = new FormData();
      formData.append("classroom_id", exam.classroom_id);
      formData.append("hour", exam.hour);
      formData.append("minute", exam.minute);
      formData.append("name", `${exam.name}-${exam.code}`);
      formData.append("submissionTime", exam.submissionTime);
      formData.append("upload_question_paper", exam.upload_question_paper);
      return dispatch(createWrittenExam(exam.classroom_id,formData, history));
    }

    return dispatch(createMCQExam(exam.classroom_id,{ ...exam, name:`${exam.name}-${exam.code}` }, history))
  };
 

  if (exams.loading) {
     return   <div style={{width:'15%', margin:'200px auto'}}>
      <CircularProgressbar
                value={exams.progress}
                text={`${exams.progress}%`}
                styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: 'butt',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(0, 259, 0, ${exams.progress / 100})`,
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                })}
           />
     </div>
  }
  
  return (
    <Grid container>
      <Grid item xl={5} xs={12} lg={5} md={5} sm={5}>
        <img
          className={classes.img}
          src="https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </Grid>
      <Grid item xl={7} xs={12} lg={7} md={7} sm={7}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h3 className={classes.header}>{examType==="subjective" ? "Create written Exam": "create mcq form"}</h3>

          <div className={classes.timer}>
              <TextField
                required
                name="name"
                value={name}
                type='text'
                label="Exam name"
                variant="outlined"
                onChange={handleChange}
              />

              <TextField
                required
                disabled
                name="code"
                value={code}
                type='text'
                id="asdasds"
                label="Exam code"
                variant="outlined"
                onChange={handleChange}
              />
          </div>

          <div className={classes.timer}>
            <TextField
              required
              name="hour"
              value={hour}
              type="number"
              id="outlined-basic"
              label="Exam hour"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              required
              name="minute"
              value={minute}
              type="number"
              id="outlined-basic"
              label="Exam minute"
              variant="outlined"
              onChange={handleChange}
            />
          </div>

          {examType === "subjective" ? (
            <div>
              <TextField
                required 
                name="upload_question_paper"
                id="upload_exam"
                type="file"
                inputProps={{accept:"application/pdf"}}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                required
                name="submissionTime"
                value={submissionTime}
                number
                id="outlined-basic"
                label="Extra time(in min)"
                variant="outlined"
                onChange={handleChange}
                style={{marginTop:'20px'}}
              />
            </div>
          ) : (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={navigationStatus}
                    name="navigationStatus"
                  />
                }
                label="Allow Navigation"
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox checked={jumbleStatus} name="jumbleStatus" />
                }
                label="Allow Questions to jumble"
                onChange={handleChange}
              />
            </div>
          )}

          <center>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </center>
        </form>
      </Grid>
    </Grid>
  );
}
