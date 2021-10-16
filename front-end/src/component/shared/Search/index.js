import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {useDispatch} from "react-redux"
import {searchWrittenStudents} from "../../../redux/actions"
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    justifyContent:"center",
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    

  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const dispatch = useDispatch()
  return (
    <Paper component="form" className={classes.root}>
      
        <MenuIcon style={{padding:"10px"}} />
      
      <InputBase
        className={classes.input}
        placeholder="Search Google Maps"
        onChange={(e)=>{dispatch(searchWrittenStudents(e.target.value))}}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      
        <SearchIcon style={{padding:"10px"}} />
      
      
      
    </Paper>
  );
}
