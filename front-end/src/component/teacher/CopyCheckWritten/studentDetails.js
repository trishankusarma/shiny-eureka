import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { makeStyles } from '@material-ui/core/styles';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles((theme) => ({
  root:{
    marginLeft:'30px'
  },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),

    },
    circle:
    {
      width:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      border:'1px solid #a6a6a6',
      borderRadius:'100%',
      margin:'auto',
      padding:'0.4rem'
    },
    icon:
    {
      fontSize:'4rem',
      color:'#0866D6',
    },
    content:
    {
      display:'flex',
      flexDirection:'column',
      alignItems:'start',
      padding:'20px'
    }
  }));

export default function PopoverPopupState(props) {
  const classes = useStyles();

  const formatTime = (time)=>{
     if( time/1000 < 60 )
         return `${Math.floor( time/1000 )} seconds late`
     else if( time/1000 < 3600 )
         return `${Math.floor( time/60000 )} minutes late`
     else if( time/1000 < (3600*24) )
         return `${Math.floor( time/3600000)} hours late` 
     else
         return `${Math.floor( time/(3600000*24))} days late` 
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className={classes.root}>
        <Typography
        {...bindTrigger(popupState)}
        className={classes.circle}
        >
        <SchoolIcon  
          className={classes.icon}
        />
       </Typography>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography className={classes.content}>
                <span style={{ marginTop:'10px' }}>

                     Paper Submitted : { props?.data?.answerScript ? props?.data?.lateStatus ? "Submitted Late" : "Submitted on time" : "Not Submitted" }
                                       
                </span>

                <span>
                    {
                          props?.data?.lateStatus ? 

                            formatTime(
                              props?.data?.submitTime
                                 - ( ( parseInt( props?.data?.exam.timeLength.split(":")[0] )*60 
                                    + parseInt( props?.data?.exam.timeLength.split(":")[1] ) )* 60000 
                                      + props?.data?.exam.startTime )
                            )
                                              : 
                                              null 
                        }
                </span>
                                    
                <span>
                    No Person Detect : {props?.data?.notifications.noPerson} 
                </span> 
                                    
                <span>
                    Book Detected : {props?.data?.notifications.bookDetect}  
                </span> 
                                    
                <span>
                    Device Detected : {props?.data?.notifications.deviceDetect}  
                </span> 
                
                <span>
                    More than one person detected : {props?.data?.notifications.morePerson}
                </span> 

                <span>
                    Tab Change detected : {props?.data?.notifications.tabChange}
                </span>

         </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
