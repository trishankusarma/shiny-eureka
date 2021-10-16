const { Teacher } = require("../../models")

const validAuth = async (req,res,next)=>{
   
  try {
       
        let { teacher } = req.query

        console.log("teacher",teacher)

        req.teacher = await Teacher.findById( teacher )
        
        next()

  } catch (err) {
  
    return res.json({
        
        success:0,
        msg: "Internal server error."
    })

  }
}
module.exports = validAuth
