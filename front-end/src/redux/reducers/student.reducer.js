import { studentConstant } from "../constants";
const {
  STUDENT_ENTRY_REQ,
  STUDENT_ENTRY_SUCCESS,
  STUDENT_ENTRY_FAIL,
  EXAM_DETAILS_REQ,
  EXAM_DETAILS_SUCCESS,
  EXAM_DETAILS_FAIL,
  UPLOAD_ANSWER_SCRIPT_REQ,
  UPLOAD_ANSWER_SCRIPT_SUCCESS,
  UPLOAD_ANSWER_SCRIPT_FAILURE,
  SUBMIT_STATUS_REQ,
  SUBMIT_STATUS_SUCCESS,
  SUBMIT_STATUS_FAILURE,
  STUDENT_MCQ_REQ,
  STUDENT_MCQ_SUCCESS,
  STUDENT_MCQ_FAILURE,
  UPDATE_STUDENT_MCQ_REQ,
  UPDATE_STUDENT_MCQ_SUCCESS,
  UPDATE_STUDENT_MCQ_FAILURE,
  UPDATE_STUDENT_WRITTEN_MARKS_REQ,
  UPDATE_STUDENT_WRITTEN_MARKS_FAILURE,
  UPDATE_STUDENT_WRITTEN_MARKS_SUCCESS,
  GET_STUDENT_WRITTEN_MARKS_REQ,
  GET_STUDENT_WRITTEN_MARKS_FAILURE,
  GET_STUDENT_WRITTEN_MARKS_SUCCESS,
  GET_STUDENT_WRITTEN_LIST_REQ,
  GET_STUDENT_WRITTEN_LIST_FAILURE,
  GET_STUDENT_WRITTEN_LIST_SUCCESS,
  END_EXAM,EXAM_STARTED,
  UPDATE_PROGRESS
} = studentConstant;


const initialState = {
  exam_id: localStorage.getItem("exam_id")
    ? localStorage.getItem("exam_id")
    : null,
  student_id: localStorage.getItem("student_id")
    ? localStorage.getItem("student_id")
    : null,
  scholarId: localStorage.getItem("scholarId")
    ? localStorage.getItem("scholarId")
    : null,
  examCode: localStorage.getItem("examCode")
    ? localStorage.getItem("examCode")
    : null,
  examType: localStorage.getItem("examType")
    ? localStorage.getItem("examType")
    : null,
  loading: false,
  instructions: [],
  exam: null,
  studentSub: null,
  mcqs: null,
  fillUps: null,
  studentMCQ: null,
  studentWrittenList: [],
  WrittenMarks:{},
  examStatus: localStorage.getItem("examStatus")
    ? parseInt(localStorage.getItem("examStatus"))
    : null,
  progress : 0,
  screenBlank : false
};

export default (state = initialState, {type,payload}) => {

    switch (type) {

        // student entry
        case STUDENT_ENTRY_REQ:
            return {
                ...state,
                loading:true
            }
        
        case STUDENT_ENTRY_SUCCESS:
            return {
                ...state,
                exam_id:payload.exam,
                student_id:payload.student,
                examCode:payload.examCode,
                loading:false
            }
        
        case STUDENT_ENTRY_FAIL:

            return {
                ...state,
                loading:false
            }


        
        //exam + instructions
        case EXAM_DETAILS_REQ:

            return {
                ...state,
                screenBlank:true,
            } 
            
        case EXAM_DETAILS_SUCCESS:
 
            return {
                ...state,
                exam:payload.exam,
                mcqs:payload.mcqs,
                fillUps:payload.fillUps,
                loading:false,
                screenBlank:false
            }

        case EXAM_DETAILS_FAIL:
            
            return {
                ...state,
                loading:false,
                screenBlank:false
            }



        // STUDENT UPLOADING ANSWER SCRIPT
        case UPLOAD_ANSWER_SCRIPT_REQ:
            return{
                ...state,
                loading:true,
                progress:0
            }

        case UPLOAD_ANSWER_SCRIPT_SUCCESS:
            return{
                ...state,
                studentSub:payload,
                loading:false
            }
        
        case UPLOAD_ANSWER_SCRIPT_FAILURE:
            return{
                ...state,
                loading:false
            }
    
        case UPDATE_PROGRESS:
            return {
              ...state,
              progress:payload
            }


        // STUDENT UPLOAD STATUS
        case SUBMIT_STATUS_REQ :
            return {
                ...state,
                loading:true
            }

        case SUBMIT_STATUS_SUCCESS:
            return{
                ...state,
                loading:false,
                studentSub:payload
            }

        case SUBMIT_STATUS_FAILURE:
            return{
                ...state,
                loading:false
            }

        
        // STUDENT MCQ status
        case STUDENT_MCQ_REQ :
            return {
                ...state,
                loading:true
            }

        case STUDENT_MCQ_SUCCESS:
            return{
                ...state,
                loading:false,
                studentMCQ:payload.student
            }

        case STUDENT_MCQ_FAILURE:
            return{
                ...state,
                loading:false
            }

        // UPDATE STUDENT MCQ status
        case UPDATE_STUDENT_MCQ_REQ :
            return {
                ...state,
                loading:true
            }

        case UPDATE_STUDENT_MCQ_SUCCESS:
            return{
                ...state,
                loading:false,
                studentMCQ:payload
            }

            case UPDATE_STUDENT_MCQ_FAILURE:
              return {
                ...state,
                loading: false,
              };
        
              //set marks 
              case "setMarks":
              return {
                ...state,
                WrittenMarks: payload,
              };
            /// check written exam
            case UPDATE_STUDENT_WRITTEN_MARKS_REQ:
              return {
                ...state,
                loading: true,
              };
        
            case UPDATE_STUDENT_WRITTEN_MARKS_SUCCESS:
              return {
                ...state,
                loading: false,
                studentWrittenList: payload,
              };
        
            case UPDATE_STUDENT_WRITTEN_MARKS_FAILURE:
              return {
                ...state,
                loading: false,
              };
        
            /// get written  exam  question
            case GET_STUDENT_WRITTEN_MARKS_REQ:
              return {
                ...state,
                loading: true,
              };
        
            case "GET_STUDENT_EXAM_SubjectiveDetails":
              console.log(payload,"payload")
              return {
                ...state,
                loading: false,
                studentWrittenList: payload,
              };
        
            case GET_STUDENT_WRITTEN_MARKS_FAILURE:
              return {
                ...state,
                loading: false,
              };
        
              //search 
              case "Search_studentList":
                RegExp.quote = function allowSpecialSymbols(str) {
                  return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
                };
                let studentWrittenList=null
                let studentMcqList=null
                const reg = new RegExp(RegExp.quote(`${payload.name}`), "gi");
                // if(payload.value===0 && state.studentWrittenList){
                  // console.log(state.studentWrittenList[0].student.name,"sadas")
                  studentWrittenList = state.studentWrittenList.filter((studentList) => studentList.student.name.match(reg))
                  console.log(studentWrittenList,"studentWrittenList")
              //  }
              //  else if(payload.value===1 && state.objectiveExams){
                  
              //     objectiveExams = state.objectiveExams.filter((exam) => exam.exam.name.match(reg))
              // }
                return {
                  ...state,
                  studentWrittenList: studentWrittenList,
                };
            /// get written  exam  list
            case GET_STUDENT_WRITTEN_LIST_REQ:
              return {
                ...state,
                loading: true,
              };
        
            case GET_STUDENT_WRITTEN_LIST_SUCCESS:
                console.log(payload,"payload")
              return {
                ...state,
                loading: false,
                studentWrittenList: payload,
              };
        
            case GET_STUDENT_WRITTEN_LIST_FAILURE:
              return {
                ...state,
                loading: false,
              };
            // END EXAM
            case END_EXAM:
              return {
                ...state,
                examStatus: 1,
              };
          // EXAM STARTED
          case EXAM_STARTED:
            return{
                ...state,
                exam:{
                    ...state.exam,
                    status:true
                }
            }
            default:
              return state;
          }
        };
        