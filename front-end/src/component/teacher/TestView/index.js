import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Fab } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Button } from "@material-ui/core";
import Chat from "./Compoents/Chat/Chat";
import View from "./Compoents/View";
import ScrollBottom from "react-scroll-to-bottom";
import { GrView } from "react-icons/gr";
import ViewModel from "./Compoents/PicModel";

const useStyle = makeStyles(() => ({
  inputBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "50px",
  },
  input: {
    height: "48px",
    width: "88%",
    border: 0,
    "&:focus": {
      outline: "none",
    },
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    padding: "5px 6px",
  },
  btn: {
    height: "60px",
    width: "10%",
  },
  ChatContainer: {
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    width: "100%",
    height: "100%",
    backgroundColor: "#eef4ff",
    position: "relative",
  },
  sendMessage: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "10px",
    height: "60px",
    width: "85%",
    borderRadius: "10px",
    padding: "0px 20px",
    backgroundColor: "#fff",
    alignItems: "center",
    "& input": {
      padding: "5px",
      height: "35px",
      width: "90%",
      outline: "none",
      border: "none",
    },
  },
  box: {
    backgroundColor: "#eef4ff",
    position: "relative",
    width: "95%",
    height: "220px",
    margin: "2% .8%",
    borderRadius: "10px",
    textAlign: "center",
    "&>span": {
      margin: "2% auto",
    },
  },

  studentBox: {
    display: "grid",
    gridTemplateColumns:" repeat(1, 25% 25% 25% 25%)",
    margin: "1% auto",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowY:"scroll",
    height:"90vh",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  StatusDot: {
    width: "25px",
    height: "25px",
    borderRadius: "100%",
    boxShadow: " -1px 1px 5px 1px rgba(0,0,0,.2)",
    backgroundColor: "red",
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  infoBoxs: {
    borderRadius: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    margin: "0 auto",
    backgroundColor: "#709DF9",
  },
  name: {
    color: "F1F1F1",
    fontSize: "1rem",
  },
  id: {
    color: "F1F1F1",
    fontSize: "0.8rem",
  },
}));
const TestView = ({
  students,
  notification,
  setNotification,
  sendnotification,
  setSendNotification,
  cheatedStudents,
  socket,
}) => {
  const classes = useStyle();

  const [message, setMessage] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (selectedStudent) {
      setMessage(`${selectedStudent.name}...`);
    }
  }, [selectedStudent]);

  const sendMessage = (e) => {
    socket.emit("sendIndivisualMessage", {
      student: selectedStudent,
      message,
    });
  };
console.log(students,"students")
  return (
    <div>
      <Grid container>
        <Grid item xl={8} xs={8}>
          <div
            style={{
              backgroundColor: "#3f51b5",
              height: "100vh",
              width: "100%",
              borderTopLeftRadius: "10px",
              padding: "0 1%",
              paddingTop: "1%",
              borderBottomLeftRadius: "10px",
            }}
          >
            <div className={classes.inputBox}>
              <input
                value={notification}
                onChange={(e) => {
                  setNotification(e.target.value);
                }}
                className={classes.input}
                type="text"
                placeholder="Type your notification here "
              />
              <button
                onClick={() => setSendNotification(true)}
                className={classes.btn}
                disabled={sendnotification ? true : false}
              >
                <SendIcon />
              </button>
            </div>

            <div className={classes.studentBox}>
              {students &&
                students.map((student) => (
                  
                  <div className={classes.box}>
                      <ViewModel pics={student.pics} id={"student.student_id"}>
                        <GrView size={30} style={{color:'red', cursor:'pointer'}} />
                      </ViewModel>
                      <View notifications={student.notifications}>
                      <div className={classes.infoBoxs}>
                        <span className={classes.name}>{student.name}</span>
                        <span className={classes.id}>{student.email}</span>
                      </div>
                      </View>
                      <div
                        className={classes.StatusDot}
                        style={{
                          background: student.status ? "green" : "red",
                        }}
                      ></div>

                  </div>
                ))}
                
            </div>
          </div>
          <div></div>
        </Grid>
        <Grid item xl={4} xs={4}>
          <div
            style={{
              backgroundColor: "#3f51b5",
              height: "100vh",
              borderRadius: "10px",
              width: "100%",
              padding: "8px",
            }}
          >
            <div className={classes.ChatContainer}>
              <ScrollBottom>
                <Chat
                  cheatedStudents={cheatedStudents}
                  socket={socket}
                  setSelectedStudent={setSelectedStudent}
                />
              </ScrollBottom>

              <div className={classes.sendMessage}>
                <input
                  type="text"
                  placeholder={
                    selectedStudent
                      ? `${selectedStudent.name}...`
                      : "Send Indivisual message..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button style={{ height: "45px" }} onClick={sendMessage}>
                  <SendIcon />
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestView;
