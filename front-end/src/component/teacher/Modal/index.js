import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {deleteRoom,editRoom} from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
}));

const useFormStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(2),
      width: "60ch",
    },
  },
  formHeader: {
    fontSize: "1.8rem",
    fontWeight: "500",
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
  },
}));
export default function CreateRoom(props) {
  const { dispatch, createRoom, room, useSelector } = props;
  const classes = useStyles();
  const teacherRoom = useSelector((state) => state.teacherRoom);
  const [open, setOpen] = React.useState(false);
  const [roomDetails, setRoomDetails] = React.useState(
    props.edit
      ? {
          name: "",
          strength: "",
        }
      : {
          name: room?.name,
          strength: room?.strength,
        }
  );

  React.useEffect(() => {
    setRoomDetails({
      name: room?.name,
      strength: room?.strength,
    });
  },[]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CreateRoom = () => {
    handleClose();
    setRoomDetails({
      name: "",
      strength: "",
    });
    dispatch(createRoom(roomDetails));
  };

  const DeleteRoom = () => {
    handleClose();

    dispatch(deleteRoom(room._id, teacherRoom.rooms));
  };

  const EditRoom = () => {
    handleClose();
    dispatch(editRoom(room._id, roomDetails, teacherRoom.rooms));
  };

  const classesForm = useFormStyles();

  return (
    <div>
      <div onClick={handleOpen}>{props.children}</div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {props.delete ? (
          <div className={classes.paper}>
            <form
              className={classesForm.formContainer}
              noValidate
              autoComplete="off"
            >
              <h4>Are you Sure To delete ?</h4>
            </form>
            <div className={classes.btnContainer}>
              <Button
                style={{ margin: "0 1%" }}
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleClose}
              >
                cancel
              </Button>
              <Button
                style={{ margin: "0 3%" }}
                onClick={DeleteRoom}
                variant="contained"
                color="secondary"
                disableElevation
              >
                confirm
              </Button>
            </div>
          </div>
        ) : (
          <div className={classes.paper}>
            <FormControl
              className={classesForm.formContainer}
              noValidate
              autoComplete="off"
            >
              {props.edit ? (
                <h3 className={classesForm.formHeader}>Edit classRoom</h3>
              ) : (
                <h3 className={classesForm.formHeader}>Create classRoom</h3>
              )}
              <TextField
                // id="outlined-basic1_jt"
                onChange={(e) => {
                  setRoomDetails({ ...roomDetails, name: e.target.value });
                }}
                value={roomDetails.name}
                label="Name"
                variant="outlined"
                margin="normal"
                type="text"
              />
              <TextField
                // id="outlined-basic2_jt"
                onChange={(e) => {
                  setRoomDetails({ ...roomDetails,strength: e.target.value });
                }}

                value={roomDetails.strength}
                type="number"
                label="Strength"
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <div className={classes.btnContainer}>
              <Button
                style={{ margin: "0 3%" }}
                variant="contained"
                color="primary"
                disableElevation
                onClick={props.edit ? EditRoom : CreateRoom}
              >
                {props.edit ? "Edit" : "Create"}
              </Button>
              <Button
                style={{ margin: "0 3%" }}
                onClick={handleClose}
                variant="contained"
                color="secondary"
                disableElevation
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
