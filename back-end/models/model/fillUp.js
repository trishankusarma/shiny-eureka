const mongoose = require('mongoose')
const { Schema , model } = mongoose

const fillUpSchema = Schema({

    questionNo:{
        type:Number,
        required:true
    },

    question:{
        type:String,
        required:true
    },

    correct_answer:{
        type:String
    },

    marks:{
        type:Number,
        required:true,
        default:0
    },

    fileId:{
        type:String
    },

    fillUpImage:{
        type:String
    },

    examObjective:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ExamObjective'
    }
})

module.exports = FillUp = model('FillUp', fillUpSchema)
