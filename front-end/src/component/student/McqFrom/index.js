import React from "react";
import {
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "70%",
    maxHeight: "70%",
  },

  formcontrol: {
    width: "90%",
    margin: "30px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
  },
  buttongroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    width: "90%",
    margin: "20px auto",
  },
  typography: {
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },
  },
}));

export default function McqFrom({
  mcq,
  index,
  response,
  setResponse,
  lastIndex,
  submitAndGoNext,
  goToPrev,
  type,
  navigationStatus,
  examStatus,
  screenBlank
}) {
  const classes = useStyles();

  const handleChange = (e, id) => {

    if(examStatus)
          return

    if (type === "Single Correct Choice") {
      if (e.target.checked) {
        setResponse(
          response.map((res) =>
            res._id === id
              ? { ...res, optionChecked: true }
              : { ...res, optionChecked: false }
          )
        );

        return;
      }

      setResponse(
        response.map((res) => {
          return { ...res, optionChecked: false };
        })
      );

      return;
    }

    setResponse(
      response.map((res) =>
        res._id === id ? { ...res, optionChecked: !res.optionChecked } : res
      )
    );
  };

  return (
    <div>
      {mcq ? (
        <FormControl 
            component="fieldset" 
            className={classes.formcontrol} 
            style={{  opacity :  screenBlank ? 0 : 1 }}
        >
          <FormLabel>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={true}
                >{type}
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    disabled={true}
                    style={{
                       marginLeft:'1rem'
                    }}
                >
                   {mcq.mcq.marks} marks 
                </Button>
            </div>

            <Typography className={classes.typography} style={{marginTop:'1rem'}}>
              {index + 1}. {mcq.mcq.question}
            </Typography>

            {mcq.mcq.fileId ? (
              <img
                className={classes.image}
                alt=""
                src={`https://drive.google.com/uc?id=${mcq.mcq.fileId}`}
              />
            ) : null}
          </FormLabel>

          <FormGroup column style={{ marginTop: "10px" }}>
            {mcq.options.map((option, idx) => (
              <div>
                <FormControlLabel
                  className={classes.typography}
                  style={{ 
                      marginTop : "10px",
                  }}
                  control={
                    <Checkbox
                      checked={response[idx]?.optionChecked}
                      onChange={(e) => handleChange(e, response[idx]?._id)}

                      style={{
                         
                          color : 
                              examStatus===1
                                ?
                              response[idx]?.optionChecked && option.correct_status===response[idx]?.optionChecked ? 'green' 
                                  : option.correct_status && option.correct_status===response[idx]?.optionChecked ? 'red'
                                  : 'pink'
                              : 'pink' 
                      }}
                    />
                  }
                  label={option.description}
                />

                {option.fileId ? (
                  <img
                  className={classes.image}
                    src={`https://drive.google.com/uc?id=${option.fileId}`}
                  />
                ) : null}
              </div>
            ))}
          </FormGroup>
        </FormControl>
      ) : (
        <Loader />
      )}

      <div className={classes.buttongroup}>
        <Button
          variant="contained"
          color="primary"
          disabled={index === 0 || !navigationStatus ? true : false}
          onClick={goToPrev}
        >
          prev
        </Button>
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={index + 1 === lastIndex ? true : false}
            onClick={() => submitAndGoNext(0)}
          >
            skip
          </Button>

          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => submitAndGoNext(1, lastIndex)}
          >
            submit and next
          </Button>
        </div>
      </div>
    </div>
  );
}
