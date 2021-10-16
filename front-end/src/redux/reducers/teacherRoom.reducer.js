import { teacherRoomConst } from "../constants";

const { UPDATE_STUDENT_SUCCESS , DELETE_STUDENT_SUCCESS } = teacherRoomConst

const initialState = {
  rooms: null,
  oneRoom: null,
  loading: false,
  searchRooms : null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // search
    case teacherRoomConst.SEARCH_ROOM:
      RegExp.quote = function allowSpecialSymbols(str) {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
      };

      const reg = new RegExp(RegExp.quote(`${payload}`), "gi");
      state = {
        ...state,
        searchRooms: state.rooms.filter((room) => room.name.match(reg)),
      };
      break;

    case teacherRoomConst.CLEAR_SEARCH_ROOM:
      state = {
        ...state,
        searchRooms: null,
      };
      break;
    //teacher
    case teacherRoomConst.GET_ROOM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case teacherRoomConst.GET_ROOM_SUCCESS:
      state = {
        ...state,
        rooms: payload,
        loading: false,
      };
      break;

    case teacherRoomConst.GET_ROOM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    // get one room
    case teacherRoomConst.GET_ONE_ROOM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case teacherRoomConst.GET_ONE_ROOM_SUCCESS:
      state = {
        ...state,
        oneRoom: payload,
        loading: false,
      };
      break;

    case teacherRoomConst.GET_ONE_ROOM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    //   create classroom
    case teacherRoomConst.CREATE_ROOM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case teacherRoomConst.CREATE_ROOM_SUCCESS:
      state = {
        ...state,
        rooms: [...state.rooms, payload],
        loading: false,
      };
      break;

    case teacherRoomConst.CREATE_ROOM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    // delete
    case teacherRoomConst.DELETE_EDIT_ROOM_SUCCESS:
      state = {
        ...state,
        rooms: payload,
      };
      break;

    // upload student
    case teacherRoomConst.UPLOAD_STUDENTDATA_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case teacherRoomConst.UPLOAD_STUDENTDATA_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case teacherRoomConst.UPLOAD_STUDENTDATA_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;
    // student details get
    case teacherRoomConst.GET_STUDENTDATA_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case teacherRoomConst.GET_STUDENTDATA_SUCCESS:
      state = {
        ...state,
        students: payload.students,
        loading: false,
        classroom: payload.classroom,
      };
      break;

    case teacherRoomConst.GET_STUDENTDATA_FAIL:
      state = {
        ...state,
        students: null,
        loading: false,
      };
      break;
    
    //update student from list
    case UPDATE_STUDENT_SUCCESS:
      return{
        ...state,
        students: state.students.map( (student)=> student._id===payload._id ? payload : student ),
        loading:false
      }
     
    //delte student from list
    case DELETE_STUDENT_SUCCESS:
      return{
        ...state,
        students: state.students.filter( (student)=> student._id!==payload._id),
        loading:false
      }
  }

  return state;
};
