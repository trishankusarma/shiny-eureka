import React from 'react';
import Menu from '@material-ui/core/Menu';
import {MenuItem} from "@material-ui/core"
import {useHistory} from "react-router-dom"
export default function SimpleMenu(props) {
    const history= useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {props.children}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  onClick={()=>{history.push(`/teacher/CreateMcqExam/${props._classroomId}`);handleClose()}}>Mcq</MenuItem>
        <MenuItem  onClick={()=>{history.push(`/teacher/CreateWrittenExam/${props._classroomId}`);handleClose()}}>Written</MenuItem>
        {/* <MenuItem onClick={handleClose}>Copy Link</MenuItem> */}
      </Menu>
    </div>
  );
}
