const mongoose = require('mongoose')
const { Schema , model } = mongoose

const mcqOptionSchema = Schema({
    optionNo:{  
        type:Number
    },
    
    description:{
        type:String
    },
    
    fileId:{
        type:String
    } ,
    
    correct_status:{
       type:Boolean,
       required:true,
       default:false
    },

    image:{
        type:String
    },

    mcq:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'MCQ'
    }
})

module.exports = MCQOption = model('MCQOption', mcqOptionSchema)