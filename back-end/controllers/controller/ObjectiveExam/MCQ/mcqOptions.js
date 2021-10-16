const mongoose = require('mongoose')
const { MCQOption } = require('../../../../models')

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

const McqOptionsController = {

    // 1)
    createOption : async (req,res)=>{
         try {
             
            const { _id } = req.params

            const { optionNo , description , correct_status } = req.body

            const option = new MCQOption({
                optionNo,
                description,
                correct_status,
                mcq : mongoose.Types.ObjectId( _id )
            })

            if(req.file){
                await uploadFolder(req.teacher.tokens, req.file, async (value) => {
                
                    if (value.success === 0) {
                      return res.json({
                        success: 0,
                        msg: value.msg
                      });
                    }
      
                    option['fileId'] = value.fileId
                    
                    option['image'] = value.webViewLink
                    
                    await option.save()
          
                    res.status(201).json({
                        success:1,
                        option
                    })
                })
            }else{
                await option.save()

                res.json({
                    success:1,
                    option
                })
            }
         } catch (error) {
             console.log(error)
             res.json(internalServerError)
         }
    },

    // 2) Update
    updateOption : async (req,res) => {        
        try {

            const { _id } = req.params

            const option = await MCQOption.findById(_id)

            if(!option){
                return res.json(invalidId)
            }

            const updates = Object.keys(req.body)

            // valid updates -> optionNo description fileId image correct_status

            updates.forEach((update) => option[update] = req.body[update] )

            console.log(req.file)

             if(req.file){

                  if(option['fileId']){
                        await deleteFolder(req.teacher.tokens, option['fileId'], async (value) => {

                          if(value.success===0){
                            
                            return res.json({
                            
                                success : 0,
                                msg : value.msg
                            })
                          }
                        })
                  }

                  await uploadFolder(req.teacher.tokens, req.file, async (value) => {
                
                      if (value.success === 0) {
                        return res.json({
                          success: 0,
                          msg: value.msg
                        });
                      }
        
                      option['fileId'] = value.fileId
                      
                      option['image'] = value.webViewLink
                      
                      await option.save()
            
                      res.status(201).json({
                          success:1,
                          option
                      })
                  })
             }else{
                await option.save()
            
                res.status(201).json({
                    success:1,
                    option
                })
             }
    
        } catch (error) {                        
                res.json(internalServerError)
        }
    },
    
    // 3) Delete
    deleteOption: async (req,res) => {        
       try {
           const { _id } = req.params
           
           const option = await MCQOption.findById(_id) 

           if(!option){
               return res.json(invalidId)
           }

           if(option['fileId']){
                await deleteFolder(req.teacher.tokens, option['fileId'], async (value) => {

                  if(value.success===0){
                    
                    return res.json({
                    
                        success : 0,
                        msg : value.msg
                    })
                  }
                })
            }

           await option.remove()

           res.json({
               success:1,
               option
           })

       } catch (error) {
           res.json(internalServerError)
       }
    }
}

module.exports = McqOptionsController; 