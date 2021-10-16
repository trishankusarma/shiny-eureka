const googleAuth = require("./googleAuth");
const fs = require('fs')

let { google , oAuth2ClientTeacher  } = googleAuth;

const googleAPI = {

    uploadFolder : async (tokens , file , cb)=>{
        
            await oAuth2ClientTeacher.setCredentials(JSON.parse(tokens));

            console.log(tokens)

            const drive = await google.drive({ version: "v3",auth:oAuth2ClientTeacher });
        
            fileMetadata = {
              name: file.filename
            };
          
            const media = {
              mimeType: file.mimetype,
              body: fs.createReadStream(file.path) 
            }
            await drive.files.create({
            
                resource: fileMetadata,
                media: media,
                fields: "id",
            },
              async (err, response) => {
                if (err) {

                  console.log(err)
          
                  cb({
                      success:0,
                      msg:'Error Authentication'
                  })
          
                } else {
          
                    fileId = response.data.id
                    console.log(response.data.id)
          
                    await drive.permissions.create({
                      fileId: response.data.id,
                      requestBody: {
                        role: 'reader',
                        type: 'anyone',
                      },
                    });
                
                    const driveResponse = await drive.files.get({
                      fileId: fileId,
                      fields: 'webViewLink',
                    });
          
                    fs.unlinkSync(file.path) 
          
                    cb({
                      success     : 1,
                      fileId      : fileId,
                      webViewLink : driveResponse.data.webViewLink
                    })
                }
              }
            )
    },

    deleteFolder : async (tokens, fileId , cb)=>{
        
            await oAuth2ClientTeacher.setCredentials(JSON.parse(tokens));

            const drive = await google.drive({ version: "v3",auth:oAuth2ClientTeacher });
        
            await drive.files.delete({

                fileId : fileId
                
            },(err,response)=>{
                 
                 if (err) {
          
                   return cb({
                      success:0,
                      msg:'Error Authentication'
                  })
          
                }else{
                   
                   cb({
                       success:1
                   })
                }
            })     
    },

    getFileData : async (tokens, fileId , cb)=>{
      
          await oAuth2ClientTeacher.setCredentials(JSON.parse(tokens));

          const drive = await google.drive({ version: "v3", auth : oAuth2ClientTeacher });
          
          await drive.files.get(
              
            {fileId: fileId, alt: 'media'}, 
              
              {responseType: 'arraybuffer'},

              async (err , response)=>{

                console.log(err)

                if(err){
                  return cb({
                       success:0,
                       msg:'Error in excessing data'
                   })
                }

                console.log(response.data)

                  cb({
                        success : 1,
                        data : response.data
                  })
               }
            )
    }
}
module.exports = googleAPI

