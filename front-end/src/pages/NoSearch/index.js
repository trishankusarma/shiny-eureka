import React,{ useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import lottie from 'lottie-web';

const useStyles = makeStyles({
    Nosearch: {
        display:"flex",
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center",
        width:"100vw",
    },
   
  });

function Nosearch(props) {
    const container = useRef(null)
    useEffect(() => {
      lottie.loadAnimation({
        container: container.current,
        loop: true,
        autoplay: true,
        animationData: require('../../assets/65089-book-search.json')
      })
    }, [])
    const classes = useStyles();
    return (
        <div class={classes.Nosearch}>
            Porrikha Says &nbsp; <strong>{props.name}</strong>
            <div style={{ height: 200 }} ref={container}></div>
        </div>
    )
}

export default Nosearch
