import React from 'react'
import CountDownTimer from "./Timer";
import { TimerStyle } from "./TimerStyle";

function Timer({ hour, minute, second=0 , startTime, bgcolor, fontSize, height, color, margin,bdColor,padding,radius , onSubmition }) {
  
  const remainingTime = parseInt(
    ((parseInt(hour) * 60 + parseInt(minute)) * 60000 + parseInt( second )*1000 - new Date().getTime() + parseInt(startTime)) / 1000
  );

  let hoursMinSecs;

  if(!remainingTime || remainingTime <= 0) {
    hoursMinSecs = { hours: 0, minutes: 0, seconds: 0 };
  } else {
    const hours = parseInt(remainingTime / 3600);

    const minutes = parseInt((remainingTime - hours * 3600) / 60);

    const seconds = parseInt(remainingTime - hours * 3600 - minutes * 60);
    hoursMinSecs = { hours, minutes, seconds };
  }
 
  return (
    <TimerStyle
      color={color}
      height={height}
      fontSize={fontSize}
      bgcolor={bgcolor}
      margin={margin}
      padding={padding}
      radius={radius}
      bdColor={bdColor}
    >
      <CountDownTimer hoursMinSecs={hoursMinSecs} onSubmition={onSubmition}/>
    </TimerStyle>
  );
}

export default Timer;
