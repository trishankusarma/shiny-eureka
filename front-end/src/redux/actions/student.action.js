import { studentConstant } from "../constants";
import axios from "../../helper/axiosInstance";
import { Toastify } from "../../App";

const { 
    STUDENT_ENTRY_REQ , STUDENT_ENTRY_SUCCESS , STUDENT_ENTRY_FAIL ,
    EXAM_DETAILS_REQ , EXAM_DETAILS_SUCCESS, EXAM_DETAILS_FAIL, 
    UPLOAD_ANSWER_SCRIPT_REQ , UPLOAD_ANSWER_SCRIPT_SUCCESS , UPLOAD_ANSWER_SCRIPT_FAILURE,
    SUBMIT_STATUS_REQ , SUBMIT_STATUS_SUCCESS , SUBMIT_STATUS_FAILURE,
    STUDENT_MCQ_REQ , STUDENT_MCQ_SUCCESS , STUDENT_MCQ_FAILURE,
    UPDATE_STUDENT_MCQ_REQ , UPDATE_STUDENT_MCQ_SUCCESS , UPDATE_STUDENT_MCQ_FAILURE,
    UPDATE_STUDENT_WRITTEN_MARKS_REQ,
    UPDATE_STUDENT_WRITTEN_MARKS_FAILURE,
    UPDATE_STUDENT_WRITTEN_MARKS_SUCCESS,
    GET_STUDENT_WRITTEN_LIST_FAILURE,
    GET_STUDENT_WRITTEN_LIST_REQ,
    GET_STUDENT_WRITTEN_LIST_SUCCESS,
    GET_STUDENT_WRITTEN_MARKS_SUCCESS,
    UPDATE_PROGRESS,
    END_EXAM
 , EXAM_STARTED
  } = studentConstant

export const studentSubExamEntry = (room,email,scholarId) => {

    return async (dispatch) => {
      
      dispatch({ type: STUDENT_ENTRY_REQ });
      
      try {
  
        const res = await axios.get(`/examSubjective/getExamByRoom/${room}?email=${email}&scholarId=${scholarId}`)

        console.log('subjective exam',res.data)
  
        // already registered
        if (res.data.success === 1 || res.data.success === 2) {
               
          localStorage.setItem('exam_id',res.data.studentSubjective.exam) 
        
          localStorage.setItem('student_id',res.data.studentSubjective._id) 

          localStorage.setItem('scholarId',scholarId)
          localStorage.setItem('examCode',room)
          localStorage.setItem('examType','subjective')
          localStorage.setItem('studentId',res.data.studentSubjective.student)

          localStorage.setItem('teacher_id', res.data.teacher)
          
          dispatch({
            type: STUDENT_ENTRY_SUCCESS,
            payload: {
                exam:res.data.studentSubjective.exam,
                student:res.data.studentSubjective._id,
                examCode:room
            },
          });

          if(res.data.success === 2)
             return Toastify("warning", res.data.msg); 
    
          return  Toastify("success", "Successfully registered for the exam(Subjective)!");
        
        } else if (res.data.success === 0) {
  
            // console.log("error");

            dispatch({ type: STUDENT_ENTRY_FAIL });

            Toastify("error", res.data.msg);
        }
      } catch (error) {
        // console.log(error, "error");
  
        Toastify("error", error);
        dispatch({ type: STUDENT_ENTRY_FAIL });
      }
    };
};

export const getExamDetailsSubjective = (_id)=>{

    return async (dispatch) => {
                  
        dispatch({ type: EXAM_DETAILS_REQ });

        try {                          
            const res = await axios.get(`/examSubjective/getBasicDetails/${_id}`);
            // console.log('sub_exam details',res.data)   
                     
            if(res.data.success){
                
                dispatch({
                   type: EXAM_DETAILS_SUCCESS,
                   payload:res.data
                })

            }else{
                
              dispatch({
                  type: EXAM_DETAILS_FAIL
              })

              Toastify("error", res.data.msg);
            }
        } catch (error) {
            // console.log(error, "error");
            Toastify("error", error);
            dispatch({ type: EXAM_DETAILS_FAIL });
        }
    }
}

export const uploadAnswerScript = (student_id,upload , history, socket , email , examHall,lateStatus)=>{

  return async (dispatch) => {

       try {

           console.log("submit paper",socket, lateStatus)
        
           dispatch({ type : UPLOAD_ANSWER_SCRIPT_REQ })

           const formData = new FormData()
          
           formData.append( 'upload_answer_script' , new Blob([upload]) )
           formData.append( 'lateStatus' , lateStatus)
          
           const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const {loaded, total} = progressEvent;
              const percentage = Math.floor(Math.round((100 * loaded) / total));
              
              dispatch({ 
                  type : UPDATE_PROGRESS,
                  payload : percentage
              })
            }
          };
    

           const res = await axios.patch(`/student/subjective/upload_answer_script/${student_id}?teacher=${localStorage.getItem('teacher_id')}` , formData ,config)

           console.log(res.data)

           if(res.data.success===1){

                socket.emit("submittedPaper" , { email, examHall })

                dispatch({ 
                    type : UPLOAD_ANSWER_SCRIPT_SUCCESS,
                    payload : res.data.studentSub
                })

                Toastify("success", "Successfully Submitted")
 
           }else{
           
                dispatch({ type : UPLOAD_ANSWER_SCRIPT_FAILURE })
 
                Toastify("error", res.data.msg)
           }

       } catch (error) {

          console.log(error)

          Toastify('error',"Unexpected error occured!")
       }
  }
} 

export const getStudentUploadStatus = (student_id)=>{

  return async (dispatch) => {
    
    dispatch({
        type : SUBMIT_STATUS_REQ
    })

     const basic = true

     const res = await axios.get(`/student/subjective/get_basic_student_detail/${student_id}`)

     console.log(res.data)

     if(res.data.success===1){

        dispatch({
          type : SUBMIT_STATUS_SUCCESS,
          payload : res.data.student_sub
        })

     }else{
      
      dispatch({
        type : SUBMIT_STATUS_FAILURE
      })

      Toastify('error',res.data.msg)
    }
 }
}


/***************Objective exams*********************/

export const studentObjExamEntry = (room,email,scholarId) => {

  return async (dispatch) => {
    
    dispatch({ type: STUDENT_ENTRY_REQ });
    
    try {

      const res = await axios.get(`/examObjective/getExamByName/${room}?email=${email}&scholarId=${scholarId}`)

      // console.log('objective exam',res.data)

      //2-> already registered
       if( res.data.success === 1  || res.data.success === 2 ) {

          localStorage.setItem('exam_id',res.data._student.exam) 
          localStorage.setItem('student_id',res.data._student._id) 
          localStorage.setItem('scholarId',scholarId)
          localStorage.setItem('examCode',room)
          localStorage.setItem('examType','objective')
          localStorage.setItem('examStatus',0)

          localStorage.setItem('teacher_id', res.data.teacher)
        
        dispatch({
          type: STUDENT_ENTRY_SUCCESS,
          payload:  {
              exam:res.data._student.exam,
              student:res.data._student._id,
              examCode:room
          },
        });

         if(res.data.success === 2)
            return Toastify("warning", res.data.msg);
  
         return  Toastify("success", "Successfully registered for the exam(Objective)!");
      
      } else if (res.data.success === 0) {

          // console.log("error");

          dispatch({ type: STUDENT_ENTRY_FAIL });

          Toastify("error", res.data.msg);
      }
    } catch (error) {
      // console.log(error, "error");

      Toastify("error", error);
      dispatch({ type: STUDENT_ENTRY_FAIL });
    }
  };
};

export const getExamDetailsObjective = (_id, type, index)=>{

  return async (dispatch) => {
                
      dispatch({ type: EXAM_DETAILS_REQ });

      try {

          let res
        
          if(type==='mcq'){ 

             res = await axios.get(`/examObjective/getBasicDetails/${_id}?studentMcq=${true}&skip=${index}`)
          }else if(type==='fillUp'){
            
            res = await axios.get(`/examObjective/getBasicDetails/${_id}?studentFillUp=${true}&skip=${index}`)
          }else{
            
            res = await axios.get(`/examObjective/getBasicDetails/${_id}?student=${true}`)
          }

          // console.log(res.data)

          if(res.data.success){
                
            dispatch({
               type: EXAM_DETAILS_SUCCESS,
               payload:res.data
            })
     
           }else{
            
          dispatch({
              type: EXAM_DETAILS_FAIL
          })

          Toastify("error", res.data.msg);
        }

      } catch (error) {
        // console.log(error, "error");
    
        Toastify("error", error);
        dispatch({ type: EXAM_DETAILS_FAIL });
      }
  }
}

export const getStudentDetails = (student_id)=>{

  return async (dispatch) => {

    dispatch({
      type : STUDENT_MCQ_REQ
    })
      
    try {
        
      const res = await axios.get(`/student/objective/${student_id}`)

      // console.log(res.data)
 
      if(res.data.success===1){
         
        dispatch({
          type : STUDENT_MCQ_SUCCESS,
          payload : res.data
        })    
      }else{
       
        dispatch({
          type : STUDENT_MCQ_FAILURE
        })
        Toastify('error',res.data.msg)
      }
    } catch (error) {
      
      dispatch({
        type : STUDENT_MCQ_FAILURE
      })
      Toastify('error',error)
    }
  }
}

export const updateStudentDetails = (student_id,index , response)=>{

  return async (dispatch) => {

    dispatch({
      type : UPDATE_STUDENT_MCQ_REQ
    })
      
    try {
      
      const data = {
         
            mcqResponse : response ,
            mcqNo : index
      }

      const config = {
          headers : {
            'Content-Type': 'application/json'
          }
      }

      const res = await axios.patch(`/student/objective/update/student/mcq/${student_id}`, data, config)

      // console.log(res.data)
 
      if(res.data.success===1){
         
        dispatch({
          type : UPDATE_STUDENT_MCQ_SUCCESS,
          payload : res.data.student
        })    
      }else{
       
        dispatch({
          type : UPDATE_STUDENT_MCQ_FAILURE
        })
        Toastify('error',res.data.msg)
      }
    } catch (error) {
      
      dispatch({
        type : UPDATE_STUDENT_MCQ_FAILURE
      })
      Toastify('error',error)
    }
  }
}

export const examEnded = () => {
   return async (dispatch)=>{

    localStorage.setItem('examStatus',1)

    dispatch({
      type : END_EXAM
    })
   }
}

// 0-> exam going on or has not ended

// 1-> exam ended and can view the answers

export const getStudentListWritten = (id)=>{
console.log(id,"id")
  return async (dispatch) => {

    dispatch({type : GET_STUDENT_WRITTEN_LIST_REQ})
      
    try {
      const res = await axios.get(`/examSubjective/getExamDetails/${id}`)
      console.log(res.data,"res.data")
      if(res.data.success===1){
        dispatch({
          type : GET_STUDENT_WRITTEN_LIST_SUCCESS,
          payload : res.data})    

      }else{
        dispatch({type : GET_STUDENT_WRITTEN_LIST_FAILURE})
        Toastify('error',res.data.msg)
      }
    } catch (error) {
      dispatch({type : GET_STUDENT_WRITTEN_LIST_FAILURE})
      Toastify('error',error)
    }
  }
}
export const setMarkings = (marks)=>{
  return async (dispatch) => {
    dispatch({type : "setMarks",payload:marks})
    Toastify('success',`Markes updated`)
  }
}
export const updateStudentWrittenMarks = (student_id)=>{

  return async (dispatch) => {

    dispatch({
      type : UPDATE_STUDENT_WRITTEN_MARKS_REQ
    })
      
    try {
      let marks=JSON.parse(localStorage.getItem("marks"));
      
      let tot=0;
      if(marks){
        for(let i =0 ;i<marks.length;i++){
          tot+=marks[i].mark
        }
      }else{
        return Toastify("error","Save your changes !")
      }
      console.log(marks,tot,"adasd");
      const res = await axios.patch(`/student/subjective/update_marks/${student_id}`,{marks,marksObtained:tot})

      console.log(res.data,"res.data")
 
      if(res.data.success===1){
         
        dispatch({
          type : UPDATE_STUDENT_WRITTEN_MARKS_SUCCESS,
          payload : res.data.student_sub
        })   
        Toastify('success',`Marks updated successfully!`)
        
      }else{
       
        dispatch({
          type : UPDATE_STUDENT_WRITTEN_MARKS_FAILURE
        })
        Toastify('error',res.data.msg)
      }
    } catch (error) {
      console.log(error,"errr")
      dispatch({
        type : UPDATE_STUDENT_WRITTEN_MARKS_FAILURE
      })
      Toastify('error',error)
    }
  }
}

export const updateStudentMarks = (student_id, examId)=>{

  return async (dispatch) => {

    dispatch({
      type : UPDATE_STUDENT_MCQ_REQ
    })
      
    try {

      const res = await axios.patch(`/student/objective/marks/${student_id}?examId=${examId}`)

      console.log(res.data)
 
      if(res.data.success===1){
         
        dispatch({
          type : UPDATE_STUDENT_MCQ_SUCCESS,
          payload : res.data.student
        })    
      }else{
       
        dispatch({
          type : UPDATE_STUDENT_MCQ_FAILURE
        })
        Toastify('error',res.data.msg)
      }
    } catch (error) {
      
      dispatch({
        type : UPDATE_STUDENT_MCQ_FAILURE
      })
      Toastify('error',error)
    }
  }
}

/****************************************************/

export const examStarted = () =>{
  return async (dispatch) => {

    dispatch({
      type : EXAM_STARTED
    })
  }
}

export const postReviews  = ( data ,  history ) => {
    
    return async (dispatch)=>{
       try {
           
        const config = {
          headers : {
            'Content-Type': 'application/json'
          }
         }
  
         console.log(data,history)
  
         if( localStorage.getItem('studentId')  )
               localStorage.removeItem('studentId')  
  
          const res = await axios.post('/student/review', data , config)
  
          if(res.data.success){
             
             Toastify('success', 'Thank You for submitting your review')
             
             return history.replace('/')
          }else{
              
            Toastify('error',  res.data.msg)
          }

       } catch (error) {
           
           console.log(error)
           Toastify('error',  error)
       }
    }
}

export const getStudentListSubjective  = ( data ) => {
    
  return async (dispatch)=>{
    console.log(data,"studentWrittenList")
      dispatch({type:"GET_STUDENT_EXAM_SubjectiveDetails",payload:data});
  }
}

export const searchWrittenStudents  = ( data ) => {
    
  return async (dispatch)=>{
    
      dispatch({type:"Search_studentList",payload:{name:data}});
  }
}
