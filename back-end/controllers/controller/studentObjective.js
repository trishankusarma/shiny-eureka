const mongoose = require('mongoose');

const { StudentObjective , ExamObjective } = require('../../models');

const internalServerError = {
    success:0,
    msg:'Some error occured!'
}

const UNANSWERED_STATUS = 0
const ANSWERED_STATUS   = 1
const IN_CORRECT_STATUS = 2
const CORRECT_STATUS    = 3

const StudentObjectiveController = {
    
   register : async (req,res)=>{
    
        const { student , exam , mcqs , fillUps , jumbleStatus } = req.body

        try {
                
            const _student = new StudentObjective({
                student : mongoose.Types.ObjectId(student._id),
                exam    : mongoose.Types.ObjectId(exam._id)
            });

            _student['mcq']=[]

            mcqArray = []

            await mcqs.forEach((mcq,index)=>{

                    mcqArray.push(index)
                    
                    let student_response = []

                    for(let i=0; i<mcq.no_of_options ; i++ ){
                    
                            student_response.push({
                                optionNo : i+1,
                                optionChecked : UNANSWERED_STATUS
                            })
                    }

                    _student['mcq'].push({

                            questionNo : index+1,
                            status : 0,
                            studentResponse : student_response 
                    })
            })

            fillUpArray = []

            _student['fillUp']=[];

            await fillUps.map( (fillup,index) => {

                fillUpArray.push(index)
                
                _student['fillUp'].push({
                    questionNo: index+1 ,
                    status:0,
                    studentResponse:''
                })
            })

            if(jumbleStatus){

                _student['jumbleOrderMcq']=[];
               
                let suffledArray =  mcqArray.sort(() => Math.random() - 0.5)

                await suffledArray.forEach((element , index)=>{

                     _student['jumbleOrderMcq'].push({
                          jumble : `${suffledArray[index]}`
                     })
                }) 

                /*******************/

                _student['jumbleOrderFillUp:']=[];
               
                suffledArray =  fillUpArray.sort(() => Math.random() - 0.5)

                await suffledArray.forEach((element , index)=>{

                     _student['jumbleOrderFillUp:'].push({
                          jumble : `${suffledArray[index]}`
                     })
                }) 
            }
            
            await _student.save()
                
            res.status(201).json({ 
                success:1,
                _student,
            });

        } catch (error) {
            console.log(error)
            return  res.json(internalServerError);
        }
   },
   
   getStudentById : async (req,res)=>{
  
        try {
          
          const response = await StudentObjective.findById(req.params._id);
      
          if(response===null){
            res.json({
               success : 0,
               msg: 'Unable to fetch request'
            })
          }
      
          res.status(200).json({
              success:1,
              student:response
          });
       
        } catch (error) {
      
          res.json(internalServerError)
        }
   },

   updateStudentMcq : async (req,res)=>{
  
        try {

          const { _id } = req.params

          const { mcqNo , mcqResponse } = req.body
          
          const student = await StudentObjective.findById(_id)
          
          if(!student){
              res.json({ 
                success:0,
                error:"Invalid Id"
              })
          }

          const response = mcqResponse.find((response)=>response.optionChecked===true)

          if(response){
              student['mcq'][mcqNo].status = ANSWERED_STATUS
          }else{
              student['mcq'][mcqNo].status = UNANSWERED_STATUS
          }
          
          student['mcq'][mcqNo].studentResponse = mcqResponse

          await student.save()
          
          res.status(200).json({ 
             success:1, 
             student : student 
            });   
        } catch (error) {
          
          res.json({ 
            success:0,
            error:'Server Error'
          });
        }
   },

  updateStudentFillUp : async (req,res)=>{
  
      try {

        const { _id } = req.params

        const { fillUpNo , fillUp } = req.body
        
        const student = await StudentObjective.findById(_id)
        
        if(!student){
            res.json({ 
              success:0,
              msg:"Invalid Id"
            })
        }
        student['fillUp'][fillUpNo] = fillUp

        await student.save()
        
        res.status(200).json({ 
           success:1,
           student 
        });   
     
      } catch (error) {
 
        res.json({ 
          success:
          o80 , 
          error:'Server Error'
        })
      }
  },

  updateMarks : async (req,res)=>{
  
        try {
          const { _id } = req.params

          const { exam_id } = req.query
          
          const student = await StudentObjective.findById(_id);

          const exam = await ExamObjective.findById(exam_id);
          
          if(!student || !exam){
              res.json({ 
                 success:0,
                 msg:"Invalid Id"
              });
          }

          await exam
          .populate({
             path   : 'mcq fillUp',
             select : '_id',
             populate: {
                path: 'options',
                select:'correct_status'
             }
          })
          .execPopulate()

          await exam.mcq.forEach((mcq , index)=>{
               
                let flag = true

                mcq.options.forEach((option,idx)=>{

                    if( option.correct_status !== student['mcq'][index].studentResponse[idx])
                        flag = false
                })
                
                if(flag){
                  student['marks'] = mcq.marks
                  student['mcq'][index].status = CORRECT_STATUS
                }else{
                  student['mcq'][index].status = IN_CORRECT_STATUS
                }
          })

          student['jumbleOrderMcq'] = []
          
          student['jumbleOrderFillUp'] = []
              
          await student.save();
          
          res.status(200).json({ 
               success : 1 ,
               student : student 
          });   
        } catch (error) {
          
          res.json(internalServerError);
        }
  }
}

module.exports = StudentObjectiveController