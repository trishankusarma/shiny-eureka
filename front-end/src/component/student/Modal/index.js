import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function StudentModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = ()=>{

       localStorage.setItem('submitStatus',new Date().getTime())

       props.setTimerStarted(false)

       props.setSubmitStatus(1)

       props.setTimeDuration(new Date().getTime())

       props.examEnd()
  }

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <div onClick={handleOpen}>{props.children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {props.mcq?<div className={classes.paper}>
    
       <center><h3>Summary</h3></center> 
        <p>Total Questions : {props.totalQuestions}<br/>
           Attepted questions : {props.totalAttepts}<br/>

        </p>
        <h4>Are You Sure you want to submit ?</h4>
        <Button variant="outlined" color="primary" style={{marginRight:"40px"}} onClick={handleClose}>
              Cancel
      </Button>    
       <Button variant="contained" color="primary" onClick={props.examEnd}>
                   SUBMIT
      </Button>

        </div> :( 
        <div className={classes.paper}>
        <h4>Are You Sure you want to submit ?</h4>
        <p>Once You Submit You Can't See the Question Paper & Anti Cheat will be disabled</p>
        <p>Upload the answer Script within the submission time provided by your teacher</p>

        <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "40px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="outlined" color="secondary">
                Confirm
              </Button>

            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
