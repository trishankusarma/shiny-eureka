import React, { useMemo, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// import BackupIcon from "@material-ui/icons/Backup";
import { Button, Modal } from "@material-ui/core";
import { Toastify } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { uploadAnswerScript , logoutStudent } from "../../../redux/actions";
import {useHistory} from "react-router-dom"

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { makeStyles } from '@material-ui/core/styles';
// import { GrDocumentPdf } from 'react-icons/gr';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import LinearProgress from '@material-ui/core/LinearProgress';
import Qrcode from 'qrcode'

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "solid",
  backgroundColor: "#fafafa",
  width:'80%',
  margin:"auto",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const icon ={
  fontSize: "3rem", 
  color:'#3f51b5',
  padding:'30px'
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const submitstatus={
  fontSize:"1.2rem",
  marginBottom:"20px"
}

const useStyles = makeStyles((theme) => ({
	
    modal : {
       display:'flex',
       alignItems:'center',
       justifyContent:'center'
    },
	  buttonGroup: 
	  {
		width:'25%',
    marginTop:'30px',
    marginBottom:'2rem',
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
	    [theme.breakpoints.down('sm')]: {
			width: '50%'
		}
	}
  }));

function StyledDropzone(props) {

  console.log("sockets",props.socket)

  const classes = useStyles();

  const dispatch = useDispatch();
  const student = useSelector((state) => state.student);

  const [ qrImage, setQrImage ] = useState(null)
  
  const [files, setFiles] = useState([])

  const [ turnInLate , setTurnInLate ] = useState(
       false
   )

  const [ Open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const history=useHistory()
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  useEffect(()=>{

       if(!student.studentSub) return
        
       setTurnInLate(student.studentSub['lateStatus'])

  },[student.studentSub])

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = acceptedFiles.map((file) => (
    <p key={file.path}>
      {file.path} - {file.size/1000} kilo-bytes
    </p>
  ));
  const Submit = () => {
    console.log(acceptedFiles, "");
    if (acceptedFiles.length == 0)
      return Toastify("error", "Select your pdf file before uploading");
    if (
      acceptedFiles[0].type.split("/")[0] != "application" &&
      acceptedFiles[0].type.split("/")[1] !== "pdf"
    )
      return Toastify("error", "Only pdf please !");

    let lateStatus=false 

    if( ( parseInt( localStorage.getItem('submitStatus') ) + props?.submissionTime * 60000 ) < new Date().getTime() ){
         lateStatus=true
    }

    setTurnInLate( lateStatus )

    dispatch(uploadAnswerScript(student.student_id, acceptedFiles[0],history, props.socket , props.email , props.examHall,lateStatus))
  };

  const generateQrCode = async ()=>{

      const data = {
          basicDetails : localStorage.getItem('student'),
          scholarId : localStorage.getItem('scholarId'),
          examCode : student.examCode,
          subject : student.exam?.classroom?.name,
          submissionStartTime: localStorage.getItem('submitStatus'),
          givenSubmissionTime: props.submissionTime,
          uploadAnswerPaperLink : `/student/subjective/upload_answer_script/${student.student_id}?teacher=${localStorage.getItem('teacher_id')}`
        }
      const res = await Qrcode.toDataURL(JSON.stringify(data))

      setOpen(true);
      setQrImage(res)
  }

  return (
    <div className="container">
<center style={submitstatus}>

      {
        student?.studentSub?.answerScript

            ?  
              <div>
                   Submit Status : <span style={{colour:"green"}}>Submitted</span> <br/>

                  { turnInLate ?  
                        <span style={{color:"red" , fontSize : 'medium' , marginTop : '10px' , marginBottom:'10px'}}>
                             Turn In Late
                        </span> 
                    : null }
                   <br/>
                   <Button variant="outlined" color="primary" style={{marginTop:"10px"}}>
  

                   <a href={`https://drive.google.com/uc?id=${student.studentSub['answerScript']}`} target='_blank'>View Uploaded File</a>
                   </Button>
                    <p>Reupload ?</p>
              </div>
            :  
              <div>
                   Submit Status :<span style={{colour:"red"}}>Not yet submitted</span>
              </div>
      }
</center>
      <div {...getRootProps({ style })} >
        <input type="file" accept="application/pdf" {...getInputProps()} />
        <PictureAsPdfIcon style={icon}  />
        
        <Button variant="outlined" color="primary" onClick={open} style={{backgroundColor:"#F8F8F8"}}>
       < NoteAddIcon/>
  CHOOSE FILE
</Button>
        <p>or Drop Pdf here</p>
        <aside>
          <p style={{ textDecoration: "none" }}>{filepath}</p>
        </aside>
      </div>
      {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
   <center>{student.loading ? (
       
        <div style={{width:'80%'}}>
             <LinearProgress variant="determinate" value={student.progress} />
         </div>
      ) : null } 

     <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        -or-

          <Button onClick={generateQrCode} color='primary' >
                Use QR Code to Upload
          </Button>

          {
            qrImage ?
                <Modal   
                   open={Open}
                   onClose={handleClose}
                   className={classes.modal}
                 >
                   <div style={{ display:'flex', flexDirection:'column' }}>
                        <img src={qrImage} />
                    </div>
                </Modal>
              : null
          }
     </div>

      
      <div className={classes.buttonGroup}>

            <Button 
                onClick={props.leaveExamHall}  
                color="primary" 
                variant="outlined" 
                className={classes.button}
                disabled = { student?.studentSub?.answerScript ? false : true }
            >Leave</Button>

            <Button onClick={Submit}  color="primary"  variant="contained"  className={classes.button}>
               {  student?.studentSub?.answerScript ? "ReSubmit" : "Submit" }
            </Button>

        </div>
     </center>   
    
    </div>
  );
}

export default StyledDropzone;
