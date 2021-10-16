const express = require("express");
const router = new express.Router();

const { upload , auth , generateAccessToken } = require("../../utils");

const { examSubjectiveController } = require("../../controllers");

const {
   uploadQuestionPaper,
   startExam,
   getBasicDetails,
   examUpdate,
   getExamByRoom,
   examDetails,
   getStudentList,
   deleteExam
} = examSubjectiveController;

//teacher
router.get("/getStudentsExcel/:_id", auth ,getStudentList);

router.delete("/:_id", auth , generateAccessToken ,deleteExam);

router.post(
  "/uploadQuestionPaper",
  auth,
  upload.single("upload_question_paper"),
  generateAccessToken,
  uploadQuestionPaper
);

router.patch("/startExam/:_id", auth , startExam);

router.get("/getExamDetails/:_id", auth ,examDetails);

router.patch(
  "/examUpdate/:_id",
  auth,
  upload.single("upload_question_paper"),
  generateAccessToken,
  examUpdate
);

//student
router.get("/getExamByRoom/:room", getExamByRoom);
router.get("/getBasicDetails/:_id", getBasicDetails);



module.exports = router;
