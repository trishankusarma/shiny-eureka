const mongoose = require('mongoose')
const { Schema , model } = mongoose

const examSubjectiveSchema = Schema({
    name:{
        type:String,
        required:true
     },

     timeLength:{
        type:String,
        trim:true,
        required:true
     },

     startTime:{
         type:Number
     },

     status:{
         type:Boolean,
         default:false
         //false means exam has not started
     },

     instruction:{
        type:String
     },

     fileId:{
         type:String,
         required:true
     },
     
     questionPaper:{
         type:String,
         required:true
     },

     submissionTime:{
         type:Number
     },
     instruction:{
        type:String
     },

     classroom:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Classroom'
    }
},{ timestamps:true })

examSubjectiveSchema.virtual('student_sub',{

    ref:'StudentSubjective',
    localField:'_id',
    foreignField:'exam'
})

module.exports = ExamSubjective = model('ExamSubjective', examSubjectiveSchema)
