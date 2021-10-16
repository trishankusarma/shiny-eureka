import { authConstant } from '../constants';
import axios from '../../helper/axiosInstance';
import { Toastify } from '../../App';

import Cookie from 'js-cookie';

/********************Teacher***********************/

const clearLocalStorage = () => {
  if (localStorage.getItem('exam_id')) {
    localStorage.removeItem('exam_id');
  }
  if (localStorage.getItem('student_id')) {
    localStorage.removeItem('student_id');
  }
  if (localStorage.getItem('scholarId')) {
    localStorage.removeItem('scholarId');
  }
  if (localStorage.getItem('examCode')) {
    localStorage.removeItem('examCode');
  }
  if (localStorage.getItem('examType')) {
    localStorage.removeItem('examType');
  }
  if (localStorage.getItem('examStatus')) {
    localStorage.removeItem('examStatus');
  }
  if(localStorage.getItem('submitStatus')){
     localStorage.removeItem('submitStatus')
  }

  if(localStorage.getItem('index')){
     localStorage.removeItem('index')
  }

  if(localStorage.getItem('count')){
    localStorage.removeItem('count')
 }

 if(localStorage.getItem('enableFullScreen')){
  localStorage.removeItem('enableFullScreen')
}

 if(localStorage.getItem('fullScreenTime'))
       localStorage.removeItem('fullScreenTime')

  if(localStorage.getItem('testMessage'))
      localStorage.removeItem('testMessage')

  if(localStorage.getItem('teacher_id')){
    localStorage.removeItem('teacher_id')
  }
};

export const GetTeacherAuthUrl = () => {
  return async (dispatch) => {
    try {
      // console.log(process.env.API,"process.env.API")
      let res = await axios.get('/teacher/googleAuthUrl');
      console.log(res.data,"res.data")
      if (res.data.success === 1) {
        dispatch({
          type: authConstant.GOOGLE_AUTH_URL_TEACHER,
          payload: res.data.url
        });
      } else if (res.data.success === 0) {
        console.log('error');
        Toastify('error', 'Something went wrong');
      }
    } catch (error) {
      console.log(error, 'error');
      Toastify('error', error);
      dispatch({ type: authConstant.LOGIN_TEACHER_FAIL });
    }
  };
};

/**************SUPERADMIN ***************/
export const signupSuperAdmin =
  ({ email, name, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('superAdmin/create', body, config);

      if (res.data.success === 1) {
        localStorage.setItem('superAdmin', JSON.stringify(res.data.superAdmin));

        const token = Cookie.get('authorization');

        dispatch({
          type: authConstant.LOGIN_SUPERADMIN_SUCCESS,
          payload: res.data,
          token
        });

        return Toastify('success', 'SuperAdmin Account Created!');
      } else if (res.data.success === 0) {
        console.log('error');
        Toastify('error', res.data.msg);
      }
    } catch (error) {
      console.log('error', error.message);
      Toastify('error', error);
      dispatch({ type: authConstant.LOGIN_SUPERADMIN_FAIL });
    }
  };

export const loginSuperAdmin = (email, password) => async (dispatch) => {
  dispatch({ type: authConstant.LOGIN_SUPERADMIN_REQ });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('superAdmin/login', body, config);

    if (res.data.success === 1) {
      localStorage.setItem('superAdmin', JSON.stringify(res.data.superAdmin));
      console.log(res.data);

      const token = Cookie.get('authorization');

      dispatch({
        type: authConstant.LOGIN_SUPERADMIN_SUCCESS,
        payload: res.data,
        token
      });

      return Toastify('success', 'Verified login successfully');
    } else if (res.data.success === 0) {
      console.log('error');
      Toastify('error', res.data.msg);
    }
  } catch (error) {
    console.log('error', error.message);
    Toastify('error', error);
    dispatch({ type: authConstant.LOGIN_SUPERADMIN_FAIL });
  }
};

export const logoutSuperAdmin = () => async (dispatch) => {
  dispatch({ type: authConstant.LOGOUT_REQ });

  try {
    const res = await axios.get('/superAdmin/logout');

    console.log(res);

    if (res.data.success === 1) {
      if (localStorage.getItem('superAdmin')) {
        localStorage.removeItem('superAdmin');
        console.log('localStorage.removeItem(superAdmin)')
      }

      dispatch({
        type: authConstant.SUPER_LOGOUT_SUCCESS
      });

      return Toastify('success', 'Logout successful');
    } else if (res.data.success === 0) {
      console.log('error');
      Toastify('error', res.data.msg);
    }
  } catch (error) {
    console.log(error, 'error');

    Toastify('error', error);
    dispatch({ type: authConstant.SUPER_LOGOUT_FAIL });
  }
};

/**************SUPERADMIN ENDS ***************/

export const loginTeacher = (link) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_TEACHER_REQ });

    try {
      const res = await axios.get(link);

      console.log(res.data);

      if (res.data.success === 1) {
        localStorage.setItem('teacher', JSON.stringify(res.data.teacher));

        dispatch({
          type: authConstant.LOGIN_TEACHER_SUCCESS,
          payload: res.data
        });

        if (res.data.scope === 1) {
          return Toastify('success', 'Account Created!');
        }

        return Toastify('success', 'Verified login successfully');
      } else if (res.data.success === 0) {
        console.log('error');
        return Toastify('error', res.data.msg);
      }
    } catch (error) {
      console.log(error, 'error');

      Toastify('error', error);
      dispatch({ type: authConstant.LOGIN_TEACHER_FAIL });
    }
  };
};

export const logoutTeacher = (link) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_REQ });

    try {
      const res = await axios.get('/teacher/logout');

      console.log(res);

      if (res.data.success === 1) {
        if (localStorage.getItem('teacher')) {
          localStorage.removeItem('teacher');
        }

        dispatch({
          type: authConstant.LOGOUT_SUCCESS
        });

        return Toastify('success', 'Logout successful');
      } else if (res.data.success === 0) {
        console.log('error');
        Toastify('error', res.data.msg);
      }
    } catch (error) {
      console.log(error, 'error');

      Toastify('error', error);
      dispatch({ type: authConstant.LOGOUT_FAIL });
    }
  };
};

export const GetTeacherProfile = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get('/teacher/profile');

      localStorage.setItem('teacher',JSON.stringify(res.data.teacher))

      console.log(res.data)

      if (res.data.success === 1) {
        dispatch({
          type: authConstant.GET_TEACHER_SUCCESS,

          payload: {
             ...res.data.teacher,
             totalExams:res.data.totalExams
          }
        });
      } else if (res.data.success === 0) {
        console.log('error');
        Toastify('error', res.data.msg);
      }
    } catch (error) {
      console.log(error, 'error');
      Toastify('error', error);
    }
  };
};

/******************Student***********************/

export const GetStudentAuthUrl = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get('/student/googleAuthUrl');

      if (res.data.success === 1) {
        dispatch({
          type: authConstant.GOOGLE_AUTH_URL_STUDENT,
          payload: res.data.url
        });
      } else if (res.data.success === 0) {
        console.log('error');
        Toastify('error', 'Something went wrong');
      }
    } catch (error) {
      console.log(error, 'error');
      Toastify('error', error);
      dispatch({ type: authConstant.LOGIN_STUDENT_FAIL });
    }
  };
};

export const loginStudent = (link ) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_STUDENT_REQ });

    try {
      const res = await axios.get(link);

      console.log(res);

      if (res.data.success === 1) {
        clearLocalStorage();

        localStorage.setItem('student', JSON.stringify(res.data.student));

        dispatch({
          type: authConstant.LOGIN_STUDENT_SUCCESS,
          payload: res.data.student
        });

        return Toastify('success', 'Verified login successfully');
      } else if (res.data.success === 0) {
        console.log('error');
        Toastify('error', res.data.msg);
        return;
      }
    } catch (error) {
      console.log(error, 'error');

      Toastify('error', error);
      dispatch({ type: authConstant.LOGIN_TEACHER_FAIL });
    }
  };
};

export const logoutStudent = (socket) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_REQ });

    try {
      dispatch({
        type: authConstant.LOGOUT_SUCCESS
      });

      if(socket){
        socket.emit("removeUser",{
          email : JSON.parse( localStorage.getItem('student') ).email,
          examHall : localStorage.getItem('examCode')
        })
      }

      if (localStorage.getItem('student')) {
        localStorage.removeItem('student');
      }
  
      clearLocalStorage();

      return Toastify('success', 'Logout successful');
    } catch (error) {
      console.log(error, 'error');

      Toastify('error', error);
      dispatch({ type: authConstant.LOGOUT_FAIL });
    }
  };
};

export const isTeacherLoggedIn = () => {
  return async (dispatch) => {
    try {
      const token = Cookie.get('authorization');
      if (token) {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            user
          }
        });
      } else {
        dispatch({
          type: authConstant.LOGIN_FAIL,
          payload: { error: 'Failed to login' }
        });
      }
    } catch (error) {
      localStorage.clear();
      dispatch({ type: authConstant.LOGOUT_SUCCESS });
    }
  };
};

/*********************Registration*****************************/

export const updateTeacher = (data ) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_TEACHER_REQ });

    try {
      const config = {
        header: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.patch('/teacher/update', data, config);

      if (res.data.success === 1) {
        localStorage.setItem('teacher', JSON.stringify(res.data.teacher));

        dispatch({
          type: authConstant.UPDATE_TEACHER_SUCCESS,
          payload: res.data
        });

        Toastify('success', 'Registration Done');

        return 
 
      } else if (res.data.success === 0) {
        console.log('error');
        return Toastify('error', res.data.msg);
      }
    } catch (error) {
      console.log(error, 'error');

      Toastify('error', error);
      dispatch({ type: authConstant.UPDATE_TEACHER_FAIL });
    }
  };
};

export const getPaidInstitutions = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_PAID_INS_REQ });

    try {
      const res = await axios.get('/institution/paidInstitutions');

      console.log(res);

      if (res.data.success === 1) {
        dispatch({
          type: authConstant.GET_PAID_INS_SUCCESS,
          payload: res.data.institutions
        });

        return Toastify('info', 'Please! Select your respective institution!');
      } else if (res.data.success === 0) {
        console.log('error');
        return Toastify('error', res.data.msg);
      }
    } catch (error) {
      console.log(error, 'error');

      Toastify('error', 'Something went wrong!');
      dispatch({ type: authConstant.GET_PAID_INS_FAIL });
    }
  };
};
