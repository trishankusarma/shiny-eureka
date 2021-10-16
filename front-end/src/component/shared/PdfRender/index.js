import React from 'react'
import {pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import classes from "./index.module.css";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useState } from "react";
import {makeStyles} from "@material-ui/core/styles"
const useStyle=makeStyles(()=>({
  instrunctionContainer:{
      width:"76%",
      padding:"2%",
      margin:"1% auto",
      border:"2px solid black",
      borderRadius:"10px"
  }
}))
function PdfTron({ exams }) {
  const classes=useStyle();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { questionPaper } = exams.oneExam?.exam;
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
    });
  }
  
const link = exams.oneExam?.exam?.questionPaper.split("/").map((link,index)=>{
  if(index===6){
    link="preview"
  }
  return link
})

console.log(link.join("/")) 
  return (
    <div className={classes.pdf}>
      {/* <Document
        file={
          "https://drive.google.com/file/d/1PHlQDnFrNGB-JvPXXZGYLt1Cg0h054mB/preview"
        }
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
      </Document> */}
      <div style={{width:"80%",height:"100vh",position:"relative",margin:"0% auto",marginBottom:"3%"}}>
        <iframe
          frameborder="0"
          scrolling="no"
          seamless=""
          src={link.join("/")}
          style={{ width: "100%", height: "100%" }}
          frameborder="0"
        ></iframe>
         <div style={{width:"80px",height:"80px",position:"absolute",opacity:"1",right:"12px",top:0}}>&nbsp;</div>
      </div>
      <center><h1>Instruction </h1></center>
      <div className={classes.instrunctionContainer} dangerouslySetInnerHTML={{ __html:exams.oneExam?.instructions}} />
      {/* <div className={classes.control}>
        <p
          onClick={() => {
            setPageNumber(pageNumber !== 1 ? pageNumber - 1 : 1);
          }}
        >
          <SkipPreviousIcon />
        </p>
        <p>
          {pageNumber}/{numPages}
        </p>
        <p
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          <SkipNextIcon />
        </p>
      </div> */}
    </div>
  );
}

export default PdfTron;
