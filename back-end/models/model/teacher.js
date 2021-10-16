const mongoose = require('mongoose')
const { Schema , model } = mongoose

const jwt = require('jsonwebtoken')

const teacherSchema = Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    phoneNo:{
        type:String
    },
    picture:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:false
    },

    tokens : {
        type:Object
    },

    institution:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Institution'
    }
})

teacherSchema.virtual('classroom',{

    ref:'Classroom',
    localField:'_id',
    foreignField:'teacher'
})

teacherSchema.methods.generateAuthToken = async function(next){
   
    const teacher = this

    const token = await jwt.sign(
       { _id: teacher._id.toString() },
   
       process.env.REFRESH_TOKEN_SECRET
    )
    
    return token
}

module.exports = Teacher = model('Teacher', teacherSchema)
