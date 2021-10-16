/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-expressions */
import {instituteConst} from '../constants';

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

const initialState ={
    loading: false,
    institutes: null

}

export default (state= initialState, {type, payload}) => {
    // eslint-disable-next-line default-case
    switch (type) {
        // Get all institutes
        case GET_ALL_INSTITUTES_REQ:
            return {
                ...state,
                loading: true
            }

        case GET_ALL_INSTITUTES_SUCCESS: 
        return {
          ...state,
          loading: false,
          institutes: payload.institutions
        };

        case GET_ALL_INSTITUTES_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}