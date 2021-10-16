import { OneExamConst } from "../constants";
import axios from "../../helper/axiosInstance";
import { Toastify } from "../../App";

const {
    GET_MCQ_EXAM_REQ, GET_MCQ_EXAM_SUCCESS , GET_MCQ_EXAM_FAIL,
    
    CREATE_MCQ_REQ , CREATE_MCQ_SUCCESS , CREATE_MCQ_FAILURE,
    EDIT_MCQ_REQ, EDIT_MCQ_SUCCESS , EDIT_MCQ_FAILURE,
    DELETE_MCQ_REQ , DELETE_MCQ_SUCCESS , DELETE_MCQ_FAILURE,
    
    CREATE_MCQ_OPTIONS_REQ , CREATE_MCQ_OPTIONS_SUCCESS , CREATE_MCQ_OPTIONS_FAILURE,
    EDIT_MCQ_OPTIONS_REQ, EDIT_MCQ_OPTIONS_SUCCESS , EDIT_MCQ_OPTIONS_FAILURE,
    DELETE_MCQ_OPTIONS_REQ , DELETE_MCQ_OPTIONS_SUCCESS , DELETE_MCQ_OPTIONS_FAILURE,
} = OneExamConst

export const get_mcq_exam_Details = (examId)=>{
    return async (dispatch)=>{

        dispatch({  type: GET_MCQ_EXAM_REQ })

         try {
            
            let res = await axios.get(`/examObjective/getBasicDetails/${examId}?auth=${true}`);

            console.log(res.data)
      
            if (res.data.success === 1) {
              dispatch({
                    type: GET_MCQ_EXAM_SUCCESS,
                    payload: res.data
              });
            } 
            else if (res.data.success === 0) {
                console.log("error");
                Toastify("error", res.data.msg);
                dispatch({ type: GET_MCQ_EXAM_FAIL });
            }

         } catch (error) {

            console.log(error, "error");
            Toastify("error", error);
            dispatch({ type: GET_MCQ_EXAM_FAIL });
         }
    }
}

export const create_mcq = (examId,questionNo)=>{
    return async (dispatch)=>{

        dispatch({  type: CREATE_MCQ_REQ })

         try {

            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            };
            
            let res = await axios.post(`/examObjective/mcqs/create/${examId}`,{ 
                questionNo
            },config);

            console.log(res.data)
      
            if (res.data.success === 1) {
              dispatch({
                    type: CREATE_MCQ_SUCCESS,
                    payload: res.data.mcq
              });
            } 
            else if (res.data.success === 0) {
                console.log("error");
                Toastify("error", res.data.msg);
                dispatch({ type: CREATE_MCQ_FAILURE });
            }

         } catch (error) {

            console.log(error, "error");
            Toastify("error", error);
            dispatch({ type: CREATE_MCQ_FAILURE });
         }
    }
}

export const edit_mcq = (mcq)=>{
    return async (dispatch)=>{

        dispatch({  type: EDIT_MCQ_REQ })

         try {

            console.log(mcq)

            const formData = new FormData()
            
            // mcqType marks fileId mcqImage
            
            if(mcq.upload_mcq){
                formData.append('upload_mcq', mcq.upload_mcq)
            }

            formData.append('question', mcq.question)
            formData.append('mcqType',mcq.mcqType)
            formData.append('marks',mcq.marks)

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {

                    let progress = (progressEvent.loaded / progressEvent.total) ;

                    console.log(progress)
                }
            };
            
            let res = await axios.patch(`/examObjective/mcqs/edit/${mcq._id}`,formData,config);

            console.log(res.data)
      
            if (res.data.success === 1) {
              dispatch({
                    type: EDIT_MCQ_SUCCESS,
                    payload: res.data.mcq
              });

              return Toastify("success","Saved")
            } 
            else if (res.data.success === 0) {
                console.log("error");
                Toastify("error", res.data.msg);
                dispatch({ type: EDIT_MCQ_FAILURE });
            }

         } catch (error) {

            console.log(error, "error");
            Toastify("error", error);
            dispatch({ type: EDIT_MCQ_FAILURE });
         }
    }
}

export const delete_mcq = (mcq)=>{
    return async (dispatch)=>{

        dispatch({  type: DELETE_MCQ_REQ })

         try {

            let res = await axios.delete(`/examObjective/mcqs/delete/${mcq._id}`);

            console.log(res.data)
      
            if (res.data.success === 1) {
              dispatch({
                    type: DELETE_MCQ_SUCCESS,
                    payload: res.data.mcq
              });
            } 
            else if (res.data.success === 0) {
                console.log("error");
                Toastify("error", res.data.msg);
                dispatch({ type: DELETE_MCQ_FAILURE });
            }

         } catch (error) {

            console.log(error, "error");
            Toastify("error", error);
            dispatch({ type: DELETE_MCQ_FAILURE });
         }
    }
}

export const create_mcq_options = (mcqId,option)=>{
    return async (dispatch)=>{

        dispatch({  type: CREATE_MCQ_OPTIONS_REQ })

         try {

            const formData = new FormData()
            
            // optionNo description correct_status
            
            if(option.upload_option){
                formData.append('upload_option', option.upload_option)
            }

            formData.append('optionNo', option.optionNo)
            formData.append('description',option.description)
            formData.append('correct_status',option.correct_status)

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            
            let res = await axios.post(`/examObjective/mcqs/options/create/${mcqId}`,formData,config);

            console.log(res.data)
      
            if (res.data.success === 1) {
              dispatch({
                    type: CREATE_MCQ_OPTIONS_SUCCESS,
                    payload: res.data.option
              });
            } 
            else if (res.data.success === 0) {
                console.log("error");
                Toastify("error", res.data.msg);
            }

         } catch (error) {

            console.log(error, "error");
            Toastify("error", error);
         }
    }
}

export const edit_options_mcq = (option)=>{
    return async (dispatch)=>{

        dispatch({  type: EDIT_MCQ_OPTIONS_REQ })

         try {

            const formData = new FormData()
            
            // optionNo description correct_status
            
            if(option.upload_option){

                formData.append('upload_option', option.upload_option)
            }

            formData.append('optionNo', option.optionNo)
            formData.append('description',option.description)
            formData.append('correct_status',option.correct_status)

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            
            let res = await axios.patch(`/examObjective/mcqs/options/edit/${option._id}`,formData,config);

            console.log(res.data)
      
            if (res.data.success === 1) {
              dispatch({
                    type: EDIT_MCQ_OPTIONS_SUCCESS,
                    payload: res.data.option
              });

              return Toastify("success","Saved")
            } 
            else if (res.data.success === 0) {
                console.log("error");
                Toastify("error", res.data.msg);
            }

         } catch (error) {

            console.log(error, "error");
            Toastify("error", error);
         }
    }
}

export const delete_options_mcq = (option)=>{
    return async (dispatch)=>{

         try {

            let res = await axios.delete(`/examObjective/mcqs/options/delete/${option._id}`);

            console.log(res.data)
      
            if (res.data.success === 1) {
              dispatch({
                    type: DELETE_MCQ_OPTIONS_SUCCESS,
                    payload: res.data.option
              });
            } 
            else if (res.data.success === 0) {
                console.log("error");
                Toastify("error", res.data.msg);
            }

         } catch (error) {

            console.log(error, "error");
            Toastify("error", error);
         }
    }
}