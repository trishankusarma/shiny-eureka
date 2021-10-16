import React,{useState} from "react";
import Collap from "../../../component/teacher/CopyCheckWritten/CopyCheck";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "../../../component/teacher/TopBar1";
import StudentDetails from "../../../component/teacher/CopyCheckWritten/studentDetails";
import QuestionEntry from "../../../component/teacher/CopyCheckWritten/QuestionEntry";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  logoutTeacher,
  updateStudentWrittenMarks,
} from "../../../redux/actions";
import { useParams } from "react-router-dom";
import axios from "../../../helper/axiosInstance";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:'80%',
    margin:'auto',
    height:'400px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY:'scroll'
  },
  studentdet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    margintop: "10px",
    marginBottom: "10px",
  },
  toolKit: {
    height: "40px",
    marginRight: "20px",
  },
  details:{
    display:'flex', 
    flexDirection:'column', 
    border:'2px solid green', 
    padding:'1rem'
  },
  detailsSub:{
    padding:'0.2rem'
  }
}));

function Index() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [ STUDENT , setSTUDENT ] = React.useState(null);
  const { id } = useParams();
  const [tool, setTool] = React.useState(false);

  const [ showModel , setShowModel ] = useState(null)

const SubmitUpdates=()=>{
  dispatch(updateStudentWrittenMarks(id))
}
  React.useEffect(async () => {

    localStorage.setItem("marks",JSON.stringify([]))

    let res = await axios.get("/student/subjective/get_student_detail/" + id);
    setSTUDENT(res.data);
    console.log(res.data,"datatatatat")

    localStorage.setItem("marks",JSON.stringify( res.data.student_sub.marks) )

  }, []);

  const arrayBufferToBase64 = (buffer)=>{

    var binary = ''
 
    var bytes = [].slice.call(new Uint8Array(buffer))
 
    bytes.forEach((b) => binary += String.fromCharCode(b))
    return window.btoa(binary)
 }

  const getImageSrc = (image)=>{
      
    const base64Flag = `data:image/png;base64,`
           
    const imageStr = arrayBufferToBase64(image.image.data)

    return base64Flag + imageStr 
  }

  return (
    <div className={classes.root}>
      <div className={classes.topbar}>
        <TopBar
          dispatch={dispatch}
          useSelector={useSelector}
          logoutTeacher={logoutTeacher}
          auth={auth}
        />
      </div>
      <div className={classes.studentdet}>
        <StudentDetails data={STUDENT?.student_sub} />

        { STUDENT?.student_sub ?

          <Typography className={classes.details}>

            <span className={classes.detailsSub} >Name : {STUDENT?.student_sub?.student?.name}</span>
            <span className={classes.detailsSub}>Scholar id. : {STUDENT?.student_sub?.student?.scholarId}</span>
            <span className={classes.detailsSub}>Email : {STUDENT?.student_sub?.student?.email}</span>
          </Typography> 
          :
          null
        }
        
        <div>

          <Button 
             className={classes.toolKit}
             onClick={()=>setShowModel(2)} 
             variant='contained'
             color='primary'
          >
               Show Images
          </Button>
          <Button
            onClick={() => {
              setTool(!tool);
            }}
            variant="contained"
            color="primary"
            className={classes.toolKit}
          >
            Toolkit
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.toolKit}
            onClick={()=>{
              SubmitUpdates()
            }}
          >
            Submit
          </Button>
        </div>
        {tool ? <QuestionEntry data={STUDENT?.student_sub} SubmitUpdates={SubmitUpdates}/> : null}
      </div>

     <div >
              <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={showModel!==null ? true : false}
                    onClose={()=>setShowModel(null)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
              >
                <Fade in={showModel!==null ? true : false}>
                  <div className={classes.paper}>
                    
                      {
                         showModel===2 ? 
                              <div>
                                    {STUDENT?.student_sub?.trackedImages?.map((image)=>(
                                        <>
                                            { image.image ? <img style={{width:"100px",height:"100px"}} type='image/png' src ={ getImageSrc(image) } /> : null }
                                        </>
                                    )) }
                              </div>
                           : null
                      }
                  
                  </div>
                </Fade>
                
              </Modal>

     </div>

      <div className={classes.collap}>
        <Collap data={STUDENT} />
      </div>
    </div>
  );
}

export default Index;
