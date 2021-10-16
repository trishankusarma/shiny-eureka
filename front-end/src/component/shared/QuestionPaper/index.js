import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper:
    {
        
        height:'100%',
        overflow:'hidden',
        width:'100%',
    },
}));


function QuestionPaper({fileId}) {
  const classes = useStyles();
    return (
        // <div className={classes.paper}>
            <embed className={classes.paper} src={`https://drive.google.com/uc?id=${fileId}#view=FitH&toolbar=0`} ></embed>
    )
}

export default QuestionPaper
