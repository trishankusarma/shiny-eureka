import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Timer from "../../../component/shared/Timer";

import io from 'socket.io-client'

import Exam from './exam'

import {
  deleteExamWritten,
  getAllExamsSubjective,
  getAllExamsObjective,
  deleteExamObjective,
  startExamObjective,
  startExamWritten,
} from "../../../redux/actions";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from "react-router-dom";

import { END_POINT } from '../../../helper/constants'

let socket

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyle = makeStyles(() => ({
  btnContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Settings = ({ type, row, dispatch, exams, _classroomId }) => {

  const deleteExamWrittenFun = (id) => {
    dispatch(deleteExamWritten(id, exams.subjectiveExams));
  };

  const deleteExamMCQFun = (id) => {
    console.log(id);
    dispatch(deleteExamObjective(id, exams.objectiveExams));
  };

  const StartExamWritten = (id) => {
    dispatch(startExamWritten(id, exams.subjectiveExams,socket, row.name));
  };
  const StartExamMCQ = (id) => {
    dispatch(startExamObjective(id, socket, row.name ));
  };
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (
      parseInt(new Date().getTime()) <
      new Date(row.startTime).getTime() +
        (parseInt(row.timeLength.split(":")[0]) * 60 +
          parseInt(row.timeLength.split(":")[1])) *
          60000
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [
    parseInt(new Date().getTime()) <
      new Date(row.startTime).getTime() +
        (parseInt(row.timeLength.split(":")[0]) * 60 +
          parseInt(row.timeLength.split(":")[1])) *
          60000,
  ]);
  
  const classes = useStyle();
  
  return (
    <>
    {console.log(row.timeLength.split(":")[0],"row")}
      <div className={classes.btnContainer}>
        {row.status ? (
          active ? (
            <>
              <Button variant="contained" color="primary">
                <Timer
                  color={"#fff"}
                  bgcolor={"none"}
                  fontSize={"1rem"}
                  height={"20px"}
                  margin={"1%"}
                  hour={row.timeLength.split(":")[0]}
                  minute={row.timeLength.split(":")[1]}
                  startTime={row.startTime}
                />
              </Button>
              <Button variant="contained" color="primary">
                <Link to={type ? "/teacher/viewExam/" + row._id + '?examType=subjective' : "/teacher/viewExam/" + row._id + '?examType=objective'}>Join exam</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="primary">
                <Link to={type ? "/teacher/viewExam/" + row._id + '?examType=subjective' : "/teacher/viewExam/" + row._id + '?examType=objective'}>View exam</Link>
              </Button>
              
              <Button
                onClick={() => {
                  type
                    ? deleteExamWrittenFun(row._id)
                    : deleteExamMCQFun(row._id, exams);
                }}
                className={classes.btn}
                variant="contained"
                color="primary"
              >
                Delete
              </Button>
            </>
          )
        ) : (
          <>
            <Button
              onClick={() => {
                type ? StartExamWritten(row._id) : StartExamMCQ(row._id);
              }}
              className={classes.btn}
              variant="contained"
              color="primary"
            >
              Start
            </Button>
            <Button
              onClick={() => {
                type
                  ? deleteExamWrittenFun(row._id)
                  : deleteExamMCQFun(row._id, exams);
              }}
              className={classes.btn}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
            <Button className={classes.btn} variant="contained" color="primary">
              <Link
                to={
                  type
                    ? `/teacher/ExamEdit/${row._id}?type=subjective&_classroomId=${_classroomId}`
                    : `/teacher/ExamEdit/${row._id}?type=objective&_classroomId=${_classroomId}`
                }
              >
                Edit
              </Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    width: "100%",
  },
});

export default function CustomizedTables({
  dispatch,
  _classroomId,
  examType,
  useSelector
}) {

  const [selectedIndex, setSelectedIndex] = useState(-1)

  const classes = useStyles();
  const exams = useSelector((state) => state.exams);

  React.useEffect(() => {

    socket = io(END_POINT,{
      autoConnect:false
    })

    // console.log(socket)
    socket.connect()
    
    return()=>{
      socket.on('disconnect');
      socket.off();
    } 
  }, [END_POINT , window.search])
  

  React.useEffect(async () => {

    if (examType === 0) {
      dispatch(getAllExamsSubjective(_classroomId));
    } else {
      dispatch(getAllExamsObjective(_classroomId));
    }
  }, []);

  return (
    <TableContainer className={classes.root} component={Paper}>
      {exams.loading ? (
        <Loader
          style={{ width: 100 }}
          type={"Puff"}
          color={"blue"}
          height={50}
          width={50}
        />
      ) : (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{textAlign:"center"}}>Serial No</StyledTableCell>
              <StyledTableCell>Exam Name</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell style={{textAlign:"center"}} >Date</StyledTableCell>
              <StyledTableCell style={{textAlign:"center"}}>Student appeared</StyledTableCell>
              <StyledTableCell align="center">Settings</StyledTableCell>
            </TableRow>
          </TableHead>

          {examType === 0 ? (
            <TableBody style={{ position: "relative"}}>
              {exams.searchSubjectiveExams ? (
                
                exams.searchSubjectiveExams.map((row, index) => (
                     <Exam 
                         row={row} 
                         index={index} 
                         StyledTableRow={StyledTableRow} 
                         StyledTableCell={StyledTableCell} 
                         dispatch={dispatch}
                         selectedIndex={selectedIndex} 
                         setSelectedIndex={setSelectedIndex} 
                         Settings={Settings}
                         exams={exams}
                         _classroomId={_classroomId}
                         type={true}
                      />
                ))
              ) : exams.subjectiveExams ? (
                
                exams.subjectiveExams.map((row, index) => (
                          <Exam 
                              row={row} 
                              index={index} 
                              StyledTableRow={StyledTableRow} 
                              StyledTableCell={StyledTableCell} 
                              dispatch={dispatch}
                              selectedIndex={selectedIndex} 
                              setSelectedIndex={setSelectedIndex} 
                              Settings={Settings}
                              exams={exams}
                              _classroomId={_classroomId}
                              type={true}
                         />                  
                ))
              ) : (
                <Loader />
              )}
            </TableBody>
          ) : (
            <TableBody style={{ position: "relative" }}>
              { 
              exams.searchObjectiveExams ? (
              
                exams.searchObjectiveExams.map((row, index) => (
                      <Exam 
                          row={row} 
                          index={index} 
                          StyledTableRow={StyledTableRow} 
                          StyledTableCell={StyledTableCell} 
                          dispatch={dispatch}
                          selectedIndex={selectedIndex} 
                          setSelectedIndex={setSelectedIndex} 
                          Settings={Settings}
                          exams={exams}
                          _classroomId={_classroomId}
                          type={false}
                      />                 
               ))
              ) :
              exams.objectiveExams ? (
                
                exams.objectiveExams.map((row, index) => (
                  <Exam 
                      row={row} 
                      index={index} 
                      StyledTableRow={StyledTableRow} 
                      StyledTableCell={StyledTableCell} 
                      dispatch={dispatch}
                      selectedIndex={selectedIndex} 
                      setSelectedIndex={setSelectedIndex} 
                      Settings={Settings}
                      exams={exams}
                      _classroomId={_classroomId}
                      type={false}
                   />                   
               ))
              ) : (
                <Loader />
              )}
            </TableBody>
          )}
        </Table>
      )}
    </TableContainer>
  );
}