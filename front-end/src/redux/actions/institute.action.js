 import { instituteConst } from '../constants';
 import axios from "../../helper/axiosInstance";
 import { Toastify } from "../../App";

 const {
   GET_ALL_INSTITUTES_REQ,
   GET_ALL_INSTITUTES_SUCCESS,
   GET_ALL_INSTITUTES_FAIL,

   // Get ONE Institute by ID
   GET_INSTITUTE_REQ,
   GET_INSTITUTE_SUCCESS,
   GET_INSTITUTE_FAIL,

   //   CREATE INSTITUTE
   CREATE_INSTITUTE_REQ,
   CREATE_INSTITUTE_SUCCESS,
   CREATE_INSTITUTE_FAIL,

   //   UPDATE INSTITUTE
   UPDATE_INSTITUTE_REQ,
   UPDATE_INSTITUTE_SUCCESS,
   UPDATE_INSTITUTE_FAIL,

   //   DELETE INSTITUTE
   DELETE_INSTITUTE_REQ,
   DELETE_INSTITUTE_SUCCESS,
   DELETE_INSTITUTE_FAIL
 } = instituteConst;

//  get all institutes
export const getAllInstitutes = () => async(dispatch) => {
    dispatch({type: GET_ALL_INSTITUTES_REQ});

    try {
        let res = await axios.get('/institution');

        if(res.data.success === 1) {
            dispatch({
              type: GET_ALL_INSTITUTES_SUCCESS,
              payload: res.data
            });
        }
        else if(res.data.success === 0) {
            console.error("error in getting all institutes");
            Toastify('error', res.data.msg);
        }
    }
    catch(error) {
        console.log('error: ', error);
        Toastify('error', error);
        dispatch({type: GET_ALL_INSTITUTES_FAIL});
    }
}