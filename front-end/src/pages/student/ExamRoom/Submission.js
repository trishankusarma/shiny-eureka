import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
  root: {
    // width:"600%",
    // height:"300px",
    // backgroundColor:"grey",
    // margin:"auto",
    // display:"flex",
    // flexDirection:"column"
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "30px",
    backgroundColor: "#f8f9fa",
  },
}));

export default function Dragdrop() {
  const classes = useStyles();

  return (
  <>
  <Draggable>
    <div className="box"
     style={{
        position: "absolute",
        cursor: "move",
        color: "black",
        maxWidth: "215px",
        borderRadius: "5px",
        padding: "1em",
        margin: "auto",
        userSelect: "none",
    }}
    >
        <div>Move me around!</div>
    </div>
</Draggable>

  
  </>
  );
}
