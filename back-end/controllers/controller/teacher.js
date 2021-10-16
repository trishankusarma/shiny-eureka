const fs = require('fs')
const mongoose = require('mongoose')
const path = require('path')

const { Teacher } = require("../../models");
const teacher = require('../../models/model/teacher');

const { cookieConfig, googleAuth } = require("../../utils");

let { oAuth2ClientTeacher, SCOPES_TEACHER,  google } = googleAuth;

const internalServerError = {
  sucess: 0,
  msg: "Something went wrong! Try again later!",
};

const TOKEN_PATH = path.join(__dirname , '../../' , 'token.json')

const teacherController = {
  // 1) Get URL for google api authentication
  googleAuthUrl: async (req, res) => {
    try {
      const url = oAuth2ClientTeacher.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES_TEACHER,
        prompt: 'consent'
      });

      console.log(url);

      res.json({
        success: 1,
        url,
      });
    } catch (error) {
      res.json(internalServerError);
    }
  },

  // 2) Google callback for login, register
  googleCallBack: async (req, res) => {
        try {
            const code = req.query.code;

            if (code) {
                // Get an access token based on our OAuth code

                oAuth2ClientTeacher.getToken(code, async function (err, tokens) {
                if (err) {
                    console.log("Error authenticating");
                    console.log(err);

                    res.json({
                    success: 0,
                    msg: "Error authenticating",
                    });
                } else {
                    console.log("Successfully authenticated");

                    oAuth2ClientTeacher.setCredentials(tokens);

                    var oauth2 = google.oauth2({
                    
                        auth: oAuth2ClientTeacher,
                        version: "v2",
                    });

                    oauth2.userinfo.get(async function (err, response) {
                        
                        if (err) {
                            console.log(err);

                            res.json({
                            success: 0,
                            msg: "Error Authenticating",
                            });
                        } else {

                            const { name , picture , email , verified_email } = response.data

                            if(!verified_email){

                                return res.json({
                                    success : 0,
                                    msg:'Email is not verified by google'
                                }) 
                            }

                            let scope = 2

                            let teacher = await Teacher.findOne({email})

                            if(!teacher){

                                teacher = await Teacher({
                                    name ,
                                    email ,
                                    picture 
                                })

                                scope = 1
                            }

                            teacher['tokens'] = JSON.stringify(tokens)

                            await teacher.save()

                            console.log(teacher)

                            const token = await teacher.generateAuthToken();
            
                            res.cookie('authorization', token , cookieConfig );    

                            // scope===1 :-> registration
                            // scope===2 :-> login
                            console.log(token)
                            
                            res.json({
                                success: 1,
                                teacher,
                                scope
                            });
                        }
                  });
                }
                });
            }
        } catch (error) {
            res.json(internalServerError);
        }
  },

  // 3) update
  update: async (req, res) => {
    try {

      const teacher = req.teacher;


      teacher["phoneNo"] = req.body["phoneNo"];

      teacher["institution"] = mongoose.Types.ObjectId(req.body["institution"]);

      await teacher.save();

      res.json({
        success: 1,
        msg: "Teacher Updated",
        teacher,
      });
    } catch (error) {
      res.json(internalServerError);
    }
  },

  // 4) get basic profile
  profile: async (req, res) => {
    try {

      const teacher = req.teacher

      await teacher
        .populate({
          path:'institution classroom',
          select:'name noOfExams'
        })
        .execPopulate()

        let totalExams = 0

        await 
            teacher
             .classroom.forEach((room)=>{
                console.log(room.noOfExams)
                totalExams = totalExams + room.noOfExams
             })

      res.json({
        success:1,
        teacher: req.teacher,
        totalExams
      });
    } catch (error) {
      res.json(internalServerError);
    }
  },

  // 5) logout user
  logout: async (req, res) => {
    try {
      res.clearCookie("authorization");

      res.json({
        success: 1,
        msg: "Successful Logged Out",
      });
    } catch (error) {
      res.json(internalServerError);
    }
  },
};

module.exports = teacherController;
