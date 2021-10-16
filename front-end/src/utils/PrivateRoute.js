import React from "react";
import { Route , Redirect } from 'react-router-dom'

import Cookie from 'js-cookie'

const PrivateRoute = ({component:Component , ...rest}) => {
    
    return (
        <Route 
           {...rest}
           render = {props => Cookie.get('authorization') ? (<Component {...props}/>) : ( <Redirect to='/'/>) }
        />
    )
}

export default PrivateRoute