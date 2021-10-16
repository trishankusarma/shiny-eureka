import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, TextField, Grid } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
// import Image from "../../../assets/66948-confetti.gif"
import TeacherLayout from '../../layout/teacher'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import lottie from 'lottie-web';

import { GetTeacherProfile , logoutTeacher } from '../../../redux/actions'

const useStyles = makeStyles((theme) => ({
 
    large: {
        width: 100,
        height: 100,
    },
    Grid1:
    {
       display:'flex',
       flexDirection:'column',
       alignItems:'center',
       marginTop:'5ch',
    },
    form:
    {
        display: 'flex',
        flexDirection: 'column',
        width:'90%',
        margin:'0 auto'
    },
}));

export default function ProfileFrom() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const container = useRef(null);
    const [spacing, setSpacing] = React.useState(2);

    const auth = useSelector((state)=>state.auth)

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/58761-book.json')
        })
    }, [])

    useEffect(() => {

        if(!auth.TeachAuthenticated){
            history.replace('/')
            return
        }
        dispatch(GetTeacherProfile())
        
    }, [auth.TeachAuthenticated])

    return (
        <div>
            <TeacherLayout dispatch={dispatch} useSelector={useSelector} logoutTeacher={logoutTeacher}/>

            <Grid container>

                <Grid xs={12} md={6} spacing={2} className={classes.Grid1}>
                    
                    <Avatar alt="Remy Sharp" src={auth.teacher.picture} className={classes.large} />

                    
                    <div className={classes.form}>
                        <TextField 
                            id="standard-basic-1" 
                            style={{ marginTop: 8 }} 
                            label="teacher name" 
                            value={auth.teacher.name}
                        />
                        <TextField 
                            id="standard-basic-2" 
                            style={{ marginTop: 8 }} 
                            label="teacher Email" 
                            value={auth.teacher.email}
                        />
                        <TextField 
                            id="standard-basic-3" 
                            style={{ marginTop: 8 }} 
                            label="teacher phone number" 
                            value={auth.teacher.phoneNo}
                        />
                        <TextField 
                            id="standard-basic-4" 
                            style={{ marginTop: 8 }} 
                            label="teacher instituation" 
                            value={auth.teacher.institution?.name}
                        />
                        <TextField 
                           id="standard-basic-5" 
                           style={{ marginTop: 20 }} 
                           value={"Exams taken : "+auth.teacher.totalExams}
                        />
                    </div>
                </Grid>
               
               <Grid xs={12} md={6}>
                   <div ref={container}></div>
               </Grid>
               
            </Grid>
        </div>
    );
}