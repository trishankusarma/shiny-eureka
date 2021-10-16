import React, { useRef, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Menu as MenuIcon } from "@material-ui/icons";
import { CgMenuGridO } from "react-icons/cg";
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import { Search as SearchIcon } from "@material-ui/icons";
import { AccountCircle } from "@material-ui/icons";
import { Notifications as NotificationsIcon } from "@material-ui/icons/";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import { BiFolderPlus } from "react-icons/bi";
import ModalBtn from "../Modal";
import SideBar from "../SideBar";
import image from "../../../assets/Porikkha_logo.png";
import { useHistory, Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { searchRoom, clearSearch, searchExam , clearSearchExam } from "../../../redux/actions";
import Timer from "../../../component/shared/Timer";
import Tooltip from '@material-ui/core/Tooltip';
import excel from "../../../assets/students.xlsx";


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
    width: "120px",
    marginLeft: 0,
    cursor: "pointer",
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
    [theme.breakpoints.up("sm")]: {
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
    justifyContent: "space-around",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
//teacher/ExamHall
export default function TopBar1(props) {

  const { dispatch, logoutTeacher, useSelector, examType } = props;
  
  const teacherRoom = useSelector((state) => state.teacherRoom);
  const exams = useSelector((state) => state.exams);
  const searchValue = useRef("");
// console.log(exams,"exams")

  useEffect(()=>{

    if(!examType)return

      searchValue.current.value = ""
      dispatch(clearSearchExam())
  },[examType])

  const handleChange = (e) => {
    if (searchValue.current.value !== "") {
      console.log(e.target.value);

      if(window.location.pathname.split('/')[2]==='ExamHall')
            dispatch(searchRoom(e.target.value));
      else if(window.location.pathname.split('/')[2]==='ExamsRoom')
            dispatch(searchExam(e.target.value,examType))
    
    } else {

      if(window.location.pathname.split('/')[2]==='ExamHall')
            dispatch(clearSearch());
      else if(window.location.pathname.split('/')[2]==='ExamsRoom')
            dispatch(clearSearchExam())
    }
  };
  const [bartype, setBarType] = React.useState(0);
  //0 exams room
  // 1 exam profile
  // 2 exam room and exam options

  const history = useHistory();
  React.useEffect(() => {
    //console.log(`/${window.location.pathname.split("/")[1]}/${window.location.pathname.split("/")[2]}`==="/teacher/viewExam");
    if (window.location.pathname) {
      if (window.location.pathname == "/teacher/ExamHall") {
        setBarType(0);
      } else if (
        `/${window.location.pathname.split("/")[1]}/${
          window.location.pathname.split("/")[2]
        }` == "/teacher/viewExam"
      ) {
        setBarType(2);
        console.log("yoyoyo");
      } else {
        setBarType(1);
      }
    }
  }, []);
  // 
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logoutTeacher());
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToHomePage = ()=>{
     history.push('/')
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
        onClick={handleMenuClose}
        onClick={() => {
          history.push(`/teacher/profile`);
        }}
      >
        Profile{" "}
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
      <MenuItem>
      {bartype == 0 ? (
            <a href={excel} download="exampleFile">
              <Tooltip  title={"download excel"}>
                <IconButton aria-label="show 4 new mails" color="inherit">
            <FeaturedPlayListIcon/>
                </IconButton>
                </Tooltip>
                </a>
            ) : null}
        {bartype == 0 ? (
          <ModalBtn {...props}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge
                badgeContent={teacherRoom?.rooms?.length}
                color="secondary"
              >
                <BiFolderPlus />
              </Badge>
            </IconButton>
          </ModalBtn>
        ) : null}
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        {bartype == 2 ? (
          !exams.oneExam?.exam?.status? (
            <Link to={"/teacher/ExamEdit/" + exams.oneExam?.exam?._id}>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge
                  badgeContent={teacherRoom?.rooms?.length}
                  color="secondary"
                >
                  <IoMdSettings />
                </Badge>
            </IconButton>
            </Link>
          ) : null
        ) : null}
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p
          onClick={() => {
            history.push(`/teacher/profile/${props._id}`);
          }}
        >
          Profile
        </p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <SideBar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <CgMenuGridO />
            </IconButton>
          </SideBar>
          
        <img src={image} alt="logo" className={classes.logo} onClick={goToHomePage}/> 

        {(`/${window.location.pathname.split("/")[1]}/${
          window.location.pathname.split("/")[2]
        }` == "/teacher/CheckCopywritten" || 
        `/${window.location.pathname.split("/")[1]}/${
          window.location.pathname.split("/")[2]
        }` == "/teacher/ExamEdit" || 
        `/${window.location.pathname.split("/")[1]}/${
          window.location.pathname.split("/")[2]
        }` == "/teacher/CreateWrittenExam" || 
        `/${window.location.pathname.split("/")[1]}/${
          window.location.pathname.split("/")[2]
        }` == "/teacher/CreateMcqExam" || 
        `/${window.location.pathname.split("/")[1]}/${
          window.location.pathname.split("/")[2]
        }` == "/teacher/Instruction" ||
        window.location.pathname == "/teacher/profile"
        )? null :

<div className={classes.search}>
<div className={classes.searchIcon}>
  <SearchIcon />
</div>
<InputBase
  type="text"
  placeholder="Search…"
  classes={{
    root: classes.inputRoot,
    input: classes.inputInput,
  }}
  inputProps={{ "aria-label": "search" }}
  inputRef={searchValue}
  onChange={handleChange}
/>
</div>

        }
      
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {bartype == 0 ? (
            <a href={excel} download="exampleFile">
              <Tooltip  title={"download excel"}>
                <IconButton aria-label="show 4 new mails" color="inherit">
            <FeaturedPlayListIcon/>
                </IconButton>
                </Tooltip>
                </a>
            ) : null}
            {bartype == 0 ? (
              <ModalBtn {...props}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge
                    badgeContent={teacherRoom?.rooms?.length}
                    color="secondary"
                  >
                    <BiFolderPlus />
                  </Badge>
                </IconButton>
              </ModalBtn>
            ) : null}
            
            {bartype == 2 ? (
              !exams.oneExam?.exam?.status ?
              <Link to={`/teacher/ExamEdit/${exams.oneExam?.exam?._id}?type=subjective&_classroomId=${exams.oneExam?.exam?.classroom._id}`}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge color="secondary">
                  <IoMdSettings />
                </Badge>
              </IconButton>
              </Link>
             : null):null}
             {props.timer? (
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge color="secondary">
                  <Timer 
                  color={"#fff"}
                  bgcolor={"none"}
                  fontSize={"1rem"}
                  height={"20px"}
                  margin={"1%"}
                  radius={"5px"}
                  padding={"2px"}
                  bdColor={"#fff"}
                  hour={exams.oneExam?.exam?.timeLength?.split(":")[0]}
                  minute={exams.oneExam?.exam?.timeLength?.split(":")[1]}
                  startTime={exams.oneExam?.exam?.startTime}
                   />
                   {/* {console.log(exams.oneExam.exam,"exams?.oneExam?.startTime")} */}
                </Badge>
              </IconButton>)
             :null}
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
      {renderMenu}
    </div>
  );
}
