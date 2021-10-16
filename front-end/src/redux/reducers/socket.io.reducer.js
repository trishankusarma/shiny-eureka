import { teacherRoomConst, OneExamConst } from "../constants";

const initialState = {
  admin:true,
  students:[],
  notification:[]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // room details
    case OneExamConst.GET_WRITTEN_EEXAM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.GET_WRITTEN_EXAM_SUCCESS:
      state = {
        ...state,
        subjectiveExams: payload,
        loading: false,
      };
      break;

  }
  return state
};