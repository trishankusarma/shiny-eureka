const express = require('express')

const router = new express.Router()

const { classroomController } = require('../../controllers')

const { createClassroom , updateClassroom , deleteClassrooom , getClassrooms , getBasicDetails , getStudentDetails , getSubjectiveExamDetails , getObjectiveExamDetails , uploadExcelSheet} = classroomController

const { auth , upload } = require('../../utils')

//post methods
// 1)
router.post('/create', auth , createClassroom)

//Patch
// 2)
router.patch('/edit/:_id', auth , updateClassroom)

//delete routes
// 3)
router.delete('/delete/:_id', auth , deleteClassrooom)

// get routes
// 4)
router.get('/', auth , getClassrooms)

// 5)
router.get('/:_id', auth , getBasicDetails)

// 6)
router.get('/students/:_id', auth , getStudentDetails)

// 7)
router.get('/subjectiveExams/:_id', auth , getSubjectiveExamDetails)

// 8)
router.get('/objectiveExams/:_id', auth , getObjectiveExamDetails)

// 9)
router.post('/uploadExcelSheet/:_id' , upload.single('upload_excel_sheet') ,  auth , uploadExcelSheet)

module.exports = router