const { Classroom , Student } = require('../../models')

const reader = require('xlsx')

const fs = require('fs')

const internalServerError = {

    success:0,
    msg:'Something went wrong! Try again later!'
}

const classroomController = {
    
     // 1) Create new classroom
     createClassroom : async ( req, res ) => {
          try {
            console.log(req.body,"req.body")
            const { name , strength } = req.body
            const classroom = new Classroom({
                name,
                strength,
                noOfExams:0,
                teacher:req.teacher._id
            })
          
            await classroom.save();
        
            res.status(201).json({
                success:1,
                classroom:classroom
            });
          
            } catch (error) {

              res.json(internalServerError)
          }
     },

     // 2) Update classroom
     updateClassroom : async ( req, res) => {
           try {
               
               const { _id } = req.params

               const classroom = await Classroom.findById( _id )

               if(!classroom){
                   return res.json({
                       success:0,
                       msg:'Classroom not found'
                   })
               }

               const updates = Object.keys(req.body)
               
               const possibleUpdates = [ 'name' , 'strength' ]

               const validUpdates = updates.every(( update ) => possibleUpdates.includes( update ) )

               if(!validUpdates){

                    return res.json({
                    
                        success:0,
                        msg:"Invalid updates"
                    }); 
               }

               updates.forEach(( update ) => classroom[ update ] = req.body[ update ] )

               await classroom.save()

               res.json({
                   success:1,
                   classroom
               })

           } catch (error) {

              res.json(internalServerError)
           }
     },
     
     // 3) Delete classroom 
     deleteClassrooom : async (req,res) =>{
          
        try {

            const { _id } = req.params
            console.log(_id,"cr");
            const classroom = await Classroom.findById(_id)

            if(!classroom){
                return res.json({
                    success:0,
                    msg:'Classroom not found'
                })
            }

            await classroom.remove()

            res.json({
                success:1,
                msg: `${classroom.name} deleted`
            })

        } catch (error) {
              
            res.json(internalServerError)
        }
     },

     // 4) Get classrooms 
     getClassrooms : async (req,res)=>{
          try {
              
            const teacher = req.teacher

            await teacher
               .populate({
                     path:'classroom',  
                     options: { 
                         sort: { 
                             'created_at': -1 
                         } 
                    } 
                })
               .execPopulate()

            res.json({

               success:1,
               classrooms:teacher.classroom
            })
          } catch (error) {

            console.log(error)

            res.json({
                ...internalServerError,
                error:error
            })
          }
     },

     // 5)get particular classroom public details
     getBasicDetails : async (req,res)=>{
        
        try {
            
            const { _id } = req.params

            const classroom = await Classroom.findById(_id,{
                name      : true,
                strength  : true,
                noOfExams : true,
                lastexam  : true
            })

            if(!classroom){
                return res.json({
                    success:0,
                    msg:'Classroom not found'
                })
            }
            await classroom
               .populate('examSub','name timeLength startTime status')
               .populate('examObj','name timeLength startTime status')
               .execPopulate()

            res.json({
                success:1,
                classroom,
                subjectiveExams : classroom.examSub,
                objectiveExams : classroom.examObj 
            })

        } catch (error) {
            
            res.json(internalServerError)
        }
     },

     // 6)get particular classroom Student Details
     getStudentDetails : async (req,res)=>{
        
        try {
            
            const { _id } = req.params

            const classroom = await Classroom.findById(_id , {
                name      : true,
                strength  : true,
                noOfExams : true,
                lastexam  : true
            })

            if(!classroom){
                return res.json({
                    success:0,
                    msg:'Classroom not found'
                })
            }

            await classroom
               .populate('student','name email scholarId')
               .execPopulate()

            res.json({
                success:1,
                students : classroom.student
            })
        } catch (error) {
            
            res.json(internalServerError)
        }
     },

     // 7)get particular classroom subjective exam details
     getSubjectiveExamDetails : async (req,res)=>{
        try {
            
            const { _id } = req.params

            const classroom = await Classroom.findById(_id,{
                name      : true,
                strength  : true,
                noOfExams : true,
                lastexam  : true
            })

            if(!classroom){
                return res.json({
                    success:0,
                    msg:'Classroom not found'
                })
            }

            await classroom
               .populate({
                   path : 'examSub',
                   select : 'name timeLength submissionTime startTime status fileId createdAt student_sub instruction questionPaper',
                   populate:({
                       path:'student_sub',
                       select:'student'
                   })
               })
               .execPopulate()

            const subjectiveExams = await classroom.examSub.map((exam)=>{
                 return {
                     exam:exam,
                     noOfStudents:exam.student_sub.length
                 }
            })

            console.log(subjectiveExams)

            res.json({
                success         : 1,
                classroom,
                subjectiveExams : subjectiveExams.reverse()
            })
        } catch (error) {
            
            res.json(internalServerError)
        }
     },

     // 8)get particular classroom objective exam details
     getObjectiveExamDetails : async (req,res)=>{
         
        try {
            
            const { _id } = req.params

            const classroom = await Classroom.findById(_id)

            if(!classroom){
                return res.json({
                    success:0,
                    msg:'Classroom not found'
                })
            }

            await classroom
               .populate({
                   path : 'examObj',
                   select : 'name timeLength startTime status navigationStatus createdAt student_obj instruction',
                   populate:({
                       path:'student_obj',
                       select:'student'
                   })
               })
               .execPopulate()

            const objectiveExams = await classroom.examObj.map((exam)=>{
                 return {
                     exam:exam,
                     noOfStudents:exam.student_obj.length
                 }
            })

            res.json({
                success        : 1,
                classroom,
                objectiveExams : objectiveExams.reverse() 
            })
        } catch (error) {
            
            res.json(internalServerError)
        }
     },

     // 9)Upload Student excel scheet and make student model out of it
     uploadExcelSheet : async (req,res)=>{

       try {

        const { _id } = req.params

        const classroom = await Classroom.findById(_id , {
           _id : true
        })

        await classroom
            .populate('student','name email scholarId')
            .execPopulate()
           
        // Reading our test file
        const file = reader.readFile(req.file.path)
        
        let students = []
  
        const sheets = file.SheetNames
        
        for(let i = 0; i < sheets.length; i++){

            const temp = reader.utils.sheet_to_json(
                file.Sheets[ file.SheetNames[i] ]
            )
            
            await temp.forEach(async (res) => {

                const existStudent = await classroom.student.find((student)=>student.email===res.email) 

                if(!existStudent){

                    students.push({
                        ...res,
                        classroom:_id
                    })
                }
            })
        }

        await fs.unlink(req.file.path,(error)=>{
            console.log(error)
        });

        await Student.insertMany(students)
            .then(function(){

                res.json({
                    success:1,
                    msg:'Successfully uploaded the student list'
                })
            }).catch(function(error){

                res.json({
                    success:0,
                    msg:'Something went wrong!',
                    error
                })            
            });

       } catch (error) {
          
          return res.json(internalServerError)
       }
     }
}

module.exports = classroomController