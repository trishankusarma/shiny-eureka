const mongoose = require('mongoose')
const { Schema , model } = mongoose

// 0-> Paper not checked and it is in student drive
// 1-> Paper is checked but answer script in student drive
// 2-> Paper is checked and answer script in teacher drive

const studentSubjectiveSchema = Schema({

    answerScript : {
       type:String
    },

    checkedStatus : {
        
       type:Boolean,
       default:false
    },

    marks : [{
        no : {
            type:Number
        },
        mark : {
            type: Number
        }
    }],

    marksObtained : {
      type:Number,
      default:0
    },

    trackedImages : [{
        image :{
            type : Buffer
        }
    }],

    lateStatus:{
        type:Boolean,
        default:false
    },

    submitTime : {
        type: Number
    },

    notifications:{ 
        noPerson : {
            type : Number,
            default:0
        },
        bookDetect:{
            type:Number,
            default:0
        },
        deviceDetect : {
            type : Number,
            default: 0
        },
        morePerson : {
            type : Number,
            default:0
        },
        tabChange : {
            type : Number,
            default : 0
        }
    },

    exam : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ExamSubjective'
    },

    student : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    }
})

module.exports = studentSubjective = model('StudentSubjective', studentSubjectiveSchema)