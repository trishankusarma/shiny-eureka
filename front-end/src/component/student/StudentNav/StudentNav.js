import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import image from "../../../assets/Porikkha_logo.png";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import warnningMp3 from "../../../assets/music/warning.mp3";
import Timer from "../../../component/shared/Timer/index";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// const ENDPOINT="http://localhost:5000";

// import Timer from "../../../component/shared/Timer/index";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logo: {
    // marginRight: theme.spacing(5),
    width: "150px",
    [theme.breakpoints.up("lg")]: {
      width: "200px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    
    [theme.breakpoints.up("md")]: {
      display:"none",
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // css for model
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "70%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
}));


export default function StudentNavBar({
         dispatch,logoutStudent , socket, exam , messageicon , notifications , Case , setCase , student , timeDuration, removeLogout , 
         setOpenLogoutModel , openLogoutModel , openMessenger , setOpenMessenger , enableFullScreen 
  }) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {

    if( enableFullScreen !== -1 && enableFullScreen%2===1 && typeof setOpenLogoutModel === 'function'){
      
        return setOpenLogoutModel( !openLogoutModel )
    }

    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {

    if( enableFullScreen !== -1 && enableFullScreen%2===1 &&  typeof setOpenLogoutModel === 'function'){
      
        return setOpenLogoutModel( !openLogoutModel )
    }

    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {

    if( enableFullScreen !== -1 && enableFullScreen%2===1 &&  typeof setOpenLogoutModel === 'function'){
      
        return setOpenLogoutModel( !openLogoutModel )
    }

    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {

    if( enableFullScreen !== -1 && enableFullScreen%2===1 && typeof setOpenLogoutModel === 'function'){
      
       return setOpenLogoutModel( !openLogoutModel )
    }

    setMobileMoreAnchorEl(event.currentTarget);
  };
  // state for modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {

    if( enableFullScreen !== -1 && enableFullScreen%2===1 && typeof setOpenMessenger === 'function'){
      
      return setOpenMessenger( !openMessenger )
    }

    setCase(false);
    setOpen(true);
  };

  const handleClose = () => {

    if( enableFullScreen !== -1 && enableFullScreen%2===1 &&  typeof setOpenMessenger === 'function'){
      
      return setOpenMessenger( !openMessenger )
    }

    setOpen(false);
  };

  const handleLogout = () => {
    return dispatch(logoutStudent(socket));
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout()
        }}
      >
        log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {messageicon ? 
      <MenuItem >
        <IconButton aria-label="show 4 new mails" color="inherit">
    
          <Badge
                variant={Case ? "dot" : "standard"}
                color="secondary"
                overlap="rectangle"
              >
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleOpen}>Messages</IconButton>
      </MenuItem>
      : null }
      <MenuItem 
      onClick={() => {
        handleMenuClose();
        handleLogout()
      }}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          
          <ExitToAppIcon />
        </IconButton>
        <IconButton>Log Out</IconButton>
       
      </MenuItem>
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={1} color="secondary">
          <NotificationsActiveIcon />
          </Badge>
        </IconButton>
        <p onClick={handleOpen}>Notifications</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={image} alt="logo" className={classes.logo} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>

            
            {  timeDuration &&  timeDuration>new Date().getTime() ? (
                          student?.exam 
                          ? 
                        <Timer
                          color={'white'}
                          fontSize={"1rem"}
                          height={"20px"}
                          
                          hour={student.exam.timeLength.split(":")[0]}
                          minute={student.exam.timeLength.split(":")[1]}
                          startTime={student.exam.startTime}
                        />
                      :  null
                    ) : (
                        student?.exam
                          ? 
                        <Timer                 
                            bgcolor={'white'}
                            padding={'1rem'}
                            color={'red'}
                            fontSize={"1rem"}
                            height={"20px"}
                            margin={"1%"}
                            hour={0}
                            minute={
                                  student.exam?.submissionTime
                            }
                            startTime={timeDuration}
                            onSubmition={true}
                          />
                        : null
                  )}
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="notification" color="inherit">
              {/* <Badge variant={Case?"dot":"standard"} color="secondary"  overlap="rectangle">
                {/* <MailIcon onClick={handleOpen} /> */}
            {/* <NotificationsActiveIcon onClick={handleOpen} />
              </Badge> */}
            {/* </IconButton> */}
            
            <IconButton>
                {timeDuration && timeDuration>new Date().getTime() ? (
                          student?.exam 
                          ? 
                        <Timer
                          color={'white'}
                          fontSize={"1.2rem"}
                          height={"20px"}
                          margin={"1%"}
                          hour={student.exam.timeLength.split(":")[0]}
                          minute={student.exam.timeLength.split(":")[1]}
                          startTime={student.exam.startTime}
                        />
                      :  null
                    ) : (
                        student?.exam
                          ? 
                        <Timer
                          bgcolor={'white'}
                          padding={'1rem'}
                          color={'red'}
                          fontSize={"1rem"}
                          height={"20px"}
                          // margin={"1%"}
                          hour={0}
                          minute={
                                student.exam?.submissionTime
                          }
                          startTime={timeDuration}

                          onSubmition={true}
                          />
                        : null
                  )}
            </IconButton>
            
           
            {messageicon ? 
   
        <IconButton aria-label="show 4 new mails" color="inherit">
    
          <Badge
                variant={Case ? "dot" : "standard"}
                color="secondary"
                overlap="rectangle"
              >
            <MailIcon  onClick={handleOpen}/>
          </Badge>
        </IconButton>
       
    
      : null }

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>

            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      { removeLogout ? null : renderMenu}

      {/* for modal  */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Exam notification</h2>
              <div className={classes.notification}>
                {notifications?.reverse().map((notification)=>{
                  return(<p>{notification}</p>)  
                })}
              </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
