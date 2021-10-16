const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const { Schema , model } = mongoose

const jwt = require('jsonwebtoken')

const superAdminSchema = Schema({
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
    password:{
        type: String,
        required: true
    }
})

superAdminSchema.methods.generateAuthToken = async function(next){
   
    const superAdmin = this

    const token = await jwt.sign(
       { _id: superAdmin._id.toString() },
   
       process.env.SUPER_ADMIN_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    )

    return token
}

superAdminSchema.statics.findByCredentials = async (email, password) => {

    const superAdmin = await SuperAdmin.findOne({ email });
    
    if (!superAdmin) {
      return null;
    }
    
    const isMatch = await bcrypt.compare(password, superAdmin.password);
    
    if (!isMatch) {
      return null;
    }
    return superAdmin;
}

superAdminSchema.pre('save', async function (next) {

    const superAdmin = this;
    
    if (superAdmin.isModified('password')) {
    
        superAdmin.password = await bcrypt.hash(superAdmin.password, 10);
    }
    
    next();
});

module.exports = SuperAdmin = model('SuperAdmin',superAdminSchema)