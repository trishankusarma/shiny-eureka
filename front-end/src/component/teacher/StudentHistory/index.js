import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { getStudentListWritten,getStudentListSubjective} from "../../../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../helper/axiosInstance";
const columns = [
  { id: "ID", label: "Serial ID", minWidth: 100, fontWeight: "bold" },
  { id: "Name", label: "Student Name", minWidth: 170, fontWeight: "bold" },
  {
    id: "Scholar",
    label: "Scholar Id",
    minWidth: 100,
    fontWeight: "bold",
    align: "right",
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 100,
    fontWeight: "bold",
    align: "right",
  },
  {
    id: "Mark",
    label: "Mark",
    minWidth: 100,
    fontWeight: "bold",
    align: "right",
  },
  {
    id: "submitStatus",
    label: "submitStatus",
    minWidth: 170,
    fontWeight: "bold",
    align: "right",
  }
];

function createData(ID, Name, Scholar, Status, Mark, submitStatus , checkId) {
  return { ID, Name, Scholar, Status, Mark, submitStatus, checkId};
}

let rows = [];

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({examType}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [students, setStudent] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { id } = useParams();
  React.useEffect(async () => {
    rows = [];

    let res

    if(examType==='subjective'){
        
      res = await axios.get(`/examSubjective/getExamDetails/${id}`);
      console.log(res.data,"data data bhai");
      dispatch(getStudentListSubjective(res.data.students))

    }else{

      res = await axios.get(`/examObjective/getExamStudentDetails/${id}`);
    }

    // console.log(res.data,"data data bhai");

    for (let i = 0; i < res.data?.students?.length; i++) {
      rows.push(
        createData(
          i + 1,
          res.data.students[i].student?.name,
          res.data.students[i].student?.scholarId,
          examType==='subjective' ? res.data?.students[i].checkedStatus? "checked" : "unchecked" : "checked",
          examType==='subjective' ? res.data?.students[i].marksObtained : res.data?.students[i].marks,
          res.data.students[i]?.answerScript ? res.data.students[i]?.lateStatus ? "Submitted Late" : "Submitted on time" : "Not Submitted",
          res.data?.students[i]._id,
        )
      );
    }
    setStudent(rows);
  }, []);
  const history = useHistory();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: column.fontWeight,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0
            ?students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        onClick={() => {
                          if(examType==='subjective'){
                               history.push(`/teacher/CheckCopywritten/${row.checkId}`);
                          }
                        }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        style={{ cursor:'pointer' }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
