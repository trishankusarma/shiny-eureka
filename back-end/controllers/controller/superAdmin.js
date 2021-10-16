const { SuperAdmin } = require('../../models')

const { cookieConfig } = require('../../utils')

const internalServerError = {

    success:0,
    msg:'Something went wrong! Try again later!'
}

const SuperAdminController = {
    
     // 1) Create new SuperAdmin
     createSuperAdmin : async ( req, res ) => {
          try {
            
            const { name , email , password } = req.body

            const existSuperAdmin = await SuperAdmin.findOne({email})

            if(existSuperAdmin){

                return res.json({
                    success:0,
                    msg:'Super Admin already exists'
                }) 
            }

            const superAdmin = new SuperAdmin({
                name,
                email,
                password
            })
          
            await superAdmin.save();
          
            res.status(201).json({
                success:1,
                superAdmin
            });
          
            } catch (error) {

              res.json(internalServerError)
          }
     },

     //2)login superAdmin
     loginSuperAdmin : async ( req,res ) => {
        try {

            const { email , password } = req.body
            
            const superAdmin = await SuperAdmin.findByCredentials(email , password)

            if(!superAdmin){
                return res.json({
                    success : 0,
                    msg : 'Invalid Credentials'
                })
            }

            const token = await superAdmin.generateAuthToken()
           
            res.cookie('superAuth',token , cookieConfig )

            res.json({
                success:1,
                msg:'Login Successful',
                superAdmin
            })
        } catch (error) {

            res.json(internalServerError)
        }
     },

     // 3) Update SuperAdmin
     updateSuperAdmin : async ( req, res) => {
           try {

               const superAdmin = req.superAdmin

               console.log(superAdmin)

               const updates = Object.keys(req.body)

               updates.forEach(( update ) => superAdmin[ update ] = req.body[ update ] )

               await superAdmin.save()

               res.json({
                   success:1,
                   superAdmin
               })

           } catch (error) {

              res.json(internalServerError)
           }
     },
     
     // 4) Delete SuperAdmin 
     deleteSuperAdmin : async (req,res) =>{
          
        try {

            const { _id } = req.params
               
            const superAdmin = await SuperAdmin.findById(_id)

            if(!superAdmin){

                return res.json({
                    success:0,
                    msg:'SuperAdmin not found'
                })
            }

            await superAdmin.remove()

            res.json({
                success:1,
                msg: `${superAdmin.name} deleted`
            })

        } catch (error) {
              
            res.json(internalServerError)
        }
     },

     // 5) Get SuperAdmins 
     getSuperAdmins : async (req,res)=>{
          try {
              
            const superAdmins = await SuperAdmin.find({})

            res.json({

               success:1,
               superAdmins
            })
          } catch (error) {

            res.json({
                ...internalServerError,
                error:error
            })
          }
     },

     // 6)Logout superAdmin

     logoutSuperAdmin : async (req,res)=>{
        
        try {
           
            res.clearCookie('superAuth')

            res.json({
                success : 1,
                msg : 'Logout successful'
            })
        } catch (error) {
             
            return res.json(internalServerError)
        }
     }
}

module.exports = SuperAdminController