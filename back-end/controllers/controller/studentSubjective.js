const { StudentSubjective , Teacher } = require("../../models");

const { googleApi } = require('../../utils');

const { deleteFolder , uploadFolder ,  getFileData } = googleApi

const internalServerError = {

  success:0,
  msg:'Something went wrong! Try again later!'
}

const studentSubController = {
     
    uploadAnswerScript : async (req,res)=>{

        try {
            const { _id } = req.params

            const studentSub = await StudentSubjective.findById(_id)

            if(studentSub['answerScript']){
              await deleteFolder( req.teacher.tokens , studentSub['answerScript'], async (value) => {

                if(value.success===0){
                  
                  return res.json({
                  
                       success : 0,
                       msg : value.msg
                  })
                }
              })
            }
    
            await uploadFolder( req.teacher.tokens , req.file, async (value) => {
    
                  if (value.success === 0) {
                   
                    return res.json({
                        success: 0,
                        msg: value.msg
                    });
                  }

                  studentSub['answerScript'] = value.fileId
                  studentSub['lateStatus'] = req.body.lateStatus
                  studentSub['submitTime'] = new Date().getTime()
    
                  await studentSub.save();

                  res.json({
                    success: 1,
                    studentSub
                  });
            })
    
        } catch (error) {

          console.log(error)
    
          return res.json(internalServerError);
        }
    },
     
    updateNotifications : async (req,res)=>{

      try {
          const { _id } = req.params

          const studentSub = await StudentSubjective.findById(_id)

          const { type } = req.body

          studentSub['notifications'][type] = studentSub['notifications'][type] + 1

          await studentSub.save();

          console.log("student sub", studentSub)

          res.json({
               success : 1,
               studentSub
          })
  
      } catch (error) {

        console.log(error)
  
        return res.json(internalServerError);
      }
  },
    updateStudentMarks : async (req,res)=>{
       try {
            const { _id } = req.params;
            
            const student_sub = await StudentSubjective.findById(_id);
            console.log(student_sub,"student_sub")
            if(!student_sub){
                res.json({ 
                    success:0 , 
                    msg:"Invalid Id"
                });
            }
            console.log(req.body['marks'],"req.body['marks']")
            
            student_sub['checkedStatus'] = true

            student_sub['marksObtained'] =  req.body['marksObtained'];
        
            student_sub['marks']=[];
            
            req.body['marks'].forEach(q => {
                 student_sub['marks'].push(q)
            });
            //console.log(student_sub,"student_sub data");    
            await student_sub.save();
            
            res.status(200).json({ success : 1 , student_sub }); 
        
       } catch (error) {
           console.log(error,"error");
           res.json(internalServerError)
       }
    },

    getStudentDetails : async (req,res)=>{
       
      try {
          const { _id } = req.params
          
          let student_sub = await StudentSubjective.findById(_id)

          console.log(student_sub)
                   
          await student_sub
              .populate('student','name email scholarId')
              .populate('exam','name startTime timeLength questionPaper fileId ')
              .execPopulate() 

            await getFileData(req.teacher.tokens , student_sub['answerScript'], async (value) => {
    
                if (value.success === 0) {
                 
                  return res.json({
                      success: 0,
                      msg: value.msg,
                      student_sub,
                  });
                }
                
                console.log("data",value.data)

                return res.json({
                    success:1,
                    student_sub,
                    fileData:JSON.stringify(Array.from(new Uint8Array(value.data)))
                })
              }) 

      } catch (error) {

          console.log(error) 
         
          res.json(internalServerError)
      }
    },

    upload_image_tracking : async (req,res)=>{

      try {
          const { _id } = req.params

          const studentSub = await StudentSubjective.findById(_id)

          const { image } = req.body

          console.log('image' ,Object.values(image) , Object.values(image).length , 1085 )
          
          if(Object.values(image).length > 2000){
             
              studentSub['trackedImages'].push({ 
                image:Object.values(image)
             })  
          }

          await studentSub.save();

          console.log("student sub", studentSub)

          res.json({
               success : 1,
               studentSub
          })
  
      } catch (error) {

        console.log(error)
  
        return res.json(internalServerError);
      }
  },

    // for student
    getBasicStudentDetails : async (req,res)=>{
      try {
        const { _id } = req.params
        
        let student_sub = await StudentSubjective.findById(_id,{
           answerScript : true,
           lateStatus : true
        })
  
        return res.json({
            success:1,
            student_sub
        })


        } catch (error) {

            console.log(error) 
          
            res.json(internalServerError)
        }
     } ,
}

module.exports = studentSubController