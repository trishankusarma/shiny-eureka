const jwt = require("jsonwebtoken")

const { Teacher } = require("../../models")

const {
  REFRESH_TOKEN_SECRET
} = process.env

const auth=async (req,res,next)=>{
   
  try {
    const token = req.cookies.authorization

    if(!token){ 
      return res.json({

          success:0,
          msg: "Invalid Authentication."
      })
    }

    jwt.verify(token, REFRESH_TOKEN_SECRET , async (err, teacher) => {
      
        if(err){

         console.log(err)
        
          res.clearCookie("authorization");

          return res.json({
           
              success:0,
              msg: "Invalid Authentication."
          })
        }

        req.teacher = await Teacher.findById(teacher._id)
        
        next()
    })
  } catch (err) {
  console.log(err,"err")
    return res.json({
        
        success:0,
        msg: "Internal server error."
    })

  }
}
module.exports = auth
