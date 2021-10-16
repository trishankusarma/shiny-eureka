import { useState } from "react";
import { FaStar } from "react-icons/fa";
// import Studentnav from "../../student/StudentNav";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { postReviews } from '../../../redux/actions'
import queryString from 'query-string'

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	  },
	  stars: {
		display: "flex",
		flexDirection: "row",
	  },
	  textarea: {
		border: "1px solid #a9a9a9",
		borderRadius: 5,
		padding: 10,
		margin: "20px 0",
		minHeight: 200,
		width: 400,
		[theme.breakpoints.down('sm')]: {
			width:300,
			minHeight:100,
		}
	  },
	  buttonGroup: 
	  {
		width:'25%',
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
	    [theme.breakpoints.down('sm')]: {
			width: '50%'
		}
	}
  }));

function App() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const [ experience , setExperience ] = useState(null)

  const { student_id } = queryString.parse(window.location.search)

  console.log(student_id)

  const history = useHistory()
  const dispatch = useDispatch()

  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const handleSubmit = (e)=>{
     
      const data = {
         student : student_id,
         stars :  currentValue , 
         experience : experience 
      }

      dispatch( postReviews( data , history ) )
  }

  const skipSubmit = () =>{

    if( localStorage.getItem('studentId')  )
        localStorage.removeItem('studentId') 
      
     return history.push('/')
  } 

  const classes = useStyles();

  return (
    <div className={classes.container}>
	{/* <Studentnav/> */}
      <h2> Rate your Experience </h2>
      <div className={classes.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <textarea
        placeholder="What's your experience?"
        className={classes.textarea}
        name = 'experience'
        value = {experience}
        onChange = { (e)=>setExperience(e.target.value) }
      />
      <div className={classes.buttonGroup}>
	  <Button 
         color="primary" 
         variant="outlined" 
         className={classes.button}
         onClick = { skipSubmit }
    >Skip</Button>
	  <Button 
         color="primary" 
         variant="contained" 
         className={classes.button}
         onClick = { handleSubmit }
   >Submit</Button>
	  </div>
      
    </div>
  );
};

export default App;