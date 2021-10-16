const mongoose = require('mongoose')

const { Schema , model } = mongoose

const institutionSchema = Schema({

    name : {
        type : String
    },
    email : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    isActive:{
        type    : Boolean,
        default : false
    },
    paid:{
        type : Number
    }
},{
    timestamps : true
}) 

module.exports = Institution = model('Institution' , institutionSchema)