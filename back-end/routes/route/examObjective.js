const express = require("express");
const router = new express.Router();

const { auth } = require("../../utils");
const { examObjectiveController , studentObjectiveController } = require("../../controllers");

const {
   createObjectivePaper,
   updateObjectivePaper,
   startExam,
   deleteExam,
   getExamDetails,
   
   getExamByName,
   getExamById,
   getExamStudentDetails,
   getStudentList,
} = examObjectiveController;

const {
    register
} = studentObjectiveController

/*********teacher new exam page**********/

//create Objective Paper

router.post("/", auth, createObjectivePaper);

//update Objective Paper
router.patch("/:_id", auth, updateObjectivePaper);

// start exam
router.patch("/startExam/:_id", auth, startExam);

// delete exam
router.delete("/:_id", auth, deleteExam);

router.get("/getExamById/details/:_id", auth , getExamDetails);

// Get Objective Paper ID for a name
router.get("/getExamByName/:room", getExamByName , register);

/********************************************/

// Get Objective Paper Detailed MCQs and Fill Ups for a given Id
router.get("/getBasicDetails/:_id", getExamById);

router.get("/getExamStudentDetails/:_id", auth, getExamStudentDetails);

router.get("/getStudentsExcel/:_id", auth, getStudentList)

module.exports = router;
