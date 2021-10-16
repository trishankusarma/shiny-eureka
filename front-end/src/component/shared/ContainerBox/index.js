import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles(()=>({
    root:{
        border:"1px solid rgba(0, 0, 0, 0.12)" 
    }
}));

const ContainerBox=(props)=>{
    const classes=useStyles();
    return(<>
    <div className={`${classes.root} ${props.width}`}>
        {props.children}
    </div>
    </>)        
}

export default ContainerBox;