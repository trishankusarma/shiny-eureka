const jwt = require("jsonwebtoken")

const { SuperAdmin } = require("../../models")

const {
    SUPER_ADMIN_TOKEN_SECRET
} = process.env

const superAdminAuth = async (req,res,next)=>{
   
  try {
    const token = req.cookies.superAuth

    if(!token){ 
      return res.json({

          success:0,
          msg: "Invalid Authentication.(Super Admin)"
      })
    }

    jwt.verify(token, SUPER_ADMIN_TOKEN_SECRET , async (err, superAdmin) => {
      
        if(err) 
          return res.json({
           
              success:0,
              msg: "Invalid Authentication."
          })

        req.superAdmin = await SuperAdmin.findById(superAdmin._id)

        next()
    })
  } catch (err) {
  
    return res.json({
        
        success:0,
        msg: "Internal server error."
    })

  }
}
module.exports = superAdminAuth
