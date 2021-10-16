const express = require('express')

const router = new express.Router()

const { studentObjectiveController } = require('../../controllers')

const { getStudentById , updateStudentMcq , updateStudentFillUp , updateMarks } = studentObjectiveController

router.get('/:_id',getStudentById)

router.patch('/update/student/mcq/:_id',updateStudentMcq)

router.patch('/update/student/fillUp/:_id',updateStudentFillUp)

router.patch('/update/marks/:_id',updateMarks)

module.exports = router