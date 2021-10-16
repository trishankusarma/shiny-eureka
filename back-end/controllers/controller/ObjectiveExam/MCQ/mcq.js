const mongoose = require('mongoose')
const { MCQ , MCQOption } = require('../../../../models')

const internalServerError = {

    success:0,
    msg:'Something went wrong! Try again later!'
}

const invalidId = {
    success : 0,
    msg     : 'Invalid Id'
}

const { googleApi } = require('../../../../utils');

const { uploadFolder , deleteFolder } = googleApi

const MCQController = {

    // 1)
    createMcq : async (req,res)=>{
         try {
             
            const { _id } = req.params

            console.log(req.body)

            const { questionNo } = req.body

            const mcq = new MCQ({
                questionNo,
                examObjective : mongoose.Types.ObjectId( _id )
            })

            await mcq.save()

            res.json({
                success:1,
                mcq
            })
         } catch (error) {
             console.log(error)
             res.json(internalServerError)
         }
    },

    // 2) Update
    updateMcq : async (req,res) => {        
        try {

            const { _id } = req.params

            const mcq = await MCQ.findById(_id)

            if(!mcq){
                return res.json(invalidId)
            }

            const updates = Object.keys(req.body)

            // valid updates -> question mcqType marks fileId mcqImage 

            updates.forEach((update) => mcq[update] = req.body[update] )

             if(req.file){

                  if(mcq['fileId']){
                        await deleteFolder(req.teacher.tokens , mcq['fileId'], async (value) => {

                          if(value.success===0){
                            
                            return res.json({
                            
                                success : 0,
                                msg : value.msg
                            })
                          }
                        })
                  }

                  await uploadFolder(req.teacher.tokens , req.file, async (value) => {
                
                      if (value.success === 0) {
                        return res.json({
                          success: 0,
                          msg: value.msg
                        });
                      }
        
                      mcq['fileId'] = value.fileId
                      
                      mcq['mcqImage'] = value.webViewLink
                      
                      await mcq.save()
            
                      res.status(201).json({
                          success:1,
                          mcq
                      })
                  })
             }else{
                await mcq.save()
            
                res.status(201).json({
                    success:1,
                    mcq
                })
             }
    
        } catch (error) {                        
                res.json(internalServerError)
        }
    },
    
    // 3) Delete
    deleteMcq: async (req,res) => {        
       try 
       {

           const { _id } = req.params
           
           const mcq = await MCQ.findById(_id) 

           console.log(mcq)

           if(!mcq){
               return res.json(invalidId)
           }

           if(mcq['fileId']){
                await deleteFolder( req.teacher.tokens , mcq['fileId'], async (value) => {

                  if(value.success===0){
                    
                    return res.json({
                    
                        success : 0,
                        msg : value.msg
                    })
                  }
                })
            }

           await mcq.remove()

            // delete all OPTIONS associated
            const mcqOptions = await MCQOption.find({ mcq : mcq._id });
        
            await mcqOptions.forEach(async(option)=>{
                await option.remove()
            })

           res.json({
               success:1,
               mcq
           })

       } catch (error) {

           console.log(error)

           res.json(internalServerError)
       }
    }
}

module.exports = MCQController; 