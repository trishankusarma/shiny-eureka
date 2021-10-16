import React from "react";
import Menu from "@material-ui/core/Menu";
import { MenuItem } from "@material-ui/core";
import ModalBtn from "../Modal";

export default function RoomPoper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.children}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ModalBtn {...props} edit={true}>
            edit
          </ModalBtn>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ModalBtn {...props} delete={true}>
            delete
          </ModalBtn>
        </MenuItem>

        {/* <MenuItem onClick={handleClose}>Copy Link</MenuItem> */}
      </Menu>
    </div>
  );
}
