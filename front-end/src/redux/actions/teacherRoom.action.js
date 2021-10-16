import { teacherRoomConst } from "../constants";
import axios from "../../helper/axiosInstance";
import { Toastify } from "../../App";

const { UPDATE_STUDENT_SUCCESS , DELETE_STUDENT_SUCCESS , GET_STUDENTDATA_REQ } = teacherRoomConst

export const searchRoom = (name) =>{
  return async (dispatch) => {
      dispatch({ 
        type: teacherRoomConst.SEARCH_ROOM,
        payload:name
      })
  };
}

export const searchExam = (name, value) =>{
  return async (dispatch) => {
      dispatch({ 
        type: teacherRoomConst.SEARCH_EXAM,
        payload:{
          name,
          value
        }
      })
  };
}

export const clearSearch = () =>{
  return async (dispatch) => {
      dispatch({ 
        type: teacherRoomConst.CLEAR_SEARCH_ROOM,
      })
  };
}

export const clearSearchExam = () =>{
  return async (dispatch) => {
      dispatch({ 
        type: teacherRoomConst.CLEAR_SEARCH_EXAM,
      })
  };
}

export const GetExamRooms = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: teacherRoomConst.GET_ROOM_REQ });

      let res = await axios.get("/classroom");
      
      if (res.data.success === 1) {
        dispatch({
          type: teacherRoomConst.GET_ROOM_SUCCESS,
          payload: res.data.classrooms,
        });
      } else if (res.data.success === 0) {

        console.log("get rooms fail",res.data)

        dispatch({
          type: teacherRoomConst.GET_ROOM_FAIL,
          payload: res.data.classrooms,
        });

        Toastify("error", res.data.msg);
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
      dispatch({ type: teacherRoomConst.GET_ROOM_FAIL });
    }
  };
};

export const GetOneExamRoom = (id) => {
  return async (dispatch) => {
    try {
      
      dispatch({ type: teacherRoomConst.GET_ONE_ROOM_REQ });
      let res = await axios.get("/classroom/"+id);
      
      if (res.data.success === 1) {
        console.log(res.data,"class data")
        dispatch({
          type: teacherRoomConst.GET_ONE_ROOM_SUCCESS,
          payload: res.data.classroom,
        });
      } else if (res.data.success === 0) {
        dispatch({type: teacherRoomConst.GET_ONE_ROOM_FAIL});
        Toastify("error", "Something went wrong");
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
      dispatch({ type: teacherRoomConst.GET_ONE_ROOM_FAIL });
    }
  };
};


export const createRoom = (body) => {
  return async (dispatch) => {
    console.log(body, "body createroom");
    dispatch({ type: teacherRoomConst.CREATE_ROOM_REQ });

    try {
      const res = await axios.post("/classroom/create", body );
      console.log(res.data, "res.data");

      if (res.data.success === 1) {

        dispatch({
          type: teacherRoomConst.CREATE_ROOM_SUCCESS,
          payload: res.data.classroom,
        });

        return Toastify("success", `${body.name} Classroom created`);
      } else if (res.data.success === 0) {
        dispatch({ type: teacherRoomConst.CREATE_ROOM_FAIL });
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
      dispatch({ type: teacherRoomConst.CREATE_ROOM_FAIL });
    }
  };
};


export const deleteRoom = (id, rooms) => {
  return async (dispatch) => {
    try {
      console.log(id,"id");
      const res = await axios.delete("/classroom/delete/" + id);

      console.log(res.data, "res.data");

      if (res.data.success === 1) {
        rooms = rooms.filter((room) => room._id !== id);

        dispatch({
          type: teacherRoomConst.DELETE_EDIT_ROOM_SUCCESS,
          payload: rooms,
        });

        return Toastify("success", res.data.msg);
      } else if (res.data.success === 0) {
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
    }
  };
};

export const editRoom = (id, data,rooms) => {
  return async (dispatch) => {
    try {
      console.log(id, data,rooms, "res.data");
      const res = await axios.patch("/classroom/edit/" + id, data);

      console.log(res.data, "res.data");

      if (res.data.success === 1) {
        rooms = await rooms.map((room)=>room._id===id ? res.data.classroom : room )
        console.log(rooms,"rooms")
        dispatch({
          type: teacherRoomConst.DELETE_EDIT_ROOM_SUCCESS,
          payload: rooms,
        });

        return Toastify("success", "Edited succesfully");
      } else if (res.data.success === 0) {
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
    }
  };
};




export const uploadStudentList = (id, file) => {
  return async (dispatch) => {
    // upload_excel_sheet
    try {
      dispatch({ type: teacherRoomConst.UPLOAD_STUDENTDATA_REQ });
      const res = await axios.post("/classroom/uploadExcelSheet/"+id, file);
      if (res.data.success === 1) {
        dispatch({ type: teacherRoomConst.UPLOAD_STUDENTDATA_SUCCESS });
        return Toastify("success", res.data.msg);
      } else if (res.data.success === 0) {
        dispatch({type: teacherRoomConst.UPLOAD_STUDENTDATA_FAIL});
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      Toastify("error", error);
      dispatch({ type: teacherRoomConst.UPLOAD_STUDENTDATA_FAIL });
    }
  };
};


export const getStudentList = (_id)=>{
  return async (dispatch)=>{
    dispatch({ type: teacherRoomConst.GET_STUDENTDATA_REQ })

    try {
      const res = await axios.get(`/classroom/students/${_id}`)

      console.log(res.data.students)

      if (res.data.success === 1) {

        dispatch({
          type: teacherRoomConst.GET_STUDENTDATA_SUCCESS,
          payload: res.data
        });

      } else if (res.data.success === 0) {

        dispatch({ type: teacherRoomConst.GET_STUDENTDATA_FAIL })

        console.log("error");
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      console.log(error, "error");

      Toastify("error", error);
      dispatch({ type: teacherRoomConst.GET_STUDENTDATA_FAIL });
    }
  };
}

export const updateClassRoom = (id, data, rooms) => {
  return async (dispatch) => {
    dispatch({ type: teacherRoomConst.UPDATE_ROOM_REQ });

    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.patch("/classroom/update/:id", data, config);

      if (res.data.success === 1) {
        rooms.filter(room=>{
            if(room._id==res.data.classroom._id){
                return res.data.classroom
            }
        })
        dispatch({
          type: teacherRoomConst.UPDATE_ROOM_SUCCESS,
          payload: rooms,
        });

        return Toastify("success", "Registration Done");
      } else if (res.data.success === 0) {
        dispatch({ type: teacherRoomConst.UPDATE_ROOM_FAIL });  
        console.log("error");
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      console.log(error, "error");

      Toastify("error", error);
      dispatch({ type: teacherRoomConst.UPDATE_ROOM_FAIL });
    }
  };
};

//student list
export const updateStudent = (student) => {
    
    return async (dispatch)=>{

         dispatch({ type : GET_STUDENTDATA_REQ })
        
         try {
           
              const config = {
                headers: {
                    'content-type': 'application/json'
                }
              };
        
              const { name , email , scholarId } = student
          
              const res = await axios.patch(`/student/${student._id}`, {
                name, email , scholarId
              }, config );
        
              if(res.data.success===1){
                 
                 dispatch( { 
                     type : UPDATE_STUDENT_SUCCESS ,
                     payload : res.data.student
                 })

                 return Toastify('success' ,'Saved')
              }else
                  Toastify('error' , res.data.msg)
            
         } catch (error) {
              
             Toastify('error' , error)
         }
    }
}

export const deleteStudent = (_id) => {
    
  return async (dispatch)=>{
      
       dispatch({ type : GET_STUDENTDATA_REQ })
      
       try {
         
        const res = await axios.delete(`/student/${_id}`)

        console.log(res.data)

        if(res.data.success===1){

          console.log(res.data.student)
            
          dispatch({ 
            type : DELETE_STUDENT_SUCCESS ,
            payload : res.data.student
          })
          
          return Toastify('success','Successfully removed!')
        }else
            Toastify('error',res.data.msg)
        
          
       } catch (error) {
            
            Toastify('error' , error)
       }
  }
}



export const captureImg=(image,id)=>{
  return async (dispatch)=>{
    try{
      console.log(image,"image")
     let res= await axios.patch(`student/subjective/upload_image_tracking/${id}`,{
        image:image
     })
     console.log(res.data,"res.data")
    }
    catch(err){
      console.log(err)

    }
  }
}