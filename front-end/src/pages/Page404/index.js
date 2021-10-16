import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image from '../../assets/404error.gif';

const useStyles = makeStyles((theme) => ({
    container:
    {
        display: 'flex',
        justifyContent: 'center',
        height:"100vh"
    },
    image:
    {
        width: "40%",
        [theme.breakpoints.up("md")]: {
            width: "50%",
        },
    }

}));

function Page404() {
    // const container = useRef(null)

    const classes = useStyles();
    // useEffect(() => {
    //    lottie.loadAnimation({
    //        container:container.current,
    //        renderer:'svg',
    //        loop:true,
    //        autoplay:true,
    //        animationData:require('../../assets/error.json')
    //    })
    // }, [])
    return (
        <div>

            <div className={classes.container}>
                <img className={classes.image} src={image} />
            </div>


        </div>
    )
}

export default Page404
