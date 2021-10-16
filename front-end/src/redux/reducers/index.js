import {combineReducers} from "redux";
import auth from './auth.reducer'
import teacherRoom from './teacherRoom.reducer'
import institutes from './institute.reducer'
import student from './student.reducer'
import exams from './exams.reducer'
import mcqs from './mcq.reducer'
import socketReducer from "./socket.io.reducer"
import anitcheat from "./anitcheat.reducer"
const combineReducer=combineReducers({
     auth:auth,
     student:student,
     teacherRoom:teacherRoom,
     exams:exams,
     mcqs:mcqs,
     institutes: institutes,
     socketState:socketReducer,
     anitcheat:anitcheat
})

export default combineReducer;