const mongoose = require('mongoose')
const { Schema , model } = mongoose

const studentObjectiveSchema = Schema({
    
    marks:{
        type:Number,
        required:true,
        default:0
    },
   
    fillUp:[{
   
        questionNo:{
            type:Number
        },
        status:{
            type:Number,
            default:0
        },
        studentResponse:{
            type:String
        }
    }],
 
    mcq:[{
        questionNo:{
            type:Number
        },
        status:{
            type:Number,
            default:0
        },
        studentResponse:[{
            optionNo : {
                type:Number
            },
            optionChecked :{
                type:Boolean,
                default : false
            }
        }]
    }],

    jumbleOrderMcq:[{
   
        jumble:{
            type:String
        }
    }],

    jumbleOrderFillUp:[{
   
        jumble:{
            type:String
        }
    }],

    exam : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ExamObjective'
    },

    student : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    }
})

module.exports = StudentObjective = model('StudentObjective', studentObjectiveSchema)
