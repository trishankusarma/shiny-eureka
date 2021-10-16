import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import {useSelector} from "react-redux"
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '20px',
    [theme.breakpoints.up('md')]: {
      width: '40%',
      marginLeft: '10%',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '50%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },

}));

export default function SideList() {
  const classes = useStyles();
  const student = useSelector(state=>state.student)
  const exams = useSelector(state=>state.exams)
  // console.log(moment(exams?.oneExam?.exam?.startTime).format('l'),"student")
  
  const [paperChecked,setPaperChecked]=React.useState({
    tot:0,
    checked:0
  });
 
  React.useEffect(() => {
    setPaperChecked({tot:0,checked:0})

  },[student.studentWrittenList[0]])
  
const countFun=()=>{
  // if(paperChecked.tot==student.studentWrittenList.length)  return;
  for(let i = 0; i<student.studentWrittenList.length;i++){
    console.log("test")
    if(student.studentWrittenList[i].checkedStatus)
      {
        console.log(paperChecked,i)
        setPaperChecked({tot:paperChecked.tot+1,checked:paperChecked.checked+1})
        
      }
  }
}
if(paperChecked.tot!=student.studentWrittenList.length){
  countFun()
} 

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>EXAM DETAILS</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>CHECKED STATUS</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {/* <div className={classes.column} /> */}
          <div className={classes.column}>
            <p>Student Appeared : <span>{student?.studentWrittenList?.length}</span></p>      
            <Typography className={classes.heading}>Date: <span>{moment(exams?.oneExam?.exam?.startTime).format('l')}</span></Typography>      
          </div>
          <div className={classes.column} />
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              <p>PAPER CHECKED :<span>{paperChecked.checked}</span></p>
              <br />
              <p>PAPER LEFT :<span>{student.studentWrittenList.length-paperChecked.checked}</span></p>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
      </Accordion>
    </div>
  );
}