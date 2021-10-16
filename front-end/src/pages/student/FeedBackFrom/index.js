import React from 'react'
import StudentNav from "../../../component/student/StudentNav/StudentNav";
import FeedBack from "../../../component/shared/FeedBack"
function FeedBackForm() {
    return (
        <div>
          <StudentNav 
              removeLogout = {true}
          />
           <div style={{marginTop:'60px'}}>
           <FeedBack />
           </div>
        </div>
    )
}

export default FeedBackForm
