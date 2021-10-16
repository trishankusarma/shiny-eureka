import { OneExamConst, teacherRoomConst } from "../constants";
import axios from "../../helper/axiosInstance";
import { Toastify } from "../../App";

// written

export const createWrittenExam = (roomId, exam, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.CREATE_WRITTEN_EXAM_REQ });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent;
          const percentage = Math.floor(Math.round((100 * loaded) / total));
          
          dispatch({ 
              type : OneExamConst.UPDATE_PROGRESS,
              payload : percentage
          })
        }
      };

      let res = await axios.post(
        "/examSubjective/uploadQuestionPaper",
        exam,
        config
      );

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.CREATE_WRITTEN_EXAM_SUCCESS,
          payload: { exam: res.data.exam, noOfStudents: 0 },
        });

        Toastify("success", "Written exam created successfully");
        history.push(
          "/teacher/Instruction/" +
            roomId +
            "/" +
            res.data.exam._id +
            "?type=subjective"
        );
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.CREATE_WRITTEN_EXAM_FAIL });
        
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.CREATE_WRITTEN_EXAM_FAIL });
    }
  };
};

export const deleteExamWritten = (id, exams) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.DELET_WRITTEN_EEXAM_REQ });
      let res = await axios.delete("/examSubjective/" + id);
      

      if (res.data.success === 1) {
        exams = exams.filter(
          (oneExam) => oneExam.exam._id != res.data.exam._id
        );
        Toastify("success", "Deleted successfully");
        dispatch({
          type: OneExamConst.DELETE_WRITTEN_EXAM_SUCCESS,
          payload: exams,
        });
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.DELETE_WRITTEN_EXAM_FAIL });
        
        Toastify("error", "Something went wrong");
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.DELETE_WRITTEN_EXAM_FAIL });
    }
  };
};

export const editExamWritten = (Id, roomId, body, history,options) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.UPDATE_WRITTEN_EXAM_REQ });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent;
          const percentage = Math.floor(Math.round((100 * loaded) / total));
          
          dispatch({ 
              type : OneExamConst.UPDATE_PROGRESS,
              payload : percentage
          })
        }
      };

      let res = await axios.patch(
        "/examSubjective/examUpdate/" + Id,
        body,
        config
      );

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.UPDATE_WRITTEN_EXAM_SUCCESS,
          payload: res.data.exam,
        });
        history.replace(`/teacher/ExamsRoom/${roomId}`);
        Toastify("success", "Edited  successfully");
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.UPDATE_WRITTEN_EXAM_FAIL });

        

        Toastify("error", "Something went wrong");
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.UPDATE_WRITTEN_EXAM_FAIL });
    }
  };
};

export const startExamWritten = (id, exams , socket, examCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.START_WRITTEN_EXAM_REQ });
      let res = await axios.patch("/examSubjective/startExam/" + id);

      if (res.data.success === 1) {

        socket.emit('startExam',{examHall: examCode} )

        dispatch({
          type: OneExamConst.START_WRITTEN_EXAM_SUCCESS,
          
          payload: exams.map((exam) => {
            if (exam.exam._id == res.data.exam._id)
              return { exam: res.data.exam, noOfStudents: 0 };
            else return exam;
          }),
        });


        Toastify("success", `${res.data.exam.name} started successfully`);

      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.START_WRITTEN_EXAM_FAIL });
        
        Toastify("error", "Something went wrong");
      }
    } catch (error) {

      console.log(error, "error");
      
      Toastify("error", error);
      
      dispatch({ type: OneExamConst.START_WRITTEN_EXAM_FAIL });
    }
  };
};

export const getExamWritten = (id, history) => {
  return async (dispatch) => {
    try {
      // dispatch({type: OneExamConst.GET_ONE_WRITTEN_EEXAM_REQ});
      const res = await axios.get(
        `/examSubjective/getBasicDetails/${id}?auth=${true}`
      );
      
      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.GET_ONE_WRITTEN_EXAM_SUCCESS,
          payload: {
            exam: res.data.exam,
            instructions: res.data.exam.instruction,
          },
        });
        return { exam: res.data.exam, instructions: res.data.exam.instruction };
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.GET_ONE_WRITTEN_EXAM_FAIL });
        Toastify("error", "Exam does not exits");
        history.goBack();
        return false;
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.GET_ONE_WRITTEN_EXAM_FAIL });
      return true;
    }
  };
};

export const getResult = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.START_EXAM_REQ });
      let res = await axios.patch("/examSubjective/getStudentsExcel/" + id);

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.START_EXAM_SUCCESS,
          payload: res.data.url,
        });
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.START_EXAM_FAIL });
        
        Toastify("error", "Something went wrong");
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.START_EXAM_FAIL });
    }
  };
};

export const getAllExamsSubjective = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.GET_WRITTEN_EEXAM_REQ });
      let res = await axios.get("/classroom/subjectiveExams/" + id);
      
      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.GET_WRITTEN_EXAM_SUCCESS,
          payload: res.data.subjectiveExams,
        });
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.GET_WRITTEN_EXAM_FAIL });
        
        Toastify("error", "Something went wrong");
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.GET_WRITTEN_EXAM_FAIL });
    }
  };
};

/*******************************************************/

export const getAllExamsObjective = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.GET_OBJECTIVE_EXAMS_REQ });

      let res = await axios.get("/classroom/objectiveExams/" + id);

      

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.GET_OBJECTIVE_EXAMS_SUCCESS,
          payload: res.data.objectiveExams,
        });
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.GET_OBJECTIVE_EXAMS_FAIL });

        Toastify("error", res.data.msg);
      }
    } catch (error) {
      

      Toastify("error", error);

      dispatch({ type: OneExamConst.GET_OBJECTIVE_EXAMS_FAIL });
    }
  };
};

export const startExamObjective = (id ,socket , examCode ) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.EDIT_OBJECTIVE_EXAM_REQ });
      let res = await axios.patch("/examObjective/startExam/" + id);

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.EDIT_OBJECTIVE_EXAM_SUCCESS,
          payload: res.data.exam,
        });

        socket.emit('startExam',{examHall: examCode} )

        Toastify("success", `${res.data.exam.name} started successfully`);
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.EDIT_OBJECTIVE_EXAM_FAIL });
        
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.EDIT_OBJECTIVE_EXAM_FAIL });
    }
  };
};

export const editExamObjective = (exam, history, roomId, type) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.EDIT_OBJECTIVE_EXAM_REQ });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let res = await axios.patch(
        "/examObjective/" + exam._id,
        {
          ...exam,
        },
        config
      );

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.EDIT_OBJECTIVE_EXAM_SUCCESS,
          payload: res.data.exam,
        });

        Toastify("success", "successfully edited");

        return history.push(
          `/teacher/CreateMcq/${exam._id}?examName=${res.data.exam.name}&roomId=${roomId}`
        );
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.EDIT_OBJECTIVE_EXAM_FAIL });
        
        return Toastify("error", res.data.msg);
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.EDIT_OBJECTIVE_EXAM_FAIL });
    }
  };
};

export const getExamMCQ = (id, history) => {
  return async (dispatch) => {
    try {
      // dispatch({type: OneExamConst.GET_ONE_WRITTEN_EEXAM_REQ});
      const res = await axios.get(
        `/examObjective/getExamById/details/${id}`
      );
      
      if (res.data.success === 1) {
     
        dispatch({
     
          type: OneExamConst.GET_ONE_MCQ_EXAM_SUCCESS,
          payload: {
            exam: res.data.exam,
            instructions: res.data.exam.instruction,
            mcqs: res.data.mcqs,
            fillup: res.data.fillUps
          },
        });
     
      } else if (res.data.success === 0) {

            dispatch({ type: OneExamConst.GET_ONE_MCQ_EXAM_FAIL });
            Toastify("error", "Exam does not exits");
            history.goBack();
     
            return false;
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.GET_ONE_MCQ_EXAM_FAIL });
      return true;
    }
  };
};

export const deleteExamObjective = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.delete("/examObjective/" + id);

      

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.DELETE_OBJECTIVE_EXAM_SUCCESS,
          payload: res.data.exam,
        });
        Toastify("success", `${res.data.exam.name} successfully deleted!`);
      } else if (res.data.success === 0) {
        
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      
      Toastify("error", error);
    }
  };
};

export const createMCQExam = (roomId, exam, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OneExamConst.CREATE_MCQ_EXAM_REQ });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let res = await axios.post("/examObjective", exam, config);

      if (res.data.success === 1) {
        dispatch({
          type: OneExamConst.CREATE_MCQ_EXAM_SUCCESS,
          payload: {
            exam: res.data.exam,
            noOfStudents: 0,
          },
        });
        Toastify("success", "MCQ exam created successfully");
        history.replace(
          "/teacher/Instruction/" +
            roomId +
            "/" +
            res.data.exam._id +
            "?type=objective"
        );
      } else if (res.data.success === 0) {
        dispatch({ type: OneExamConst.CREATE_MCQ_EXAM_FAIL });
        
        Toastify("error", res.data.msg);
      }
    } catch (error) {
      
      Toastify("error", error);
      dispatch({ type: OneExamConst.CREATE_MCQ_EXAM_FAIL });
    }
  };
};
