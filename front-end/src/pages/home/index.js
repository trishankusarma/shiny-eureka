import React,{useEffect} from 'react'
import NavbarHome from '../../component/shared/Navbar'
import SectionOne from '../../component/home/section1'
import KeyFeatures from '../../component/home/KeyFeatures'
import Footer from '../../component/home/Footer2'
import { GetTeacherAuthUrl , loginTeacher, logoutTeacher , GetStudentAuthUrl , loginStudent, logoutStudent } from "../../redux/actions";

import ContactUs from '../../component/home/ContactUs/contactUs'
import AboutUS from '../../component/home/AboutUs/AboutUs'
import Grid from '@material-ui/core/Grid';
// import Pricing from '../../component/home/Pricing/Pricing'
import VideoElement from '../../component/home/Video/video'
import Faq from '../../component/home/Faq/Faq'
import { useDispatch, useSelector } from "react-redux";
import { scroller } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles'

import queryString from 'query-string'

import { useHistory } from 'react-router-dom';

const scrollToAboutUs = () => {
  scroller.scrollTo('aboutUsScroll', {
    duration: 100,
    delay: 0,
    smooth: 'easeOutQuart'
  });
};

const useStyles = makeStyles((theme) => ({
    home:
    {
        overflow: 'hidden'
    },
    contact:
    {
        width: '95%',
        margin: 'auto',
    },

}));

function Home({location}) {

    const auth = useSelector(state=>state.auth)

    const history = useHistory()

    useEffect(async ()=>{

        const { pathname } = location

        if(auth.TeachAuthenticated && auth.sign_in_up_status===1){
                
          history.push('/teacher/Information')
          return
       }

        if(auth.TeachAuthenticated && pathname==='/teacher/google/callback'){

          history.push("/teacher/ExamHall")
   
          return
        }

        if(auth.StudentAuthenticated && pathname==='/student/google/callback'){

           history.push("/student/StudentEntryForm")
    
           return
         }

        if(!auth.TeachAuthenticated && pathname==='/teacher/google/callback'){

            console.log(pathname,"pathname")

            const { code } = queryString.parse(location.search)
            
            dispatch(loginTeacher(`${pathname}?code=${code}`))
     
            return
        }

        if(!auth.StudentAuthenticated && pathname==='/student/google/callback'){

            const { code } = queryString.parse(location.search)
            
            dispatch(loginStudent(`${pathname}?code=${code}` ))
        }
    },[auth.StudentAuthenticated , auth.TeachAuthenticated])
    
    const dispatch = useDispatch();

    const classes = useStyles();

    return (
      <div>
        <NavbarHome
          dispatch={dispatch}
          GetTeacherAuthUrl={GetTeacherAuthUrl}
          logoutTeacher={logoutTeacher}
          GetStudentAuthUrl={GetStudentAuthUrl}
          logoutStudent={logoutStudent}
          auth={auth}
        />
        <div className={classes.SectionOne}><SectionOne scrollToAboutUs={scrollToAboutUs} /> </div>

        <VideoElement />

        <KeyFeatures />
        {/* <Pricing /> */}
        <Grid
          container
          spacing={3}
          direction='row'
          justify='space-around'
          alignItems='center'
          className={classes.contact}
        >
          <Grid item xs={12} md={6}>
            <AboutUS />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactUs />
          </Grid>
        </Grid>
        <Faq />
        <Footer />
      </div>
    );
}

export default Home
