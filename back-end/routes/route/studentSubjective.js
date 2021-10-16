const express = require('express')

const router = new express.Router()

const { studentSubjectiveController } = require('../../controllers')

const { uploadAnswerScript , updateNotifications, updateStudentMarks , getStudentDetails , getBasicStudentDetails, upload_image_tracking } = studentSubjectiveController

const { upload, validAuth , auth, generateAccessToken } = require("../../utils");

router.patch('/upload_answer_script/:_id',  

    validAuth,
    upload.single("upload_answer_script"),
    generateAccessToken,
    uploadAnswerScript
)

router.patch('/upload_image_tracking/:_id',  
    
    upload.single("upload_image_tracking"),
    upload_image_tracking
)

router.patch('/update_notifications/:_id',  
    
    updateNotifications
)

router.patch('/update_marks/:_id',

    auth,
    updateStudentMarks
)

router.get('/get_student_detail/:_id',
    auth,
    generateAccessToken,
    getStudentDetails
)

router.get('/get_basic_student_detail/:_id',
    getBasicStudentDetails
)

module.exports = router