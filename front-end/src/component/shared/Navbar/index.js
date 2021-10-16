import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import image from '../../../assets/Porikkha_logo.png';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import GoogleButton from 'react-google-button';
import { useHistory } from 'react-router-dom';
import { scroller } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '50%',
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    }
  },
  logo: {
    width: '150px',
    [theme.breakpoints.up('sm')]: {
      width: '200px'
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(35),
      width: '400px'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

export default function NavabarHome(props) {
  const history = useHistory();
  const {
    dispatch,
    auth,
    GetTeacherAuthUrl,
    logoutTeacher,
    GetStudentAuthUrl,
    logoutStudent
  } = props;

  const [urlState, setUrlState] = useState('Teacher');

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  // Scroll Functions
  const scrollToAboutUs = () => {
    scroller.scrollTo('aboutUsScroll', {
      duration: 100,
      delay: 0,
      smooth: 'easeOutQuart'
    });
    handleMobileMenuClose();
  };
  const scrollToContactUs = () => {
    scroller.scrollTo('contactUsScroll', {
      duration: 100,
      delay: 0,
      smooth: 'easeOutQuart'
    });
    handleMobileMenuClose();
  };
  const scrollToFeatures = () => {
    scroller.scrollTo('keyFreatureScroll', {
      duration: 100,
      delay: 0,
      smooth: 'easeOutQuart'
    });
  };
  const scrollToPricing = () => {
    scroller.scrollTo('pricingScroll', {
      duration: 100,
      delay: 0,
      smooth: 'easeOutQuart'
    });
  };
  // Scroll Functions Ends

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = ()=>{
    
    auth.TeachAuthenticated
      ? dispatch(logoutTeacher())
      : dispatch(logoutStudent());
  } 

  const handleTeacherUrl = () => {
    return  dispatch(GetTeacherAuthUrl());
  }

  const handleStudentUrl = ()=>{
    return dispatch(GetStudentAuthUrl());
  }

  const goToAdminPanel = ()=>{
    auth.TeachAuthenticated 
    ? history.push('/teacher/ExamHall')
    : history.push('/student/StudentEntryForm')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth.TeachAuthenticated || auth.StudentAuthenticated ? (
        <div>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              goToAdminPanel()
            }}
          >
            Admin panel
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              handleLogout()
            }}
          >
            Log Out
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem
            onClick={() => {
              handleOpen();
              handleMenuClose();
              setUrlState('Teacher');
              handleTeacherUrl()
            }}
          >
            Log In or Register as teacher
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleOpen();
              handleMenuClose();
              setUrlState('Student');
              handleStudentUrl()
            }}
          >
            Log In as student
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      // transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        {/* <IconButton
          edge="start"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton> */}
        <p>Login</p>
      </MenuItem>
      <MenuItem onClick={scrollToContactUs}>
        <p edge='middle' color='secondary'>
          Contact Us
        </p>
      </MenuItem>
      <MenuItem onClick={scrollToAboutUs}>
        <p edge='middle' color='secondary'>
          About Us
        </p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <img src={image} alt='logo' className={classes.logo} />

          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <MenuItem onClick={scrollToFeatures}>Our Features</MenuItem>
            <MenuItem onClick={scrollToPricing}>Prices</MenuItem>
            <MenuItem onClick={scrollToContactUs}>Contact us</MenuItem>
            <MenuItem onClick={scrollToAboutUs}>About Us</MenuItem>
            <IconButton
              edge='middle'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <a
              href={
                urlState === 'Teacher'
                  ? auth && auth.authUrlTeacher
                  : auth && auth.authUrlStudent
              }
            >
              <GoogleButton
                type='dark' // can be light or dark
                onClick={() => {
                  console.log('Google button clicked', urlState);
                }}
              />
            </a>
          </div>
        </Fade>
      </Modal>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
