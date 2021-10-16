const { googleAuth } = require("../../utils")

let { oAuth2ClientStudent, SCOPES_STUDENT,  google } = googleAuth;
const mongoose = require('mongoose')

const { Student, Review } = require('../../models')

const internalServerError = {
  sucess: 0,
  msg: "Something went wrong! Try again later!",
};

const studentController = {

    // 1) Get URL for google api authentication
    googleAuthUrl: async (req, res) => {
        try {
        const url = oAuth2ClientStudent.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES_STUDENT,
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

                oAuth2ClientStudent.getToken(code, async function (err, tokens) {
                if (err) {
                    console.log("Error authenticating");
                    console.log(err);

                    res.json({
                        success: 0,
                        msg: "Error authenticating",
                    });
                } else {
                    console.log("Successfully authenticated");

                    console.log(tokens);

                    oAuth2ClientStudent.setCredentials(tokens);

                    var oauth2 = google.oauth2({
                    
                        auth: oAuth2ClientStudent,
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

                            const student = {
                                name,
                                email,
                                picture
                            }
                            
                            res.json({
                                success: 1,
                                student
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

    updateStudent : async (req,res) => {

        try {

           const { _id } = req.params
            
           const student =  await Student.findById(_id)

           const updates = Object.keys(req.body)

           updates.forEach(( update ) => student[ update ] = req.body[ update ] )

           console.log(student)

           await student.save()

           return res.json({
               success:1,
               student
           })
        } catch (error) {

            console.log(error)

            return res.json(internalServerError)
        }
    },

    deleteStudent : async (req,res) => {

        try {

           const { _id } = req.params
            
           const student =  await Student.findById(_id)

           if(!student){
                return res.json({
                    success:0,
                    msg:'student does not exist'
                })
           }

           console.log(student)

           await student.remove()

           return res.json({
               success:1,
               student
           })
        } catch (error) {

            console.log(error)

            return res.json(internalServerError)
        }
    },

    postReview : async (req , res) =>{
        
        try {
            console.log(req.body,"req.body")

            const { student , stars , experience } = req.body
           
            const review = new Review({
                experience,
                stars,
                student :  mongoose.Types.ObjectId(student)
            })

            await review.save()
            
            res.status(201).json({
                success:1,
                review
            });
          
            } catch (error) {

              res.json(internalServerError)
          }
    }
}

module.exports = studentController