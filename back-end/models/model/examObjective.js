const mongoose = require('mongoose')
const { Schema , model } = mongoose

const examObjectiveSchema = Schema({
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
         type:Number,
         required:true
     },

     submissionTime:{
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
     
     navigationStatus:{
        type:Boolean,
        default:true
     },

    jumbleStatus:{
      type:Boolean,
      default:false
   },

   classroom:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Classroom'
    }
},{ timestamps:true })

examObjectiveSchema.virtual('student_obj',{

   ref:'StudentObjective',
   localField:'_id',
   foreignField:'exam'
})

//ExamObjective -> MCQ
examObjectiveSchema.virtual('mcq',{
    ref:'MCQ',
    localField:'_id',
    foreignField:'examObjective'
 })

//ExamObjective -> Fill Up
examObjectiveSchema.virtual('fillUp',{
    ref:'FillUp',
    localField:'_id',
    foreignField:'examObjective'
 })

module.exports = ExamObjective = model('ExamObjective', examObjectiveSchema)
