const mongoose = require('mongoose')
const { Schema , model } = mongoose
const Student = require('./student')
const ExamSubjective  = require('./examSubjective')
const ExamObjective = require('./examObjective') 

const classroomSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    strength:{
        type:Number,
        required:true,
        trim:true,
    },

    noOfExams:{
       type:Number,
       required:true,
       default:0,
       trim:true
    },

    lastexam:{
      type:Date,
      trim:true
    },

    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Teacher'
    }
},{ timestamps:true })

classroomSchema.virtual('student',{
    ref:'Student',
    localField:'_id',
    foreignField:'classroom'
})

classroomSchema.virtual('examSub',{
    ref:'ExamSubjective',
    localField:'_id',
    foreignField:'classroom'
})

classroomSchema.virtual('examObj',{
    ref:'ExamObjective',
    localField:'_id',
    foreignField:'classroom'
})

classroomSchema.pre('remove', async function (next) {

    const classroom = this;
    
    // delete all students associated
    const deleteStudents = await Student.find({ classroom: classroom._id });
  
    deleteStudents.forEach(async(student)=>{
        await student.remove()
    })

    // delete all subjective exams associated
    const deleteExamSubjectives = await ExamSubjective.find({ classroom: classroom._id });
  
    deleteExamSubjectives.forEach(async(exam)=>{
        await exam.remove()
    })

    // delete all objective exams associated
    const deleteExamObjectives = await ExamObjective.find({ classroom: classroom._id });
  
    deleteExamObjectives.forEach(async(exam)=>{
        await exam.remove()
    })

    next();
});

module.exports = Classroom = model('Classroom', classroomSchema)
