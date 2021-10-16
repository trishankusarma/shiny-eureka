import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme , withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import HistoryTables from '../Historytables'

function TabPanel(props) {

  const { children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const examStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '70%',
    margin:'auto'
  },
  name:{
    '&:hover':{
      backgroundColor:"orange"
    }
  }
}))

export default function FullWidthTabs(props) {

  const { dispatch, _classroomId, useSelector , value,  setValue  } = props

  const classes = examStyles();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered={true}
        >
          <Tab label="Subjective Exams" {...a11yProps(0)} />
          <Tab label="Objective Exams" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
           <HistoryTables examType={0} dispatch={dispatch} _classroomId={_classroomId} useSelector={useSelector} />
        </TabPanel>
        
        <TabPanel value={value} index={1} dir={theme.direction}>
           <HistoryTables examType={1} dispatch={dispatch} _classroomId={_classroomId} useSelector={useSelector} />
        </TabPanel>
      
      </SwipeableViews>
    </div>
  );
}
