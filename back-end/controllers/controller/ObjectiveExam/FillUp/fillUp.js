const { FillUp } = require('../../../../models')
const mongoose = require('mongoose')

const { googleApi } = require('../../../../utils');

const { uploadFolder , deleteFolder } = googleApi

const internalServerError = {

    success:0,
    msg:'Something went wrong! Try again later!'
}

const invalidId = {
    success : 0,
    msg     : 'Invalid Id'
}

const fillUpController = {
   
    // 1) create
    createFillUp: async (req,res) => {

      const {
         questionNo , question , correct_answer , marks 
      } = req.body

      const { _id } = req.params

      try {
         const fillUp = await new FillUp({
              questionNo,
              question,
              correct_answer,
              marks,
              examObjective:mongoose.Types.ObjectId(_id)
          })

          if(req.file){
            await uploadFolder(req.teacher.tokens , req.file, async (value) => {
                
                if (value.success === 0) {
                  return res.json({
                    success: 0,
                    msg: value.msg
                  });
                }
  
                fillUp['fileId'] = value.fileId
                
                fillUp['fillUpImage'] = value.webViewLink
                
                await fillUp.save()
      
                res.status(201).json({
                    success:1,
                    fillUp
                })
            }) 
          }else{
             await fillUp.save()
        
             res.json({
               success:1,
               fillUp
             })
          }
       } catch (error) {
        //   console.log(error)        
          res.json(internalServerError)       
      }
    },

    // 2) Update
    updateFillUp: async (req,res) => {    

        try {
            const updates=Object.keys(req.body)  

            const { _id } = req.params

            const fillUp = await FillUp.findById(_id)
        
            if(!fillUp){
                res.json(invalidId)  
            }

            updates.forEach((update)=> fillUp[update] = req.body[update] )

            if(req.file){

                 if(fillUp['fileId']){
                        await deleteFolder(req.teacher.tokens , fillUp['fileId'], async (value) => {

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
        
                      fillUp['fileId'] = value.fileId
                      
                      fillUp['fillUpImage'] = value.webViewLink
                      
                      await fillUp.save()
            
                      res.status(201).json({
                          success:1,
                          fillUp
                      })
                  })
            }else{
                await fillUp.save()
          
                res.json({
                    success:1,
                    fillUp
                })     
            }     
        } catch (error) {
        
            res.json(internalServerError)       
        }
    },

    // 3) Delete
    deleteFillUp : async (req,res) =>{
        try {
            const { _id } = req.params
            
            const fillUp = await FillUp.findById(_id) 
 
            if(!fillUp){
                return res.json(invalidId)
            }

            if(fillUp['fileId']){
                
                await deleteFolder(req.teacher.tokens , fillUp['fileId'], async (value) => {

                  if(value.success===0){
                    
                    return res.json({
                    
                        success : 0,
                        msg : value.msg
                    })
                  }
                })
            }
 
            await fillUp.remove()
 
            res.json({
                success:1,
                mcq:`FillUp no. ${fillUp.questionNo} deleted`
            })
 
        } catch (error) {
            res.json(internalServerError)
        }
    }
}

module.exports = fillUpController