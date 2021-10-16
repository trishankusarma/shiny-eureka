import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Verdana,sans-serif",
      marginTop:"30px",
    width: '70%',
    margin:"auto"
  },
  questionNo:{
    fontSize: "1.2rem", 
  },
  heading: {
    fontSize: "1.3rem",
    // flexBasis: '73.33%',
    maxWidth:"70%",
    marginLeft:"10px"
  },
  marks: {
    fontSize: "1.2rem",
    marginRight:"10px",
  
    color: theme.palette.text.secondary,
  },
  secondaryHeading:{
    color: theme.palette.text.secondary,
    
  },
  answers:{
      fontSize:"1.2rem",
      color: "#525151",
     
  },
  img: {
    width: "70%",
    height: "70%",
    
  },
}));

export default function ControlledAccordions({exams}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [ expandedElement, setExpandedElement ] = useState(null)
  const handleChange = (panel,_id) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setExpandedElement(_id)
  };

  return (
    <div className={classes.root}>

         {
           exams?.oneExam?.mcqs.map((mcq)=>(
                  
                <Accordion expanded={ expanded === 'panel1' && expandedElement===`${mcq.mcq._id}` } onChange={handleChange('panel1',mcq.mcq._id)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >

                        <Typography className={classes.questionNo}>{mcq.mcq.questionNo}. </Typography>
                        <Typography className={classes.heading}>{mcq.mcq.question}</Typography>
                        <Typography className={classes.markstype}>
                        <Typography className={classes.marks}>({mcq.mcq.marks} marks)</Typography>

                       <Typography className={classes.secondaryHeading}>{mcq.mcq.mcqType}</Typography>


                        </Typography>
                      
                        <Typography className={classes.heading}>
                           {
                             mcq.mcq.fileId ?
                             <img 
                             className={classes.img}
                                  src={`https://drive.google.com/uc?id=${mcq.mcq.fileId}`}
                             />
                             : null
                           }
                        </Typography>

                    </AccordionSummary>
                    
                    <AccordionDetails>
                    
                      <Typography>
                    
                      <ol className={classes.answers}>
                           {
                             mcq.options.map((option)=>(
                                <li>
                                     <div style={{ color: option.correct_status ? 'green' : '' }}>
                                         {option.description}
                                    </div>

                                    {
                                      option.fileId ?
                                      <img 
                                      className={classes.img}
                                          src={`https://drive.google.com/uc?id=${option.fileId}`}
                                      />
                                      : null
                                    }
                                </li>
                             ))
                           }
                      </ol>
                      
                      </Typography>
                    </AccordionDetails>
              </Accordion> 
           ))
         }
   
    </div>
  );
}
