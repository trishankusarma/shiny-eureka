import React from "react";
import TopBar1 from "../../teacher/TopBar1"
import SideBar from "../../teacher/SideBar"

const TeacherLayout = (props) => {
  
  return (
    <>
      <TopBar1 {...props}/>
      {props.children}
    </>
  );
};

export default TeacherLayout