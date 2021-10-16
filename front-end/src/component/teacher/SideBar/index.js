import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from "react-redux";
import {  Link, useHistory } from "react-router-dom";

import { logoutTeacher } from "../../../redux/actions";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navigation : { margin:'1rem', display:'flex', justifyContent:'space-around'}
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = ()=>{
     dispatch(logoutTeacher())
  }

  const goBack = ()=>{
    
    if(window.location.pathname==='/teacher/ExamHall')
         return

    history.goBack()
  }

  const moveForward  = ()=>{
     
    history.goForward()
  }

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <center className={classes.navigation}>
          <Button
            variant="contained"
            onClick={goBack}
            disabled = { window.location.pathname==='/teacher/ExamHall' ? true : false }
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={moveForward}
          >
             Forward
          </Button>
      </center>
      <List>
        {['Home', 'Profile' ].map((text, index) => (
          
           <Link to={
               index === 0 ?  '/teacher/ExamHall' :
               '/teacher/profile' 
            }>
              <ListItem button key={text}>
                  <ListItemIcon>
              
                    
                      {index === 0 ? <HomeIcon/> : null }
                      {index === 1 ? < PersonIcon/> : null }

                    </ListItemIcon>
                 <ListItemText primary={text} />
              </ListItem>
           </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Log Out'].map((text, index) => (
          <ListItem 
                button 
                key={text}
                onClick = {logout}
          >
            <ListItemIcon>
            {/* {index === 0 ? <HomeIcon/> : null }
              {index === 1 ? < PersonIcon/> : null } */}
 
              {index === 0 ? < ExitToAppIcon/> : null }

            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>{props.children}</div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}