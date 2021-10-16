import React from "react";
import TeacherLayout from "../../../component/layout/teacher";
import ExamCard from "../../../component/teacher/ExamCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { GetExamRooms, createRoom , logoutTeacher } from "../../../redux/actions";
import Nosearch from "../../NoSearch";

import Loader from "react-loader-spinner"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
  },
}));

const ExamHall = () => {
  const dispatch = useDispatch();
  const teacherRoom = useSelector((state) => state.teacherRoom);
  const classes = useStyles();
  const auth = useSelector((state)=>state.auth)
  
  React.useEffect(async () => {
    dispatch(GetExamRooms());
  }, []);

  return (
    <>
      <TeacherLayout
        createRoom={createRoom}
        dispatch={dispatch}
        useSelector={useSelector}
        logoutTeacher={logoutTeacher} 
        auth={auth}
      >
        <div className={classes.root}>
          <Grid container>
            {
               teacherRoom.searchRooms  ?
                  teacherRoom.searchRooms.length > 0
                    ? teacherRoom.searchRooms.map((room, index) => {
                        return (
                          <Grid
                            key={index}
                            className={classes.card}
                            item
                            xl={3}
                            xs={12}
                            lg={3}
                            md={4}
                            sm={6}
                          >
                            <ExamCard
                              dispatch={dispatch}
                              useSelector={useSelector}
                              room={room}
                            />
                          </Grid>
                        );
                      })
                    : 
                      <div>
                         <Nosearch name="not mathching to any classroom"/>
                     </div> 
                    :
                    !teacherRoom.rooms ?
                      
                        <div style={{width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Loader />
                        </div>
                        :     
                        teacherRoom.rooms.length > 0
                        ? teacherRoom.rooms.map((room, index) => {
                            return (
                              <Grid
                                key={index}
                                className={classes.card}
                                item
                                xl={3}
                                xs={12}
                                lg={3}
                                md={4}
                                sm={6}
                              >
                                <ExamCard
                                  dispatch={dispatch}
                                  useSelector={useSelector}
                                  room={room}
                                />
                              </Grid>
                            );
                          })
                        : 
                        <center>
                        <Nosearch name="No classRoom Created"/>
                        </center>  
              }
          </Grid>
        </div>
    </TeacherLayout>
  </>
  );
}

export default ExamHall;
