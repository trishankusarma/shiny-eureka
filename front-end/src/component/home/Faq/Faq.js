
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin:"auto",
    marginBottom:"50px",
    marginTop:"30px"
  },
  header:{
 fontSize:"2rem",
 fontWeight:"320",
 marginBottom:"30px",
 marginTop:"50px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion:{
    // border:"1px solid #69BCFF",
    backgroundColor:"#f8f9fa",
    marginBottom:"7px",
    // boxShadow: "none"
  }
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div>
    <center className={classes.header}>Frequently Asked Questions</center>
    <div className={classes.root}>
      
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Can I (teacher) upload handwritten Questions?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes you can, you can upload any type of question until it is in PDF format.

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}> How  do I check the paper?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The teacher can check the paper in the paper checking section where he shall get the exact environment as offline mode. To know more please check the video.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}> Can I  conduct MCQ-based exams?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes you can, you can even schedule when the  exam shall go live!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Can students take screenshots or take images using their phones?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          No, students can neither take screenshots nor click images. The app will be in fullscreen mode exiting of which he shall be disqualified. 

If he tries to click an image of the question, our AI shall detect an external object and immediately warn the examiner
          </Typography>
        </AccordionDetails>
      </Accordion>

 
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Can more than one student be in frame?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          No only one student shall be in frame.  If anyone see appears, the AI shall warn the Examiner
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>How shall students submit exam papers if they can't exit fullscreen?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The restrictions shall open up for the last few minutes before the end of exam for uploading answer paper.
         </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}> Where will all the questions and answer scripts be stored?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          All the question papers and answer scripts ever uploaded shall be stored in in the teachers' google drive. A new folder shall be created where all the data shall be stored. </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>What about Privacy, who can see the data?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We are using Google drive, hence nobody except the owner of the account (Not even us) can see the data, the question paper or answer script.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>How to scan the answer script?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The answer script must be scanned through mobile phone and then uploaded to the portal. </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Is a camera device necessary?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes  </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>What if the camera doesn’t work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Student wont be able to appear for exam. </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Can it detect other electronic gadgets in the frame?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes. Any object like phone, books can be detected.  </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
  );
}

