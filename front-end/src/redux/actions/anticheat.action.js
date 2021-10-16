import { Cheat } from "../constants";
import axios from "../../helper/axiosInstance";
// import { Toastify } from "../../App";
// import socket from "../../helper/socket.io";

export const cheatDetected = (msg , socket , email, examHall, type) => {

  return async (dispatch) => {
    try {

        console.log(msg,email,examHall, "socket", socket)

        socket?.emit("cheatDetected", {
            notification : msg,
            email ,
            examHall
        })

        const config = {
            headers: {
              "Content-Type": "application/json",
            }
        };

        let data = {
           type: type    
        }

        await axios.patch(`/student/subjective/update_notifications/${localStorage.getItem('student_id')}` , data ,config)

        dispatch({ type: Cheat.CHEAT_DETECTED ,payload:msg});

    }
    catch(err){
        console.log(err)
        dispatch({ type: Cheat.NOT_CHEATING});
        }
    }
}

export const noCheat = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: Cheat.NOT_CHEATING});
        
  
      }
      catch(err){
          console.log(err)
          dispatch({ type: Cheat.CHEAT_DETECTED ,payload:err});
          }
      }
  }
