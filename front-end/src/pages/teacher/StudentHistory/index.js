import React from "react";
import SideList from "../../../component/teacher/StudentHistory/Sidelist";
import classes from "./StudentHist.module.css";
import StudentList from "../../../component/teacher/StudentHistory/index";
import Button from "@material-ui/core/Button";
import axios from "../../../helper/axiosInstance";
import download from "js-file-download";
// import SearchBox from "material-ui-search-bar";
import { Toastify } from "../../../App";
import { useDispatch } from "react-redux";
import InputSearch from "../../../component/shared/Search";

function StudentHistory({ exams, examType, id }) {
  
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(exams.oneExam, "props");
  }, []);
  const [name, setName] = React.useState("");
  const exportList = async (e) => {
    console.log("export list");

    await axios
      .get(`/examSubjective/getStudentsExcel/${id}`, {
        responseType: "blob",
      })
      .then((resp) => {
        console.log(resp.data);

        download(resp.data, "students.xlsx");
      })
      .catch((error) => {
        Toastify("Internal Server Error! ", error);
      });
  };

  
  return (
    <div>
      <div className={classes.heading}>
        <center>
          <h1>{exams.oneExam?.exam?.name}</h1>
        </center>
      </div>
      <div className={classes.SideList}>
        <SideList />
        <div >
        {/* <InputSearch/> */}
        </div>
        <Button variant="contained" color="primary" onClick={exportList}>
          exportList
        </Button>
      </div>
      <div className={classes.StudentList}>
        <StudentList examType={examType} />
      </div>
    </div>
  );
}

export default StudentHistory;
