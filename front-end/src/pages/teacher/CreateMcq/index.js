import React, { useEffect , useState } from "react";
import TeacherLayout from "../../../component/layout/teacher";
import ContainerBox from "../../../component/shared/ContainerBox";
import McqCreateForm from "../../../component/teacher/ExamForm";
import PopOver from "../../../component/teacher/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';

import queryString from 'query-string'
import { useParams, useHistory , Link } from 'react-router-dom'

import { Toastify } from "../../../App";

import { useSelector , useDispatch } from "react-redux";

import { get_mcq_exam_Details , 
         create_mcq ,  edit_mcq , delete_mcq ,
         create_mcq_options , edit_options_mcq , delete_options_mcq, logoutTeacher
 } from '../../../redux/actions'

 import Loading from '../../../component/shared/Loader'

import {
  TextField,
  Checkbox,
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { GrAddCircle } from "react-icons/gr";
import { BsArrowReturnLeft, BsCardImage } from "react-icons/bs";
import {  AiOutlineEnter } from "react-icons/ai";

import "./style.css";
const useStyles = makeStyles((theme) => ({
  paper:
    {
        height:'30vh',
        overflow:'hidden'
    },
  card: {
    border: "1px solid #aaaaaa",
    width: "100%",
    margin: "4% auto",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  slide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  widths: {
    width: "70%",
    borderRadius: "5px",
    margin: "2% auto",
    marginTop: "1%",
    marginBottom: "0",
  },
  innerWidths: {
    display: "block",

    width: "90%",
    borderRadius: "5px",
    margin: "2% auto",
  },
  mcqWidths: {
    display: "block",
    width: "90%",
    borderRadius: "5px",
    margin: "2% auto",
    padding: "20px",
  },
  optionsCheck: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  msqPreview: {
    display: "flex",
  },
  mcqTitle: {
    padding: "20px 0",
    width: "100%",
  },
  SetMcq: {
    borderTop: "10px solid red",
    borderLeft: "6px solid orange",
    padding: "0px",
  },
  TitleText: {
    width: "95%",
  },
  Text: {
    fontSize: "1.8rem",
    fontWeight: 500,
  },
  SetOption: {
    borderLeft: "6px solid orange",
    padding: "20px",
  },
  Tools: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height:"60px",
    flexDirection: "column"
  },
  mcqQuestion: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  question: {
    width: "40%",
  },
  formControl: {
    padding: "2px",
  },
  section: {
    height: "0px",
    width: "120px",
  },
  Choice: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "15px",
  },

  optionsChoice: {
    marginTop: "30px",
  },
  button:
  {
    margin:'20px 0 20px 0',
    width:'20%'
  }
}));

const CreateMcq = ({location}) => {

  const history = useHistory()

  const dispatch = useDispatch()

  const classes = useStyles()

  const { _examId  } = useParams()

  const { examName , roomId } = queryString.parse(location.search)

  const mcqs = useSelector((state)=>state.mcqs)

  const [ MCQS , setMCQS ] = useState(mcqs.mcqs)

  useEffect(()=>{
      dispatch(get_mcq_exam_Details(_examId))
  },[])

  useEffect(()=>{

     console.log(mcqs.mcqs)

     setMCQS(mcqs.mcqs)
  },[mcqs.mcqs])

  const addMCQ = ()=>{
     dispatch(create_mcq(_examId,MCQS.length+1))
  }

  const deleteMCQ = (mcq)=>{
       dispatch(delete_mcq(mcq))
  }

  const editMCQ = (mcq)=>{

    console.log(mcq)

    dispatch(edit_mcq(mcq))
  }

  const addMCQOption = (mcq,option)=>{
     dispatch(create_mcq_options(mcq.mcq._id,option))
  }

  const deleteMCQOption = (option)=>{
     dispatch(delete_options_mcq(option))
  }

  const editMCQOption = (option)=>{
     dispatch(edit_options_mcq(option))
  }

  const handleChangeOption = (e,idx,option,mcq)=>{

    const { name } = e.target

    let updatedOption
    
    switch(name){
      case 'upload_option':
           
        if(!(e.target.files[0].type==='image/jpg'|| e.target.files[0].type==='image/jpeg'||e.target.files[0].type==='image/png'||e.target.files[0].type==='image/PNG'
                ||e.target.files[0].type==='image/JPG'||e.target.files[0].type==='image/JPEG')){

            return Toastify( 'error' , 'Prefer uploading an image!')
        }

        updatedOption={
            ...option,
            [name]:e.target.files[0]
        }
        break;
        
      case 'correct_status':
          updatedOption={
             ...option,
             [name]:e.target.checked
          }
          break;
        
      default:
          updatedOption = {
             ...option,
             [name]:e.target.value
          }
    }

    let updatedOptions = mcq.options.map((op,index)=>index===idx ? updatedOption : op)

    setMCQS(MCQS.map((MCQ)=>MCQ.mcq._id===option.mcq ? { ...mcq , options:updatedOptions } : MCQ))
}

  const handleChangeMcq = (e,index,mcq)=>{

      const { name } = e.target

      let updatedMcq

      switch(name){
         case 'upload_mcq':
           
            if(!(e.target.files[0].type==='image/jpg'|| e.target.files[0].type==='image/jpeg'||e.target.files[0].type==='image/png'||e.target.files[0].type==='image/PNG'
                    ||e.target.files[0].type==='image/JPG'||e.target.files[0].type==='image/JPEG')){

                return Toastify( 'error' , 'Prefer uploading an image!')
            }

            updatedMcq={
                ...mcq,
                [name]:e.target.files[0]
            }
            break;
          
        default:
            updatedMcq = {
                ...mcq,
                [name]:e.target.value
            }
      }

      setMCQS(MCQS.map((MCQ)=>MCQ.mcq._id===mcq._id ? { ...MCQ , mcq:updatedMcq } : MCQ))
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <TeacherLayout
       dispatch={dispatch}
        logoutTeacher={logoutTeacher}
        useSelector={useSelector}
      >
       
        <Card
          style={{
            position: "fixed",
            top: "11.5%",
            right: "10%",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div className={classes.Tools}>
            <GrAddCircle size="25px" color="#000" onClick={addMCQ}/>
            <AiOutlineEnter size="25px" color="#000" />
          </div>
        </Card>

        <ContainerBox width={classes.widths}>
          <Card className={classes.SetMcq}>
            <div className={classes.mcqTitle}>
              <center>
                <TextField
                  inputProps={{
                    className: classes.Text,
                  }}
                  id="examMcq"
                  placeholder="Exam name"
                  type="text"
                  className={classes.TitleText}
                  value={`Exam Name: ${examName}`}
                  readOnly
                />
              </center>
            </div>
          </Card>
        </ContainerBox>

      {
        MCQS ? 
          MCQS.map((mcq,index)=>(
          <ContainerBox width={classes.widths}>
            <Card className={classes.SetOption}>
              <div className={classes.mcqQuestion}>
                <TextField
                    style={{ width: "7%", marginRight:'1%' }}
                    id="filled-basic"
                    label="Q No."
                    variant="filled"
                    name="questionNo"
                    value={mcq.mcq.questionNo}
                    onChange={(e)=>handleChangeMcq(e,index,mcq.mcq)}
                  />
                <TextField
                  style={{ width: "55%",marginRight:'0.5%' }}
                  id="filled-basic"
                  label="Question"
                  variant="filled"
                  name="question"
                  value={mcq.mcq.question}
                  onChange={(e)=>handleChangeMcq(e,index,mcq.mcq)}
                />
                
                <label htmlFor={`image_upload${mcq.mcq._id}`} style={{marginRight:'1%' }}>
                  <BsCardImage for={`image_upload${mcq.mcq._id}`} size="25px" />
                </label>
                
                <TextField
                  id={`image_upload${mcq.mcq._id}`}
                  name='upload_mcq'
                  type="file"
                  style={{ display: "none"}}
                  onChange={(e)=>handleChangeMcq(e,index,mcq.mcq)}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  
                  <Select
                    inputProps={{
                      className: classes.section,
                    }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={mcq.mcq.mcqType}
                    placeholder="MCQ type"
                    name='mcqType'
                    onChange={(e)=>handleChangeMcq(e,index,mcq.mcq)}
                  >
                  
                    <MenuItem value="Single Correct Choice">Single Correct Choice</MenuItem>
                    <MenuItem value="Multiple Correct Choice">Multiple Correct Choice</MenuItem>
                 
                  </Select>
                </FormControl>

                <TextField
                  style={{ width: "7%" }}
                  id="filled-basic"
                  label="Marks"
                  variant="filled"
                  name="marks"
                  value={mcq.mcq.marks}
                  onChange={(e)=>handleChangeMcq(e,index,mcq.mcq)}
                 />
        
                <SaveIcon color="primary" onClick={()=>{
                    if(mcqs.loading) return

                    editMCQ(mcq.mcq)
                 }} />
                <DeleteIcon onClick={()=>{
                     if(mcqs.loading) return
                     
                     deleteMCQ(mcq.mcq)
                }}/>
              
              </div>
              
              {
                  mcq.mcq.fileId ?
                  <img 
                       className={classes.paper} 
                       src={`https://drive.google.com/uc?id=${mcq.mcq.fileId}`} 
                  />
                  : null
              }

              {
                mcq.options.map((option,idx)=>(

                 <div className={classes.optionsChoice}>
                   <div className={classes.Choice}>
                    
                    <label htmlFor={"option_text1"}>
                      <Checkbox
                        checked={option.correct_status}
                        name="correct_status"
                        style={{ padding: 0, marginRight: "15px" }}
                        onChange={(e)=>handleChangeOption(e,idx,option,mcq)}
                      />
                    </label>
                    
                    <TextField
                        style={{ width: "7%",marginRight:"4%" }}
                        id="option_text1"
                        value={option.optionNo}
                        name='optionNo'
                        placeholder="Opt No"
                        onChange={(e)=>handleChangeOption(e,idx,option,mcq)}
                    />
                    
                    <TextField
                      style={{ width: "65%",marginRight:"4%" }}
                      id="option_text1"
                      value={option.description}
                      name='description'
                      placeholder="Description"
                      onChange={(e)=>handleChangeOption(e,idx,option,mcq)}
                    />

                    <label htmlFor={`image_upload_option${mcq.mcq._id}${option._id}`} >
                        <BsCardImage for={`image_upload_option${mcq.mcq._id}${option._id}`} size="25px" />
                    </label>
                    
                    <TextField
                      id={`image_upload_option${mcq.mcq._id}${option._id}`}
                      name='upload_option'
                      type="file"
                      style={{ display: "none"}}
                      onChange={(e)=>handleChangeOption(e,idx,option,mcq)}
                    />

                    {
                      !option._id ?
                        <AddBoxIcon
                        style={{ margin:"0 2%" }} 
                        variant="contained" 
                        color="primary"
                        onClick={()=>{
                           if(mcqs.loading) return

                           addMCQOption(mcq,option)
                        }}
                       />
                       :
                      <>
                         <SaveIcon   
                          style={{ margin:"0 2%" }}
                          variant="contained" 
                          color="primary"
                          onClick={(e)=>{
                            if(mcqs.loading) return

                            editMCQOption(option)
                          }}
                        />
                        
                        <DeleteIcon 
                        style={{ margin:"0 1%" }} 
                        variant="contained" 
                        color="primary"
                        onClick={(e)=>{
                           if(mcqs.loading) return

                           deleteMCQOption(option)
                       }}
                       />
                      </>
                    }
            
                   </div>  

                  {
                    option.fileId ?
                    <img 
                       className={classes.paper} 
                       src={`https://drive.google.com/uc?id=${option.fileId}`} 
                     />
                    : null
                  }

                 </div>
                ))
              }
              
            </Card>
          </ContainerBox>
          ))
          : 
          <Loading />
      }
      </TeacherLayout>
      <center>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              <Link to={`/teacher/ExamsRoom/${roomId}`}>
                  Submit
              </Link>
            </Button>
          </center>
    </div>
  );
};

export default CreateMcq;
