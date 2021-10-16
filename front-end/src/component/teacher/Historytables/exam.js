import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Zoom from '@material-ui/core/Zoom';

import moment from "moment";

const Exam = ({row, index , StyledTableRow, StyledTableCell , setSelectedIndex, selectedIndex, Settings, exams, dispatch, _classroomId , type }) => {
    return (
        <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row" style={{textAlign:"center"}}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{row.exam.name}</StyledTableCell>
                    <StyledTableCell>
                    <Tooltip title={selectedIndex===index ? "copied" : "copy"} TransitionComponent={Zoom} placement="top">
                          <CopyToClipboard 
                          
                              text={row.exam.name} 
                              onCopy={() => setSelectedIndex(index)}>
                              <FileCopyIcon 
                                style={{ color: selectedIndex===index ? "#6E6D76" : "#8F8F8F", cursor:'pointer',marginLeft:'auto'}}
                              />
                          </CopyToClipboard>
                          </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell style={{textAlign:"center"}}>
                      {moment(row.exam.createdAt).fromNow()}
                    </StyledTableCell>

                    <StyledTableCell style={{textAlign:"center"}}>{row.noOfStudents}</StyledTableCell>
                    <StyledTableCell>
                      {
                        <Settings
                          exams={exams}
                          dispatch={dispatch}
                          type={type}
                          row={row.exam}
                          _classroomId={_classroomId}
                        />
                      }
                    </StyledTableCell>
        </StyledTableRow>
    )
}

export default Exam
