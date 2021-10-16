const mongoose = require('mongoose')
const { Schema , model } = mongoose

const mcqSchema = Schema({
    
    questionNo:{  
        type:Number,
        required:true
    },

    question:{
        type:String
    },
    
    fileId:{
        type:String
    },

    mcqImage:{
        type:String
    },

    mcqType:{
       type:String,
       required:true,
       default:'Single Correct Choice'
    },
    
    marks:{
        type:Number,
        required:true,
        default:0
    },
    
    examObjective:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ExamObjective'
    }
})

mcqSchema.virtual('options',{
    ref:'MCQOption',
    localField:'_id',
    foreignField:'mcq'
})

module.exports = MCQ = model('MCQ', mcqSchema)