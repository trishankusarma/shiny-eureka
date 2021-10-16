import React,{ useEffect , useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper , Button , TextField } from '@material-ui/core';
import Layout from '../../layout/teacher'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from 'react-loader-spinner'

import { getStudentList , updateStudent , deleteStudent } from '../../../redux/actions'

import NoResults from '../../../pages/NoSearch'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },

}))(TableRow);

const useStyles = makeStyles({
  table: {
    width:'90%',
    margin:'10px auto',
  },
});

export default function StudentList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { _classroomId } =  useParams()

  const [ editId , setEditId ] = useState(null)
  const [ student , setStudent ] = useState(null)
  const [ deleteId , setDeleteId ] = useState(null)

  const teacherRoom = useSelector((state)=>state.teacherRoom) 

  const handleChange = (e)=>{
      setStudent({
        ...student,
        [e.target.name] : e.target.value
      })
  }

  const onSubmit = async ()=>{
      
      await dispatch( updateStudent(student) ) 

      setEditId(null)
      setStudent(null)
  }

  const DeleteStudent = async (_id) =>{

      await dispatch( deleteStudent(_id) )
      setDeleteId(null)       
  }

  useEffect(()=>{

    dispatch(getStudentList(_classroomId))
  },[])

  return (
      <div>
      <Layout dispatch={dispatch} useSelector={useSelector}/>
      <center><h1>Enrolled Student List</h1></center>
      <TableContainer className={classes.paper}>
      <Table className={classes.table} style={{ tableLayout: 'fixed' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>serial Id</StyledTableCell>
            <StyledTableCell>student name</StyledTableCell>
            <StyledTableCell >Scholar Id</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Setting</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {
           !teacherRoom.students ?
                <div style={{width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Loader />
                </div>
            :  teacherRoom.students.length===0 
            
            ? 
             <div style={{width:'90vw',display:'flex',alignItems:'center',justifyContent:'center',margin:"10vh auto"}}>
                    <NoResults name="No Students enrolled" />

              </div>
            
            : teacherRoom.students.map((row,index) => (
              
              row._id===editId ?
                
              <StyledTableRow key={row._id}>

                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  
                  <StyledTableCell>
                      <TextField 
                          type='text' 
                          name='name' 
                          value={student.name} 
                          onChange={handleChange}
                          style={{ width:'100%' }}
                      />
                  </StyledTableCell>
                  
                  <StyledTableCell>
                     <TextField
                          type='number' 
                          name='scholarId' 
                          value={student.scholarId} 
                          onChange={handleChange} 
                          style={{ width:'100%' }}
                      />
                  </StyledTableCell>

                  <StyledTableCell>
                     <TextField
                         type='email' 
                         name='email' 
                         value={ student.email } 
                         onChange={handleChange} 
                         style={{ width:'100%' }}
                      />
                  </StyledTableCell>

                  <Button 
                      style={{ marginTop:'10px' }} 
                      variant="contained"  
                      color="primary" 
                      disabled = { teacherRoom.loading && row._id===editId ? true : false }
                      onClick={ onSubmit }
                  >
                    Save
                  </Button>
          
               </StyledTableRow>   

              :

              <StyledTableRow key={row.name}>

                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                
                <StyledTableCell>
                     <TextField 
                          type='text' 
                          name='name' 
                          InputProps={{ disableUnderline: true }}
                          value={row.name} 
                          style={{ width:'100%' }}
                          readOnly
                      />
                </StyledTableCell>
                
                <StyledTableCell>
                      <TextField
                          type='number' 
                          name='scholarId' 
                          value={row.scholarId} 
                          InputProps={{ disableUnderline: true }}
                          style={{ width:'100%' }}
                          readOnly
                      />
                </StyledTableCell>
                
                <StyledTableCell>
                    <TextField
                         type='email' 
                         name='email' 
                         value={ row.email } 
                         InputProps={{ disableUnderline: true }}
                         style={{ width:'100%' }}
                         readOnly
                      />
                </StyledTableCell>

                <div>
                    <Button 
                        style={{ marginTop:'10px' }} 
                        variant="contained"  
                        color="primary" 
                        disabled = { teacherRoom.loading && row._id===editId ? true : false }
                        onClick={() => {
                          setEditId(row._id)
                          setStudent(row)
                        }}
                    >
                      Edit
                    </Button>

                    <Button 
                        style={{ marginTop:'10px' , marginLeft:'20px' }} 
                        variant="outlined"  
                        color="primary" 
                        disabled = { teacherRoom.loading && row._id===deleteId ? true : false }
                        onClick={() => DeleteStudent(row._id)}
                    >
                      Delete
                    </Button>
                </div>
            
            </StyledTableRow>

           ))
         }
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    
  );
}