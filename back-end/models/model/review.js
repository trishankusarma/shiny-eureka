const mongoose = require('mongoose')
const { Schema , model } = mongoose

const reviewSchema = Schema({
    
    stars : {
        type : Number
    },

    experience : {
        type : String
    },
    
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    }
})

module.exports = Review = model('Review', reviewSchema)