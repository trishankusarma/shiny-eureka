// import React from "react"
import styled from "styled-components"

const TimerStyle = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size:  ${props => props.fontSize};
    font-weight: 600;
    border-radius: ${props => props.radius};
    border-color: ${props => props.bdColor};
    height: ${props => props.height};
    align-items: center;
    color: ${props => props.color};
    ${'' /* margin:${props => props.Margin}; */}
    marginRight:${props => props.MarginLeft};
	background-color: ${props => props.bgcolor};
    padding: ${props => props.padding};  
`

export {TimerStyle}