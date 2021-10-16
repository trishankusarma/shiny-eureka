import { teacherRoomConst, OneExamConst } from "../constants";

const initialState = {
  loading: false,
  subjectiveExams: null,
  objectiveExams: null,
  searchSubjectiveExams : null,
  searchObjectiveExams : null,
  roomDetail: null,
  studentDetails: null,
  objectiveExam: null,
  created: false,
  oneExam: null,
  progress:0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    // search
    case teacherRoomConst.SEARCH_EXAM:
      RegExp.quote = function allowSpecialSymbols(str) {
          return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
      };
    
      const reg = new RegExp(RegExp.quote(`${payload.name}`), "gi");

        let subjectiveExams=null, objectiveExams=null

         if(payload.value===0 && state.subjectiveExams){

            subjectiveExams = state.subjectiveExams.filter((exam) => exam.exam.name.match(reg))
         }else if(payload.value===1 && state.objectiveExams){
            
            objectiveExams = state.objectiveExams.filter((exam) => exam.exam.name.match(reg))
        }
        
         state = {
            ...state,
            searchSubjectiveExams: subjectiveExams,
            searchObjectiveExams: objectiveExams
         };
         break;

    case teacherRoomConst.CLEAR_SEARCH_EXAM:
      state = {
        ...state,
        searchSubjectiveExams : null,
        searchObjectiveExams : null
      };
      break;

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

    case OneExamConst.GET_WRITTEN_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;
    // one exam
    case OneExamConst.GET_ONE_WRITTEN_EEXAM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.GET_ONE_WRITTEN_EXAM_SUCCESS:
      state = {
        ...state,
        oneExam: payload,
        loading: false,
      };
      break;

    case OneExamConst.GET_ONE_WRITTEN_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    //student details
    case teacherRoomConst.GET_STUDENT_DETAILS_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case teacherRoomConst.GET_STUDENT_DETAILS_SUCCESS:
      state = {
        ...state,
        studentDetails: payload,
        loading: false,
      };
      break;

    case teacherRoomConst.GET_STUDENT_DETAILS_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    // create written exam
    case OneExamConst.CREATE_WRITTEN_EXAM_REQ:
      state = {
        ...state,
        loading: true,
        progress:0
      };
      break;

    case OneExamConst.UPDATE_PROGRESS:
      return {
        ...state,
        progress:payload
      }

    case OneExamConst.CREATE_WRITTEN_EXAM_SUCCESS:
      state = {
        ...state,
        subjectiveExams: [...state.subjectiveExams, payload],
        loading: false,
      };
      break;

    case OneExamConst.CREATE_WRITTEN_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    // delete exam
    case OneExamConst.DELET_WRITTEN_EEXAM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.DELETE_WRITTEN_EXAM_SUCCESS:
      state = {
        ...state,
        subjectiveExams: payload,
        loading: false,
      };
      break;

    case OneExamConst.DELETE_WRITTEN_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    // update exam details
    case OneExamConst.UPDATE_WRITTEN_EXAM_REQ:
      state = {
         ...state,
         progress:0,
         loading:true
      }
      break

    case OneExamConst.UPDATE_WRITTEN_EXAM_SUCCESS:
      state = {
        ...state,
        loading:false,
        subjectiveExams:  state.subjectiveExams.map((EXAM)=>EXAM.exam._id===payload._id ? {...EXAM, exam:payload} :EXAM),
      };
      break;

    case OneExamConst.UPDATE_WRITTEN_EXAM_FAIL:
      state = {
        ...state,
        loading:false
     }
     break

    // start exam
    case OneExamConst.START_WRITTEN_EXAM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.START_WRITTEN_EXAM_SUCCESS:
      state = {
        ...state,
        subjectiveExams: payload,
        loading: false,
      };
      break;

    case OneExamConst.START_WRITTEN_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    //  instruction

    case OneExamConst.CREATE_INSTRCUTIONS_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.CREATE_INSTRCUTIONS_SUCCESS:
    
      state = {
        ...state,
        subjectiveExams: payload,
        loading: false,
      };
      break;

    case OneExamConst.CREATE_INSTRCUTIONS_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    case OneExamConst.DELETE_INSTRCUTIONS_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.DELETE_INSTRCUTIONS_SUCCESS:
      state = {
        ...state,
        subjectiveExams: payload,
        loading: false,
      };
      break;

    case OneExamConst.DELETE_INSTRCUTIONS_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    case OneExamConst.EDIT_INSTRCUTIONS_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.EDIT_INSTRCUTIONS_SUCCESS:
      state = {
        ...state,
        subjectiveExams: payload,
        loading: false,
      };
      break;

    case OneExamConst.EDIT:
      state = {
        ...state,
        loading: false,
      };
      break;

      /*********************************************/

       /*************Objective exams*****************/
      case OneExamConst.GET_OBJECTIVE_EXAMS_REQ:
        state = {
           ...state,
           loading:true
        };
        break;
      
      case OneExamConst.GET_OBJECTIVE_EXAMS_SUCCESS:
        state = {
            ...state,
            objectiveExams:payload,
            loading:false
        };
        break;
      
      case OneExamConst.GET_OBJECTIVE_EXAMS_FAIL:
        state = {
            ...state,
            loading:false
        };
        break;

    //start objective exam
    case OneExamConst.CREATE_MCQ_EXAM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.CREATE_MCQ_EXAM_SUCCESS:
      state = {
        ...state,
        objectiveExams:[...state.objectiveExams , payload],
        loading: false,
      };
      break;

    case OneExamConst.CREATE_MCQ_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

      // start/edit exam
    case OneExamConst.EDIT_OBJECTIVE_EXAM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.EDIT_OBJECTIVE_EXAM_SUCCESS:
      state = {
        ...state,
        objectiveExams: state.objectiveExams.map((EXAM)=>EXAM.exam._id===payload._id ? {...EXAM,exam:payload} : EXAM ),
        loading: false,
      };
      break;

    case OneExamConst.EDIT_OBJECTIVE_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    // one exam
    case OneExamConst.GET_ONE_MCQ_EXAM_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;

    case OneExamConst.GET_ONE_MCQ_EXAM_SUCCESS:
      state = {
        ...state,
        oneExam: payload,
        loading: false,
      };
      break;

    case OneExamConst.GET_ONE_MCQ_EXAM_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    // delete exam

    case OneExamConst.DELETE_OBJECTIVE_EXAM_SUCCESS:
      state = {
        ...state,
        objectiveExams: state.objectiveExams.filter((exam)=>exam.exam._id!==payload._id),
      };
      break;
  }

  return state;
};
