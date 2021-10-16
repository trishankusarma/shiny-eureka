const fs = require('fs').promises
const exceljs = require('exceljs')
const mongoose = require('mongoose')
const { ExamObjective , Classroom , Student , StudentObjective } = require("../../models")

const internalServerError = {

   success:0,
   msg:'Something went wrong! Try again later!'
}

const invalidId = {
   success : 0,
   msg     : 'Invalid Id'
}

const examObjectiveController = {

   // 1) Create Objective Paper
   createObjectivePaper : async (req,res) => {
   
         const response = await ExamObjective.findOne({ name : req.body.name });
   
         if(response!==null){
            return res.json({ 
               success:0,
               msg:'Please Enter Unique Name to your exam'
            });
         }
   
        try {

         console.log(req.body)

           const { hour, minute , submissionTime,  name , classroom_id , navigationStatus ,  jumbleStatus } = req.body

           const timeL = hour + ':' + minute;
      
           const exam = new ExamObjective({
                  name,
                  timeLength  :  timeL,
                  startTime   :  new Date().getTime(),
                  submissionTime,
                  navigationStatus,
                  jumbleStatus,
                  classroom   :  mongoose.Types.ObjectId(classroom_id)
           });
      
           await exam.save();

           const classroom = await Classroom.findById(classroom_id)
           classroom.examno = parseInt(classroom.examno + 1)
           classroom.lastexam = exam.startTime
   
           await classroom.save()

           console.log(exam)
           
           res.status(201).json({
              success : 1,
              exam
           });
     
        } catch (error) {   

           console.log(error)
           res.json(internalServerError);
       }
   },

   // 2) Update Objective Paper
   updateObjectivePaper : async (req,res) => {    
     try {
          const updates  = Object.keys(req.body);        
          const { _id }  = req.params;        
          const exam = await ExamObjective.findById(_id);

          if(!exam) {
              res.json(invalidId);
          }

          console.log(req.body)

          updates.forEach((update) =>{

               if(update==='hour' || update==='minute')
                    return

               exam[update]=req.body[update]
          });

          const { hour, minute } = req.body

          if(hour && minute){
            const timeL = hour + ":" + minute;

            exam["timeLength"] = timeL;
          }

          console.log(exam)
      
          await exam.save();      

          res.status(200).json({
              success:1,
              exam
          });     
      } catch (error) {   
         
         console.log(error)

         res.json(internalServerError);
      }
   },

   // 3) Start Exam
   startExam : async (req,res) => {      
      const _id = req.params._id

      try {        
        const exam = await ExamObjective.findById(_id)

        if(!exam){
           res.json(invalidId)
        }

        exam['status'] = true
        exam['startTime'] = new Date().getTime()

        await exam.save()

        res.json({
          success : 1,
          exam
       })

     } catch (error) {
       res.json(internalServerError)
     }
   },

   // 4) Delete Exam
   deleteExam : async (req,res) => {      
      const _id = req.params._id

      try {         
          const exam = await ExamObjective.findById(_id)

          if(!exam){
              res.json(invalidId) 
          }

          await exam.remove()

          res.json({
              success:1,
              exam
          })

      } catch (error) {

         console.log(error)

         res.json(internalServerError)
      }
   },

   // 5) Get Exam complete details -> teacher 
   getExamDetails : async (req,res) => {   
      try {    
         const response = await ExamObjective.findById(req.params._id)
         
         if(!response){
            return res.json(invalidId)
         }
         
         await response
            .populate({
               path   : 'mcq fillUp',
               populate: {
                  path: 'options'
               }
            })
            .execPopulate()    

         const mcqs = await response.mcq.map((mcq)=>{
            return {
               mcq ,
               options : mcq.options
            }
         })
        
         res.status(200).json({ 
            success:1,
            exam:response , 
            mcqs,
            fillUps:response.fillUp,
        });
    
       } catch (error) {

         console.log(error)

         res.json(internalServerError);
      }
   },

   // 6) Get Exam by Name
   getExamByName : async (req,res,next) => {
  
      try {      

         const { email , scholarId } = req.query

         const response = await ExamObjective.findOne({ name : req.params.room },{
            _id:true,
            status:true,
            startTime:true,
            classroom:true,
            jumbleStatus:true
         })
      
         if(response===null){
         return res.json({
            success:0,
            msg: 'No exam exists with that room-name'
         });
         }

         const students  = await Student.find({classroom:response.classroom},{
            email:true,
            scholarId : true
         })
   
         const existingStudent = await students.find((student)=>student.email === email && student.scholarId === parseInt(scholarId))
   
         if(!existingStudent){
            
            return res.json({
            success: 0,
            msg:
               "You are not part of the respective classroom!",
            });
         }
   
         if ( response.status && new Date().getTime() - response.startTime > 600000) {
            return res.json({
              success: 0,
              msg: "Exam has already started! You are late! Entry Restricted !",
            });
          }

         await response
            .populate('student_obj', 'student exam')
            .execPopulate()

         let student = response.student_obj.find((s)=>JSON.stringify(s.student)===JSON.stringify(existingStudent._id))

         if(student){

            // student = await StudentObjective.findById(student._id)

            // student.remove()

            return res.json({
               success: 2,
               msg: "Already registered!",
               _student:student
            });
         }

         await response
            .populate({
               path   : 'mcq fillUp',
               select : '_id',
               populate: {
                  path: 'options',
                  select:'_id'
               }
            })
            .execPopulate()    

         const mcqs = await response.mcq.map((mcq)=>{
            return {
               mcq ,
               no_of_options : mcq.options.length
            }
         })
   
         const data = { 
            exam:response,
            student:existingStudent,
            mcqs,
            fillUps:response.fillUp,
            jumbleStatus:response.jumbleStatus
         };

         req.body = data

         return next()

      } catch (error) {
         console.log(error.message);
         res.json(internalServerError);  
      }
   },

   /*************************************/
   
    // 7) Get Exam by ID -> student
   getExamById : async (req,res) => {   
    try {  
       const response = await ExamObjective.findById(req.params._id); 
       
       if(response===null){
          return res.json({ success:0, msg : 'Unable to fetch request' });
       }

      const { auth , student , studentMcq , skip , studentFillUp , mcqCheck , fillUpCheck } = req.query

      let mcqs=[]
       
      if(auth){
            
            await response
            .populate({
               path   : 'mcq fillUp',
               select : '-__v',
               populate: {
                  path: 'options',
                  select :'-__v'
               }
            })
            .execPopulate()  

            mcqs = await response.mcq.map((mcq)=>{
               
               return {
                        
                     mcq ,
                     options : [
                        
                     ...mcq.options,{
                           optionNo : '', 
                           description : '',
                           upload_option : null,
                           correct_status : false, 
                           mcq : mcq._id
                     }
                  ]
               }
            })

            return res.json({
               success:1,
               mcqs,
               fillUps:response.fillUp
            })
      }

      if(student){
         
         await response
            .populate({
               path   : 'classroom',
               select : 'name',
               populate : {
                  path:'teacher',
                  select:'name'
               }
            })
            .execPopulate()

            res.status(200).json({ 
                   success:1,
                   exam: response 
            })
      }

      if(studentMcq || mcqCheck){

         await response
            .populate({
               path   : 'mcq classroom',
               select : '-__v',
               limit : 1,
               skip : parseInt(skip) ,
               populate: {
                  path: 'options',
                  select : studentMcq ? '-correct_status -__v' : '-__v'
               }
            })
            .execPopulate()  

         mcqs = await response.mcq.map((mcq)=>{
            return {
                  mcq ,
                  options : mcq.options
               }
         })

         console.log(mcqs)

         return res.json({
            success:1,
            exam:response,
            mcqs
         })
      }

      if(studentFillUp || fillUpCheck){

         await response
            .populate({
               path   : 'fillUp classroom',
               select : studentFillUp ? '-__v -correct_answer' : '-__v ',
               limit  : 1,
               skip : parseInt(skip)
            })
            .execPopulate()  

         return res.json({
            success  : 1,
            exam:response,
            fillUps : response.fillUp
         })
      }
  
    } catch (error) {
         console.log(error)
         res.json(internalServerError);
    }
   },

   // 9) Get Exam Student Details
   getExamStudentDetails : async (req,res) => {   
    try { 
       const response = await ExamObjective.findById(req.params._id); 
       
       if(response===null){
          return res.json({ error : 'Unable to fetch request' });
       }
       
       await response
       .populate({
         path: "student_obj",
         select: "student marks checkedStatus",
         populate: {
            path: "student",
            select: "name email scholarId",
          },
       })
       .execPopulate();

       console.log(response.student_obj);

       res.status(200).json({ 
           exam:response, 
           students:response.student_obj 
        });
  
     } catch (error) {
       res.json({error:'Internal Server Error'});
    }
   },

   // 10) Get Student List
   getStudentList : async (req,res) => {   
    try {  
       const response = await ExamObjective.findById(req.params._id,
         { name:true , date:true }
       ); 
       
       if(response===null) {
          return res.json({ error : 'Unable to fetch request' });
       }
       
       await response.populate('student_obj','name scholarId email status marks').execPopulate();      
       const workbook = new exceljs.Workbook();  
       const worksheet = workbook.addWorksheet('Students');
  
       worksheet.columns = [
         // name scholarId email status marks
          { header:'name' , key:'name' , width:10 },
          { header:'scholarId' , key:'scholarId' , width:10 },
          { header:'email' , key:'email' , width:10 },
          { header:'marks' , key:'marks' , width:10 }
       ]
  
       await response.student_obj.forEach(student => {
            worksheet.addRow({
              name : student.name ,
              scholarId : student.scholarId ,
              email : student.email ,
              marks : student.marks
            })
       });
  
       worksheet.getRow(1).eachCell((cell)=>{
          cell.font = { bold : true }
       })
  
       await workbook.xlsx.writeFile(`./uploads/students.xlsx`);  
       const fileLocation = `./uploads/students.xlsx`;  
       const file = 'students.xlsx' ;
       
       res.download( fileLocation , file , async (error)=>{          
            console.log("Error : ", error);  
            await fs.unlink(`./uploads/students.xlsx`);
       });
  
       } catch (error) {
        res.status(500).json(error);
      }
   },
}

module.exports = examObjectiveController