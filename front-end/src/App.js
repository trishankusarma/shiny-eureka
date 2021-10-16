import React, { Suspense } from "react";
import './App.css'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import Loader from "./component/shared/Loader";
// import socket from "./helper/socket.io";
import dotenv from "dotenv";
dotenv.config();
// let socket=io()

const ViewQuestionMcq = React.lazy(() => import("./pages/teacher/ViewQuestionMcq"));
const ExamHall = React.lazy(() => import("./pages/teacher/ExamHall"));
const ExamRoom = React.lazy(() => import("./pages/teacher/ExamRoom"));
const ExamsRoom = React.lazy(() => import("./pages/teacher/ExamsRoom"));
const CreateMcqExam = React.lazy(() => import("./pages/teacher/CreateMCQExam"));
const CreateMcq = React.lazy(() => import("./pages/teacher/CreateMcq"));
const Instruction = React.lazy(() => import("./pages/teacher/Instruction"));
const CreateWrittenExam = React.lazy(() => import("./pages/teacher/CreateWrittenExam"));
const Fromvalid = React.lazy(() => import("../src/component/shared/FormValidation/Fromvalid"));
const Home = React.lazy(() => import("./pages/home"));
const StudentEntryForm = React.lazy(() => import("./pages/student/StudentEntry"));
const StudentHistory = React.lazy(() => import("./pages/teacher/StudentHistory"));
const CheckCopywritten = React.lazy(() => import("./pages/teacher/CopyCheckWritten"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const FaceDetection = React.lazy(() => import("./component/shared/FaceDetection/index"));
const ExamInstructions = React.lazy(() => import("./pages/student/ExamRoom/instructions"))
const ExamRoomStudent = React.lazy(() => import("./pages/student/ExamRoom/Examroom"));
const Privacy = React.lazy(() => import("./component/shared/PrivacyPolicy/Privacy"));
const ViewExam = React.lazy(() => import("./pages/teacher/ViewExam"));
const ExamEdit = React.lazy(() => import("./pages/teacher/ExamEdit"));
const StudentList = React.lazy(() => import("./component/teacher/StudentList"));
const Profile = React.lazy(() => import("./component/teacher/TeacherProfile"));
// const Pdf = React.lazy(()=>import("./component/teacher/CopyCheckWritten/PdfTron"))
const StudentMcqForm = React.lazy(()=>import("./pages/student/StudentMcqExam"));
const SubmissionTime = React.lazy(()=>import("./component/student/SubmissionTime"));
const McqNavigation = React.lazy(()=>import("./component/student/McqNavigation"));
const Face2 = React.lazy(() => import("./component/shared/FaceDetection/utilities"));
const Face = React.lazy(() => import("./component/shared/FaceDetection/index"));
const FeedBackForm = React.lazy(()=>import("./pages/student/FeedBackFrom"));

const SuperLogin = React.lazy(() => import("./component/superAdmin/SuperLogin"))
const SuperSignup = React.lazy(() => import("./component/superAdmin/SuperSignup"))
const SuperDashboard = React.lazy(() => import("./component/superAdmin/SuperDashboard"))


// socket.onAny((event, ...args) => {
//   console.log(event, args,"socket events");
// });

// console.log = function () {};

export const Toastify=(type,msg)=>{
  
  switch(type){
    case "success":
      toast.success(msg);
      break;
    case "warning":
      toast.warn(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "info":
      toast.info(msg);
      break;     
  }
  
}


function App() {

  const auth = useSelector(state=>state.auth)
  const teacherRoom = useSelector(state=>state.teacherRoom)
  const exams = useSelector(state=>state.exams)
  toast.configure({hideProgressBar:true});
  if(auth.authenticating||auth.loading){
    return <Loader/>;
  }

  return (
    <div className='App'>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {/* <Route exact path='/' component={CheckCopywritten} /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/privacypolicy" component={Privacy} />

            {/* teacher */}
            <Route exact path='/teacher/google/callback' component={Home} />

            <PrivateRoute exact path="/teacher/ExamHall" component={ExamHall} />
            <PrivateRoute exact path="/teacher/Information" component={Fromvalid} />
            <PrivateRoute exact path="/teacher/CheckCopywritten/:id" component={CheckCopywritten} />
            <PrivateRoute exact path="/teacher/studenthistory" component={StudentHistory} /> 
            <PrivateRoute exact path="/teacher/ExamRoom" component={ExamRoom} />
            <PrivateRoute exact path="/teacher/ExamsRoom/:id" component={ExamsRoom} />
            
            <PrivateRoute exact path="/teacher/CreateMcqExam/:_classroomId" component={CreateMcqExam} />
            <PrivateRoute exact path="/teacher/CreateMcq/:_examId" component={CreateMcq} />
                      
            <PrivateRoute exact path="/teacher/CreateWrittenExam/:_classroomId" component={CreateWrittenExam} />
            <PrivateRoute exact path="/teacher/viewExam/:id" component={ViewExam} />
            <PrivateRoute exact path="/teacher/Instruction/:roomId/:id" component={Instruction} />
            <PrivateRoute exact path="/teacher/ExamEdit/:id" component={ExamEdit} />
            <PrivateRoute exact path="/teacher/Instruction/:id" component={Instruction} />
            
            <Route exact path="/studentList/:_classroomId" component={StudentList} />
            <PrivateRoute exact path='/teacher/profile' component={Profile} />

            <Route exact path="/student/ExamRoomStudent" component={ExamRoomStudent} /> 
            {/* student */}
            <Route exact path='/student/google/callback' component={Home} />
            
            <Route exact path="/student/ExamRoomStudent" component={ExamRoomStudent} />
            <Route exact path="/student/ExamInstructions" component={ExamInstructions} />
            <Route exact path="/student/StudentEntryForm" component={StudentEntryForm} /> 
            {/* super admin */}

            <Route
              exact
              path='/api/hiddenPath/superLogin'
              component={SuperLogin}
            />
            <Route
              exact
              path='/api/hiddenPath/superSignup'
              component={SuperSignup}
            />
            <Route
              exact
              path='/api/hiddenPath/superDashboard'
              component={SuperDashboard}
            />

            <Route 
               exact 
               path="/student/feedback" 
               component={FeedBackForm} 
            />

           <Route 
              exact 
              path="/student/mcqForm" 
              component={StudentMcqForm} 
            />

            {/* testing components */}
            {/* <Route exact path="/student/McqNavigation" component={McqNavigation} />
            <Route exact path="/student/Submission" component={SubmissionTime} />
            <Route exact path="/student/mcqForm" component={StudentMcqForm} />
            <Route exact path="/face" component={FaceDetection} />  
            <Route exact path="/pdf" component={Pdf} />  
            <Route exact path="*" component={Page404} />
            <Route exact path='/testing/face' component={Face} />
            <Route exact path='/testing/face2' component={Face2} /> */}
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
