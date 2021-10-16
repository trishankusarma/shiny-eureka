import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory , useParams } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Loader from "react-loader-spinner";
import Editor from "../../teacher/Editor";

import { getAllExamsSubjective , getAllExamsObjective, editExamWritten, editExamObjective } from '../../../redux/actions'

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
    width: "80%",
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
  instru:
  {
    color:'grey',
    fontSize:'0.8rem'
  }
}));

export default function WrittenExamForm(props) {

  const {
    examType,
    dispatch,
    examId,
    exams,
    _classroomId
  } = props

  const [exam, setExam] = useState({
    name:'',
    hour:0,
    minute:0,
    instruction:null,
    submissionTime:'',
    navigationStatus:'',
    jumblingStatus:'',
  })

  const [ submit , setSubmit ] = useState(false)

  const classes = useStyles();
  const history = useHistory();

  useEffect(()=>{

    if (examType==='subjective') {

      if(exams.subjectiveExams){
      
        const exam = exams.subjectiveExams.filter((EXAM)=>EXAM.exam._id===examId)

        setExam({
          name: exam[0].exam.name,
          hour: parseInt( exam[0].exam.timeLength.split(':')[0] ),
          minute: parseInt( exam[0].exam.timeLength.split(':')[1] ),
          submissionTime: exam[0].exam.submissionTime,
          upload_question_paper: null,
          instruction: exam[0].exam.instruction ? exam[0].exam.instruction : 'Write your instruction here....',
          questionPaper:exam[0].exam.questionPaper
        })
        
        return
      }

      dispatch(getAllExamsSubjective(_classroomId));
    } else {

      if(exams.objectiveExams){

        const exam = exams.objectiveExams.filter((EXAM)=>EXAM.exam._id===examId)

        setExam({
          name: exam[0].exam.name,
          hour: parseInt( exam[0].exam.timeLength.split(':')[0] ),
          minute: parseInt( exam[0].exam.timeLength.split(':')[1] ),
          navigationStatus: exam[0].exam.navigationStatus,
          jumblingStatus:exam[0].exam.jumbleStatus,
          instruction: exam[0].exam.instruction ? exam[0].exam.instruction : 'Write your instruction here....'
        })
        return
      }

      dispatch(getAllExamsObjective(_classroomId));
    }
  },[exams.objectiveExams , exams.subjectiveExams])

  
  useEffect(()=>{
        if(submit){

            if(examType==='subjective'){

               const formData = new FormData()

               formData.append('name',exam.name)
               formData.append('hour',exam.hour)
               formData.append('minute',exam.minute)
               formData.append('upload_question_paper',exam.upload_question_paper)
               formData.append('instruction',exam.instruction)
               formData.append('submissionTime',exam.submissionTime)
               
                
                dispatch(editExamWritten(examId,_classroomId,formData,history,_classroomId))
            }else{
                 
                dispatch(editExamObjective({...exam,_id:examId },history,_classroomId,2))
            }
            setSubmit(false)
        }
  },[submit])

  const handleChange = (e) => {

     if(!e.target){
      return setExam({
        ...exam,
        'instruction' : e
      });
    }

    const { name } = e.target;

    if (name === "upload_question_paper") {
      console.log(e.target.files[0]);

      return setExam({
        ...exam,
        [name]: e.target.files[0],
      });
    }

    if (name === "navigationStatus" || name === "jumblingStatus") {
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

  if (exams.loading) {
    return (
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
         <Loader />
       </div>
    )
  }

  return (
    <div>
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
        >
          <h3 className={classes.header}>Edit Exam Room</h3>
          <TextField
            name="name"
            value={exam.name}
            number
            id="asdasds"
            label="Exam name"
            variant="outlined"
            onChange={handleChange}
          />

          <div className={classes.timer}>
            <TextField
              name="hour"
              value={exam.hour}
              type="number"
              id="outlined-basic"
              label="Exam hour"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              name="minute"
              value={exam.minute}
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
                name="upload_question_paper"
                id="upload_exam"
                type="file"
                inputProps={{accept:"application/pdf"}}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="submissionTime"
                value={exam.submissionTime}
                number
                id="outlined-basic"
                label="Extra submission time"
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
                    checked={
                      exam.navigationStatus
                    }
                    name="navigationStatus"
                  />
                }
                label="Allow Navigation"
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exam.jumblingStatus}
                    name="jumblingStatus"
                  />
                }
                label="Allow Questions to jumble"
                onChange={handleChange}
              />
              <Typography className={classes.instru}>(By allowing Navigation ,students cann't see their previes questions,once they attemped one questions ,they cann't be comeback)</Typography>
            </div>
          )}
          {
            examType==='subjective' 
            ?  
              <Button variant="contained" color="primary">
                <a target="blank" href={exam.questionPaper}>
                   View Paper
                 </a>
              </Button>:
            null
          }
          <center
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItem: "center",
            }}
          >

           
          </center>
        </form>
      </Grid>

       </Grid>
 
      <Grid container>
        {
          exam.instruction ?
          <Editor
              examType={examType}
              data={exam}
              location={window.location}
              content={exam.instruction}
              name='instruction'
              setInstruction={handleChange}
              setSubmit={setSubmit}
              height='25vh'
         /> :
         null
        }
      </Grid>
    </div>
  ) 
}
