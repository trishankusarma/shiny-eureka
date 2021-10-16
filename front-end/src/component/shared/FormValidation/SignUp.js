import React,{ useState } from 'react'
import { Formik, Form } from 'formik'
import { TextField } from './Textfield';
import 'bootstrap/dist/css/bootstrap.min.css'

import {  updateTeacher } from "../../../redux/actions";

import { Toastify } from "../../../App";

import { useHistory } from 'react-router-dom';

import "./Fromvalid.css"

function SignUp(props) {

 const {auth,dispatch}=props

 const history = useHistory()

  const [ phoneNo , setPhoneNo ] = useState(
      auth.teacher ? auth.teacher.phoneNo : ''
  )

  const [ institution , setInstitution ] = useState(
      auth.teacher ? auth.teacher.institution : ''
  )



  const teacher = {
    name: auth.teacher ? auth.teacher.name : "",
    email: auth.teacher ? auth.teacher.email : "",
    phoneNo,
    institution,
    terms: false
  }

  const handleSubmit =(e)=>{
     e.preventDefault()

     if(phoneNo.length<10){
         return Toastify("error","Phone Number invalid!")
     }

     if(institution===''){
        return Toastify("error","Please select your institution!")
     }

     dispatch(updateTeacher({ phoneNo , institution } ))
  }

  return (
    <Formik
      initialValues={teacher}
    >
      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form onSubmit={handleSubmit}>
                <TextField placeholder="Enter your name" name="name" type="text" readOnly/>
                <TextField placeholder="Email" name="email" type="email" readOnly/>

                <TextField 
                    placeholder="Phone No" 
                    name="phoneNo" 
                    type="number"
                    value={phoneNo} 
                    onChange={(e)=>setPhoneNo(e.target.value)}     
                    required     
                />

                <div className="select">
                  <select 
                      className="form-select" 
                      aria-label="Default select example" 
                      name="institution" 
                      onChange={(e)=>setInstitution(e.target.value)}
                  >
                     {
                       institution==="" ?
                          <option selected value={''}>Enter your institute name</option>
                        : <option value={''}>Enter your institute name</option>
                     }
      
                      {
                        auth.paidInstitutions && auth.paidInstitutions.map((inst)=>(
                            inst._id===institution ?
                                <option 
                                   key={inst._id} 
                                   value={inst._id}
                                   selected
                                 >
                                    {inst.name}
                                 </option> :
                                <option 
                                    key={inst._id} 
                                    value={inst._id}
                                >
                                    {inst.name}
                                </option> 
                        ))
                      }
                  </select>
                </div>
            

                <div class="form-check">
                    <input type="checkbox" name="terms" className="form-check-input" id="exampleCheck1" required/>
                    <label className="form-check-label" for="exampleCheck1">accept term and condtions</label>
                </div>

                <button 
                    type='submit'
                    className="btn btn-dark mt-3"
                >Register</button>

          </Form>
        </div>
      )}
    </Formik>
  )
}

export default SignUp