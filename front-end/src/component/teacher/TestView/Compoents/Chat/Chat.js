import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button } from "@material-ui/core";
// import socket from "../../../../../helper/socket.io";


const useStyles = makeStyles(() => ({
  container: {
    width: "90%",
    display: "flex",
    flexDirection:'column',
    position: "absolute",
    left: "50%",
    margin: "5% 0",
    borderRadius: "10px",
    padding: "10px",
    transform: "translateX(-50%)",
    height:'600px',
    overflowY:'scroll',
    overflowX:'hidden'
  },
  Message: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  Name: {
    margin: "0 2%",
    color: "#fff",
    fontSize:".8rem"
  },
  messageContainer:{
    display:"flex",
    justifyContent:'space-between',
    alignItems: "center",
    width: "100%",
    margin:'5px auto',
    padding:'5px',
    borderRadius:'5px',
    backgroundColor:'#4982ec'
  },
  controlers:{
    display:"flex",
    flexDirection:'row',
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    margin:"0 auto"
  }
}));

export default function Chat({ cheatedStudents, socket , setSelectedStudent}) {

  const classes = useStyles();
  const [complains, setComplains] = React.useState([]);
  React.useEffect(() => {
    // socket.on("chanceGiven", ({ studentname,to="socketid"}) => {
    //   setComplains(
    //     complains.map((complain) => {
    //       if (complain.name == studentname) {
    //       }
    //       return complain;
    //     })
    //   );
    // });

    // socket.on("disqualifyStudent", ({ studentname }) => {
    //   setComplains(
    //     complains.map((complain) => {
    //       if (complain.name == studentname) {
    //       }
    //       return complain;
    //     })
    //   );
    // });
  }, [complains]);


  const Disqualify = (student) => {
       socket.emit("disqualifyStudent", { student });
       setSelectedStudent(student)
  };
  
  const GiveChance = (student) => {
       socket.emit("giveChance", { student });
       setSelectedStudent(student)
  };

  return (
    <div className={classes.container}>
      {
        cheatedStudents && cheatedStudents.map((student)=>(
            <div className={classes.messageContainer}>
              <Avatar
                alt={student.name}
                src="https://www.pexels.com/photo/man-with-cigarette-in-mouth-1933873/"
              />
              <div className={classes.Message}>
                <div className={classes.Name}>{student.name}</div>
                <div className={classes.controlers}>
                  <Button onClick={()=>Disqualify(student)} size="small" variant="contained" color="secondary">
                    Disqualify
                  </Button>
                  <Button onClick={()=>GiveChance(student)} size="small"  variant="contained" color="primary">
                   Chance
                  </Button>
                </div>
              </div>
            </div>
            ))
      }
    </div>
  );
}
