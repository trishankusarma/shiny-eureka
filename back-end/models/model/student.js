const mongoose = require('mongoose')
const { Schema , model } = mongoose

const studentSchema = Schema({
    name:{
        type:String,
        required:true
    },
   
    scholarId:{
        type:Number,
        required:true
    },
   
    email:{
        type: String,
        required: true,
        trim: true
    },

    classroom:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Classroom'
    }
})

module.exports = Student = model('Student', studentSchema)
