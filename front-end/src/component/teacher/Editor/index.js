import React, {  useState, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Button from "@material-ui/core/Button";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const Editor = (props) => {
  const [quill, setQuill] = useState();
  const { content } = props;

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    

    if (content) {
      var doc = new DOMParser().parseFromString(
        content,
        "text/html"
      );
      
      var div = document.createElement("div");
      div.innerHTML = doc.firstChild;
      console.log(doc.firstChild.lastChild, "doc");
      document.querySelector("#myeditor .ql-editor").innerHTML =
        doc.firstChild.lastChild.innerHTML;
      return setQuill(q);
    }
    q.setText("Write your instruction here...");
    setQuill(q);
  }, []);

  const postUpload = (e) => {
    e.preventDefault();

    props.setInstruction(document.querySelector(".ql-editor").innerHTML,"document querySelector innerHTML")
    props.setSubmit(true)
  };

  return (
    <>
      <div
        ref={wrapperRef}
        id="myeditor"
        style={{ width: "100%", height: props.height }}
        aria-label="maximum height"
        placeholder="Maximum 4 rows"
      />
      <center style={{width:'100%'}}>
        <Button onClick={postUpload} variant="contained" color="primary" style={{ transform:'translateX(50%)' }}>
          Submit
        </Button>
      </center>
    </>
  );
};

export default Editor;
