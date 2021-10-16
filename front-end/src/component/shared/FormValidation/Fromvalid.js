import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import image from "../../../assets/38435-register.gif"
import { useDispatch, useSelector } from "react-redux";
import SignUp from './SignUp'
import {  getPaidInstitutions } from "../../../redux/actions";

import { useHistory } from 'react-router-dom'

function Formvalid() {
  const auth = useSelector(state => state.auth)
  const dispatch=useDispatch()

  const history = useHistory()

  React.useEffect(()=>{

    if(auth.TeachAuthenticated && auth.sign_in_up_status!==1){
                
      history.push('/teacher/ExamHall')
      return
    }

    if(auth.paidInstitutions) return

    dispatch(getPaidInstitutions())
},[])
  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <SignUp dispatch={dispatch} auth={auth} />
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Formvalid
