const express = require('express')
const router  = new express.Router()

// const { googleAuth } = require('../utils');

// let { google , oAuth2ClientTeacher } = googleAuth

// const drive = google.drive({version: "v2"});

const  teacherRouter             = require('./route/teacher')
const  classroomRouter           = require('./route/classroom')

const  examSubjectiveRouter      = require('./route/examSubjective')

const  examObjectiveRouter       = require('./route/examObjective')
const  fillUpRouter              = require('./route/fillUp')

const  mCQRouter                 = require('./route/mcq')
const  mcqOptionsRouter          = require('./route/mcqOptions')

const  studentRouter             = require('./route/student')
const  studentSubjectiveRouter   = require('./route/studentSubjective')  
const  studentObjectiveRouter    = require('./route/studentObjective')

const  institutionRouter         = require('./route/institution')  
const  superAdminRouter          = require('./route/superAdmin')   

/************************* superAdmin ************************************/

router.use( '/superAdmin',                superAdminRouter)
router.use( '/institution',               institutionRouter)

router.use( '/teacher',                   teacherRouter)
router.use( '/classroom',                 classroomRouter)

router.use( '/examSubjective',            examSubjectiveRouter)

router.use( '/examObjective',             examObjectiveRouter)
router.use( '/examObjective/mcqs',        mCQRouter);
router.use( '/examObjective/mcqs/options',mcqOptionsRouter);
router.use( '/examObjective/fillUp',      fillUpRouter);

router.use( '/student',                   studentRouter);
router.use( '/student/subjective',        studentSubjectiveRouter);
router.use( '/student/objective',         studentObjectiveRouter);


// const { cookieConfig } = require('../utils')

// router.get('/getToken',(req,res)=>{

//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4M2E2YWY1ZTZmZmIyZTQxMzc2OGIiLCJpYXQiOjE2MjU5MTc3MzgsImV4cCI6MTYyNjUyMjUzOH0.AdR8tlPjLndXThn2_D1OkgFn3-N_1Tg27KSgqi8ZOAY"
    
//     res.cookie('authorization', token , cookieConfig );    

//     res.json({
//             success: 1,
//     });
// })

// const path = require('path')
// const fs = require('fs');

// const TOKEN_PATH = path.join(__dirname,'../token.json')

// router.get('/testing',async (req,res)=>{

//     try {
        
//         await fs.readFile(TOKEN_PATH, async (err, tokens) => {
    
//             if (err) return cb({
//                 success:0,
//                 msg:'Error Authentication'
//             })
        
//             await oAuth2ClientTeacher.setCredentials(JSON.parse(tokens));

//             drive.files.export(
//                 {
//                   auth: oAuth2ClientTeacher,
//                   fileId: "1PCkLoS-6jrh_xzU9HEfqTtjD-QUE419N",  // Please set the file ID of Google Docs.
//                   mimeType: "application/pdf"
//                 },
//                 { responseType: "arraybuffer" },
//                 (err, response) => {
                    
//                   console.log(err,response)
                  
//                   if (err) {
//                     return res.json({
//                         success:0,
//                         data:err
//                     })          
//                   } else {
//                     return res.json({
//                         success:1,
//                         data:response.data
//                     })
//                   }
//                 }
//             ); 
//         });
//     } catch (error) {
//         res.json({
//             success:0,
//             data:error
//         })   
//     }
// })

module.exports = router;