import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import {makeStyles} from "@material-ui/core/styles"
const useStyle=makeStyles(()=>({
  instrunctionContainer:{
      width:"100%",
      padding:"2%",
      margin:"1% auto",
      border:"2px solid black",
      borderRadius:"10px"
  }
}))
function PdfRender({linkIs}) {
  const classes=useStyle();
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  return (
    <div className={classes.pdf}>
      <div style={{width:"100%",height:"100vh",position:"relative",margin:"0% auto",marginBottom:"3%"}}>
        <iframe
          frameborder="0"
          scrolling="no"
          seamless=""
          src={linkIs}
          style={{ width: "100%", height: "100%" }}
        ></iframe>
         <div style={{width:"80px",height:"80px",position:"absolute",opacity:"1",right:"12px",top:0}}>&nbsp;</div>
      </div>
    </div>
  );
}

export default PdfRender;
