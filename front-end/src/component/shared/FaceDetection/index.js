import React, { useEffect, useRef , useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { useDispatch } from "react-redux";
import { cheatDetected, noCheat, captureImg } from "../../../redux/actions";

function Face({
  socket,
  email,
  examHall,
  forTesting,
  setTestMessage,
}) {

  let video = null;
  let canvas = null;
  const dispatch = useDispatch();

  const videoRef = useRef(null);

  let checkinterval;

  const stopCam = (video) => {
    const mediaStream = video.srcObject;
    const tracks = mediaStream.getTracks();
    console.log(tracks);
    tracks.forEach((track) => track.stop());
    clearInterval(checkinterval);
  };

  const detect = async () => {
    if (parseInt(localStorage.getItem("enableFullScreen")) === -1) return;

    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(async (stream) => {
        video = document.createElement("video");
        video.setAttribute("autoPlay", true);
        video.srcObject = stream;
        video.play();
        canvas = document.createElement("canvas");

        let noPerson  = 0

        const net = await cocossd.load();
        checkinterval = setInterval(async () => {
          let disable = parseInt(localStorage.getItem("enableFullScreen"));

          if (disable === -1) {
            stopCam(video);
            return;
          } else {
            const obj = await net.detect(video);
            console.log(obj, "obj");
            var count = 0;

            if (obj.length === 0) {

              noPerson = noPerson + 1
              console.log("no person bro",noPerson);
              if(noPerson >=2){

                dispatch(
                  cheatDetected("No person detected", socket, email, examHall, 'noPerson')
                );
                noPerson = 0
              }

            } else if (obj.length) {
              obj.forEach((element) => {
                if (element.class === "book" && element.score > 0.6) {
                  dispatch(
                    cheatDetected("Book detected", socket, email, examHall,'bookDetect')
                  );
                }
                if (
                  (element.class === "cell phone" && element.score > 0.6) ||
                  (element.class === "laptop" && element.score > 0.6)
                ) {
                  dispatch(
                    cheatDetected("Device detected", socket, email, examHall,'deviceDetect')
                  );
                  console.log("cell phone");
                }
                if (element.class === "person" && element.score > 0.6) {
                  count++;

                  if (count > 1) {
                    dispatch(
                      cheatDetected(
                        "More Than One person detected",
                        socket,
                        email,
                        examHall,
                        'morePerson'
                      )
                    );
                    console.log("more than one person");
                  }
                }
              });
            } else {
              dispatch(noCheat());
            }
          }

        }, 3000);
      });
  };

  const testing = async () => {
    if (!videoRef.current) return;

    navigator.mediaDevices

      .getUserMedia({ video: { width: 300 } })

      .then(async (stream) => {
        if(videoRef.current==null) return
        video = videoRef.current;

        video.srcObject = stream;

        video.play();

        const net = await cocossd.load();
        
        const int = setInterval(async ()=>{

          let cnt = localStorage.getItem('count')          

          if(cnt){
              
              stopCam( video )

              clearInterval( int )
              return
          }else{

              if( parseInt( localStorage.getItem("testMessage")) === 1)
                   return
                    
              setTestMessage(null)
         
              const obj = await net.detect(video);

              console.log(obj)

              var count = 0;
                                      
              if (obj.length === 0) {
                                                    
                  setTestMessage("No person");
              } else if (obj.length) {
                
                obj.forEach((element) => {
                  if (element.class === "book" && element.score > 0.6) {
                      setTestMessage("Book detected");
                  } 
                  if (
                    element.class === "cell phone" && element.score > 0.6 ||
                    element.class === "laptop" && element.score > 0.6
                  ) {
                    setTestMessage("Device detected");
                  }
                  if (element.class === "person" && element.score > 0.7 ) {
                    //  if(element.class.length>1)
                    //  alert("More Than One person detected")
                    count++;

                    if (count > 1) {
                      // setNotifications("More Than One person detected" + count);
                      setTestMessage("More Than One person detected");
                    }
                  }
                });
              } 
              if( count === 1){
                  localStorage.setItem("testMessage",1);     
                  setTestMessage(1)  
              }
          }
        }, 3000);
      });
  };

  useEffect(() => {
    if (forTesting) {
      testing();
      return;
    }
    detect();
  }, [videoRef]);

    const tractInterval = setInterval(() => {

      if (parseInt(localStorage.getItem("enableFullScreen")) === -1) {
        clearInterval(tractInterval);
        return;
      }
  
      if (video !== null && canvas !== null) {
        shots(video, canvas);
      }
    },60000*3);

  function shots(video, canvas) {
    var context = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    context.drawImage(video, 0, 0, 300, 300);
    var data = canvas.toDataURL("image/png");

    fetch(data)
          .then(res => res.arrayBuffer())
          .then(buffer => {
            console.log("base64 to buffer: " + new Uint8Array(buffer) );
            dispatch(captureImg (new Uint8Array(buffer) , localStorage.getItem('student_id')))
          })

    socket?.emit("sendPic", { pic: data, examHall, email });
    console.log(data, "data");
  }

  return (
    <>
      {forTesting ? (
        <>
          <video ref={videoRef} autoPlay={true} />
        </>
      ) : null}
    </>
  );
}

export default Face;
