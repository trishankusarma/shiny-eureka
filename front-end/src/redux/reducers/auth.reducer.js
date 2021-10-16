import { authConstant } from "../constants";
import Cookie from 'js-cookie'

const initialState = {

  authUrlTeacher:'/',
  sign_in_up_status:null,

  paidInstitutions:null,

  superAdmin: localStorage.getItem('superAdmin') 
  ? JSON.parse(localStorage.getItem('superAdmin'))
  : {
    name: "",
    email: "",
    password: ""
  },

  teacher: localStorage.getItem('teacher') 
    ? JSON.parse(localStorage.getItem('teacher')) 
    : {
      name: "",
      email: "",
      picture: "",
      phoneNo:'',
      institution:''
    },

  student: localStorage.getItem('student') 
  ? JSON.parse(localStorage.getItem('student')) 
  : {
    name: "",
    email: "",
    picture: "",
  },
  authUrlStudent:'/',

  TeachAuthenticated: Cookie.get('authorization') ? true : false,
  StudentAuthenticated: localStorage.getItem('student') ? true : false,
  SuperAdminAuthenticated: localStorage.getItem('superAdmin') ? true : false,
   
  authenticating: false,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, {type,payload}) => {

  // eslint-disable-next-line default-case
  switch (type) {
    //SuperAdmin
    case authConstant.LOGIN_SUPERADMIN_REQ:
      state = {
        ...state,
        authenticating: true
      };
      break;

    case authConstant.LOGIN_SUPERADMIN_SUCCESS:
      state = {
        ...state,
        superAdmin: payload.superAdmin,
        sign_in_up_status: 1,
        SuperAdminAuthenticated: true,
        authenticating: false
      };
      break;

    case authConstant.LOGIN_SUPERADMIN_FAIL:
      state = {
        ...state,
        SuperAdminAuthenticated: false,
        authenticating: false
      };
      break;

    //teacher
    case authConstant.LOGIN_TEACHER_REQ:
      state = {
        ...state,
        authenticating: true
      };
      break;

    case authConstant.GOOGLE_AUTH_URL_TEACHER:
      state = {
        ...state,
        authenticating: false,
        authUrlTeacher: payload
      };
      break;

    case authConstant.LOGIN_TEACHER_SUCCESS:
      state = {
        ...state,
        teacher: payload.teacher,
        sign_in_up_status: payload.scope,
        authenticating: false,
        TeachAuthenticated: true,
      };
      break;

    case authConstant.LOGIN_TEACHER_FAIL:
      state = {
        ...state,
        TeachAuthenticated: false,
        authenticating: false
      };
      break;

    //   student
    case authConstant.LOGIN_STUDENT_REQ:
      state = {
        ...state,
        authenticating: true
      };
      break;

    case authConstant.GOOGLE_AUTH_URL_STUDENT:
      state = {
        ...state,
        authenticating: false,
        authUrlStudent: payload
      };
      break;

    case authConstant.LOGIN_STUDENT_SUCCESS:
      state = {
        ...state,
        student: payload,
        authenticating: false,
        StudentAuthenticated: true,
      };
      break;

    case authConstant.LOGIN_STUDENT_FAIL:
      state = {
        ...state,
        StudentAuthenticated: false,
        authenticating: false
      };
      break;

    //   logout
    case authConstant.LOGOUT_REQ:
      state = {
        ...state,
        loading: true
      };
      break;

    case authConstant.LOGOUT_SUCCESS:
      state = {
        ...state,
        TeachAuthenticated: false,
        StudentAuthenticated: false,
        loading: false
      };
      break;

    case authConstant.SUPER_LOGOUT_SUCCESS:
      state = {
        ...state,
        SuperAdminAuthenticated: false,
        loading: false
      };
      break;

    case authConstant.LOGOUT_FAIL:
      state = {
        ...state,
        loading: false
      };
      break;

    //  get paid institutions
    case authConstant.GET_PAID_INS_REQ:
      state = {
        ...state,
        loading: true
      };
      break;

    case authConstant.GET_PAID_INS_SUCCESS:
      state = {
        ...state,
        paidInstitutions: payload,
        loading: false
      };
      break;

    case authConstant.GET_PAID_INS_FAIL:
      state = {
        ...state,
        loading: false
      };
      break;

    //UPDATE Teacher
    case authConstant.UPDATE_TEACHER_REQ:
      state = {
        ...state,
        loading: true
      };
      break;

    case authConstant.UPDATE_TEACHER_SUCCESS:
      state = {
        ...state,
        sign_in_up_status: null,
        teacher: payload.teacher,
        loading: false
      };
      break;

    case authConstant.UPDATE_TEACHER_FAIL:
      state = {
        ...state,
        loading: false
      };
      break;
    
    case authConstant.GET_TEACHER_SUCCESS:

      console.log(payload)

      state = {
        ...state,
        teacher: payload,
      };
      break;
  }

  return state;
};
