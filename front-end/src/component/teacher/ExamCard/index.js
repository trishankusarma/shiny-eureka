import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import {GrDocumentUpload} from "react-icons/gr"
import {FiFolder} from "react-icons/fi"
import PopOver  from "./popover"
import{MoreVert as MoreVertIcon} from '@material-ui/icons';
import  moment from "moment"
import { useHistory } from 'react-router-dom';
import {uploadStudentList} from "../../../redux/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    maxHeight: 400,
  },
  media: {
    height: 0,
    paddingTop: '50%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
  details:{
    display:"flex",
    flexDirection:"column",
    
  },
  tags:{
    fontSize: "1rem",
    fontWeight:"bold",
    // marginTop:"10px",
    // marginRight:"20px"
  },
  avatar:{
    backgroundColor: "red",
    '&:hover':{
      backgroundColor:"#b1ffad",
      cursor:"pointer",
    }
  }
}));

export default function Room(props) {
  const classes = useStyles();
  const history=useHistory()
  const [expanded, setExpanded] = React.useState(false);
  const [file_upload,setFile_upload]=React.useState(null);
  // console.log(props.room,"props.room._id")
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const uploadFile=(e)=>{
    let file =new FormData()

    console.log(props.room,"props.room._id")
    file.append("upload_excel_sheet",e.target.files[0])
    props.dispatch(uploadStudentList(props.room._id,file))
    
  }
const date=moment(props.room.createdAt).format("MMMM D YYYY")
  return (
    <Card className={classes.root}>
      <CardHeader
      className={classes.Header}


        avatar={
          <Tooltip  title="Click to visit room" placement="top-start">
          <Avatar aria-label="recipe" className={classes.avatar}
          onClick={() => {
                    history.push(`/teacher/ExamsRoom/${props.room._id}`);
          }}
          >
            {props.room.name.substring(0,1)}
          </Avatar>
          </Tooltip>
        }
        action={
          <PopOver {...props}>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </PopOver>
        }
        title={props.room.name}
        subheader={date}
      />
      <CardMedia
        className={classes.media}
        image="https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        <div className={classes.details}>
          <div className={classes.tags}>
            Total Strength ({props.room.strength})
          </div>
          <div className={classes.tags}>
            Total Exams ({props.room.noOfExams})
          </div>
        </div>
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton aria-label="add to favorites">
        <label for={"upload_student_"+props.room._id}>
        <input name="file_upload" onChange={uploadFile} style={{display:"none"}} type="file" id={"upload_student_"+props.room._id} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  />
          <GrDocumentUpload />
          </label>
        </IconButton>
        <IconButton aria-label="see student list">
       
          <PeopleIcon
             onClick={() => {
                    history.push(`/studentList/${props.room._id}`);
          }}
          />
        
        </IconButton>
      </CardActions>
      
    </Card>
  );
}
