import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Drag from "react-draggable";
import { Toastify } from "../../../App";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    width: "100%",
    alignItem: "center",
  },
  input: {
    width: "90%",
    height: "40px",
    marginBottom: "2%",
    borderRadius: "5px",
    border: "0",
    padding: "5px 10px",
    boxShadow: " -1px 1px 5px 1px rgba(0,0,0,0.09);",
    "&:focus": {
      outline: "none",
    },
  },
  tot: {
    
    width: "90%",
    height: "40px",
    marginBottom: "2%",
    borderRadius: "5px",
    border: "0",
    padding: "5px 10px",
    boxShadow: " -1px 1px 5px 1px rgba(0,0,0,0.09);",
    "&:focus": {
      outline: "none",
    },

  },

  button: {
    height: "50px",
  },
  superRoot: {
    boxShadow: " -1px 1px 5px 1px rgba(0,0,0,.2);",
    display: "flex",
    flexDirection: "row",
    padding: "5px",
    border: "1px solid rgba(0,0,0,.2)",
    width: "40%",
    padding: "1% 2%",
    borderRadius: "5px",
    position: "absolute",
    top: "5%",
    right: "5%",
    zIndex: 1000,
    cursor: "all-scroll",
    backgroundColor: "#34a3f899",
  },
  allMarks: {
    display: "grid",
    marginBottom: "1.5%",
    justifyContent: "space-evenly",
    alignItems: "center",
    gridTemplateColumns: "auto auto auto auto ",
    width: "100%",
    height: "250px",
    overflowY: "scroll",
    padding: "0 10px",
    borderRadius: "5px",
    backgroundColor: "#3f51b5",
  },
  marksItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px 5px",
    width: "40px",
  },
  marks: {
    width: "40px",
    height: "40px",
    borderRadius: "50px",
    textAlign: "center",
    border: "0",
    "&:focus": {
      outline: "0",
    },
  },
  tool: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItem: "center",
    // margin: "0 auto",
    width: "100%",
  },
}));

export default function QuestionEntry(props) {
  console.log(props.data, "propsprops");
  const classes = useStyles();
  const [numberOfQ, setNumberOfQ] = React.useState('');
  const [tot, setTot] = React.useState('');
  const [marks, setMarks] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setUp()
  }, [props?.data?.marks]);

  React.useEffect(()=>{
    let totNo=0;
    for (let i = 0; i < marks.length; i++) {
      totNo = totNo + marks[i].mark;
    }
    setTot(totNo);
  },[marks])
  const setUp = () => {
    let data = localStorage.getItem("marks");
    let totNo = 0;
    if (data) {
      data = JSON.parse(data);
      setMarks(data);
      setNumberOfQ(data.length);
      for (let i = 0; i < data.length; i++) {
        totNo = totNo + data[i].mark;
      }
      setTot(totNo);
    } else {
      if(props?.data?.marks){
        setMarks(props?.data?.marks)
        setNumberOfQ(props?.data?.marks?.length)
        setTot(props?.data?.marksObtained)
      }
      
    }
  };

  const handleMarks = (e, no) => {
  
    setMarks(
      marks.map((mark) => {
        
        if (mark.no == no) {
          return { no: mark.no, mark: parseFloat(e.target.value) };
        }
        return mark;
      })
    );
    
  };
  const arrageMarks = (num) => {
    marks.length = 0;
    if (!num) return;
    for (let i = 0; i < parseInt(num); i++) {
      marks.push({ no: i + 1, mark: 0 });
    }
    setMarks(marks);
    console.log(marks, "makrs");
  };

  const SubmitMarks = () => {
    localStorage.setItem("marks", JSON.stringify(marks));
    props.SubmitUpdates()
    setUp()
  };

  return (
    <Drag>
      <div className={classes.superRoot}>
        <div className={classes.root}>
          <div className={classes.tool}>
            <div>
             {
               parseInt(numberOfQ)===0 ? 

                <input
                    type="number"
                    placeholder="No of questions"
                    variant="outlined"
                    id="12345##"
                    onChange={(e) => {
                      setNumberOfQ(e.target.value);
                      arrageMarks(e.target.value);
                    }}
                    className={classes.input}
                />  :

                <input
                    type="number"
                    placeholder="No of questions"
                    variant="outlined"
                    value={numberOfQ}
                    id="12345##"
                    onChange={(e) => {
                      setNumberOfQ(e.target.value);
                      arrageMarks(e.target.value);
                    }}
                    className={classes.input}
                />
             }
            </div>
            <div>
             {
               parseInt(numberOfQ)===0 ?
               
               <input
                  type="number"
                  placeholder="Total marks"
                  variant="outlined"
                  id="12345#"
                  className={classes.tot}
               /> :
               <input
                  type="number"
                  variant="outlined"
                  id="12345#"
                  value={tot}
                  className={classes.tot}
               />
             }
            </div>
            <div>
              <Button
                className={classes.button}
                onClick={() => SubmitMarks()}
                variant="contained"
                color="primary"
              >
                Save marks
              </Button>
            </div>
          </div>

          <div className={classes.allMarks}>
            {marks.map((mark, index) => {
              return (
                <>
                  <div className={classes.marksItem}>
                    <label style={{ color: "#fff" }}>{mark.no}</label>
                    <input
                      value={mark.mark}
                      onChange={(e) => {
                        handleMarks(e, mark.no);
                      }}
                      type="number"
                      id={`av${index}`}
                      placeholder="No of questions"
                      variant="outlined"
                      className={classes.marks}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Drag>
  );
}
