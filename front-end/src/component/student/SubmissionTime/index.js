import React from 'react'
import DragAndDrop from '../../shared/DragAnddrop'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    submission:
    {
        width:'20%',
        margin:'10vh auto',
        textAlign:'center',
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width:'80%',
        },
    },
    button:
    {
        backgroundColor:'green',
        marginTop:'20px'
    }
   
  }));


function SubmissionTime() {
    const classes = useStyles();
    return (
        <div className={classes.submission}>
            <DragAndDrop />
        </div>
    )
}

export default SubmissionTime
