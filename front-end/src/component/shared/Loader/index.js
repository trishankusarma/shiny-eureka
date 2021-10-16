import React from "react";
import { makeStyles } from "@material-ui/styles"
import loadstyle from "./load.module.css";
import {GiBookAura} from "react-icons/gi"

const useStyles = makeStyles((theme) => ({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:`100vh`,
        width:"100%"
    }

  }));

const extraStyle ={height:'5px', marginTop:'5vh'}

const Loader=({loader})=>{
    const classes=useStyles();
    return (<>
        <div className={classes.container} style={loader===1 ? extraStyle : null }>
            <div className={loadstyle.loader}>
                <GiBookAura size="25px" color="#3f51b5"/>
            </div>
        </div>
    </>)
}

export default Loader;
