import { OneExamConst } from "../constants";

const {
    GET_MCQ_EXAM_REQ, GET_MCQ_EXAM_SUCCESS , GET_MCQ_EXAM_FAIL,
    
    CREATE_MCQ_REQ , CREATE_MCQ_SUCCESS , CREATE_MCQ_FAILURE,
    EDIT_MCQ_REQ, EDIT_MCQ_SUCCESS , EDIT_MCQ_FAILURE,
    DELETE_MCQ_REQ , DELETE_MCQ_SUCCESS , DELETE_MCQ_FAILURE,
    
    CREATE_MCQ_OPTIONS_REQ , CREATE_MCQ_OPTIONS_SUCCESS , CREATE_MCQ_OPTIONS_FAILURE,
    EDIT_MCQ_OPTIONS_REQ, EDIT_MCQ_OPTIONS_SUCCESS , EDIT_MCQ_OPTIONS_FAILURE,
    DELETE_MCQ_OPTIONS_REQ , DELETE_MCQ_OPTIONS_SUCCESS , DELETE_MCQ_OPTIONS_FAILURE,
} = OneExamConst


const initialState = {
  loading:false,
  mcqs:null,
  fillUps:null,
  progress:0
};

const format = (object)=>{
    return JSON.stringify(object)
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
     
     // GET MCQ EXAM DETAILS
     case GET_MCQ_EXAM_REQ:
         return{
             ...state,
             loading:true
         }

     case GET_MCQ_EXAM_SUCCESS:
         return{
             ...state,
             loading:false,
             mcqs:payload.mcqs,
             fillUps:payload.fillUps
         }
     
     case GET_MCQ_EXAM_FAIL:
         return{
             ...state,
             loading:false
         }
     
     // CREATE MCQ
     case CREATE_MCQ_REQ:
         return{
             ...state,
             loading:true
         }

     case CREATE_MCQ_SUCCESS:
         return{
             ...state,
             loading:false,
             mcqs:[ ...state.mcqs , {
                mcq:payload,
                options:[{
                    optionNo : '', 
                    description : '',
                    upload_option : null,
                    correct_status : false, 
                    mcq : payload._id
                }]
              }]
         }
     
     case CREATE_MCQ_FAILURE:
         return{
             ...state,
             loading:false
         }
     
      // EDIT MCQ
     case EDIT_MCQ_REQ:
        return{
            ...state,
            loading:true
        }

     case EDIT_MCQ_SUCCESS:
        return{
            ...state,
            loading:false,
            mcqs:state.mcqs.map((MCQ)=>format( MCQ.mcq._id )===format(payload._id) ? { ...MCQ , mcq:payload } : MCQ)
        }
    
     case EDIT_MCQ_FAILURE:
        return{
            ...state,
            loading:false
        }

     // DELETE MCQ
     case DELETE_MCQ_REQ:
        return{
            ...state,
            loading:true
        }

     case DELETE_MCQ_SUCCESS:
        return{
            ...state,
            loading:false,
            mcqs:state.mcqs.filter((MCQ)=>format(MCQ.mcq._id) !== format(payload._id))
        }
    
     case DELETE_MCQ_FAILURE:
        return{
            ...state,
            loading:false
        }

     // MCQ options
     // Create Mcq options
     case CREATE_MCQ_OPTIONS_REQ:
         return{
             ...state,
             loading:true
         }
         

     case CREATE_MCQ_OPTIONS_SUCCESS:
        return{
            ...state,
            mcqs:state.mcqs.map((MCQ)=>(
                format(MCQ.mcq._id)===format(payload.mcq) 
                ? { ...MCQ , 
                    options:[
                        ...MCQ.options.reverse().splice(1).reverse(),
                        payload,{
                            optionNo : '', 
                            description : '',
                            upload_option : null,
                            correct_status : false, 
                            mcq : MCQ.mcq._id
                        }]
                }: MCQ 
            )),
            loading:false
        }
    
      case CREATE_MCQ_OPTIONS_FAILURE:
         return{
             ...state,
             loading:false
         }

      // Edit Mcq options

      case EDIT_MCQ_OPTIONS_REQ: 
        return{
            ...state,
            loading:true
        }


     case EDIT_MCQ_OPTIONS_SUCCESS:
        return{
            ...state,
            mcqs:state.mcqs.map((MCQ)=>(
                format(MCQ.mcq._id)===format(payload.mcq) 
                ? { ...MCQ , 
                    options: MCQ.options.map((option)=>(
                        option.optionNo===payload.optionNo 
                        ? payload
                        : option
                    )) } 
                : MCQ 
            )),
            loading:false
        }

     case EDIT_MCQ_OPTIONS_FAILURE: 
        return{
            ...state,
            loading:false
        }
    
    
    // Edit Mcq options
     case DELETE_MCQ_OPTIONS_SUCCESS:
        return{
            ...state,
            mcqs:state.mcqs.map((MCQ)=>(
                format(MCQ.mcq._id)===format(payload.mcq) 
                ? { ...MCQ , 
                    options: MCQ.options.filter((option)=>option.optionNo!==payload.optionNo )
                } 
                : MCQ 
            ))
        }


     default:
         return state
  }
}