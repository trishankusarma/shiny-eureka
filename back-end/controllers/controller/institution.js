const { Institution } = require('../../models')

const internalServerError = {

    success:0,
    msg:'Something went wrong! Try again later!'
}

const institutionController = {
    
     // 1) Create new institution
     createInstitution : async ( req, res ) => {
          try {
            
            const { name , city , state , email } = req.body

            const existInstitutionName = await Institution.findOne({name})
            const existInstitutionEmail = await Institution.findOne({email})

            if(existInstitutionName || existInstitutionEmail){

                console.log(existInstitution)

                return res.json({
                    success:0,
                    msg:'Institution already exists!'
                })
            }

            const institution = new Institution({
                name,
                city ,
                state ,
                email
            })
          
            await institution.save();
          
            res.status(201).json({
                success:1,
                institution
            });
          
            } catch (error) {

              res.json(internalServerError)
          }
     },

     // 2) Update institution
     updateInstitution : async ( req, res) => {
           try {
        
               const { _id } = req.params

               const institution = await Institution.findById( _id )

               if(!institution){
                   return res.json({
                       success:0,
                       msg:'institution not found'
                   })
               }

               const updates = Object.keys(req.body)

               updates.forEach(( update ) => institution[ update ] = req.body[ update ] )

               await institution.save()

               res.json({
                   success:1,
                   institution
               })

           } catch (error) {

              res.json(internalServerError)
           }
     },
     
     // 3) Delete institution 
     deleteInstitution : async (req,res) =>{

        try {

            const { _id } = req.params
               
            const institution = await Institution.findById(_id)

            if(!institution){
                return res.json({
                    success:0,
                    msg:'institution not found'
                })
            }

            await institution.remove()

            res.json({
                success:1,
                msg: `${institution.name} deleted`
            })

        } catch (error) {
              
            res.json(internalServerError)
        }
     },

     // 4) Get all institutions 
     getInstitutions : async (req,res)=>{
          try {
              
            const institutions = await Institution.find({})

            res.json({

               success:1,
               institutions
            })
          } catch (error) {

            res.json(internalServerError)

          }
     },

     // 5) Get Particular institution 
     getInstitution : async (req,res)=>{
        try {
            
            const { _id } = req.params

            const institution = await Institution.findById( _id )

            if(!institution){
                return res.json({
                    success:0,
                    msg:'Institution not found'
                })
            }

            res.json({

                success:1,
                institution
            })
            
        } catch (error) {

          res.json(internalServerError)
        }
    },

    // 6) Get paid institutions
    getPaidInstitutions : async (req,res)=>{
        try {
            
            const institutions = await Institution.find({ isActive : true },{
                name:true
            })

            res.json({

                success:1,
                institutions
            })
            
        } catch (error) {

            res.json(internalServerError)

        }
    }
}

module.exports = institutionController