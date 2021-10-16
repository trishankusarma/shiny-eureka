const fs  = require('fs');

const axios = require('axios')

let OAuth2Data = require("../../credentials.json");

const generateAccessToken = async (req,res,next)=>{
   
  try {

    if( JSON.parse( req.teacher.tokens).expiry_date <= new Date().getTime() ){

            const body = {
            client_id : OAuth2Data.web.client_id,
            client_secret : OAuth2Data.web.client_secret,
            grant_type : "refresh_token",
            refresh_token : JSON.parse( req.teacher.tokens).refresh_token
            }  
        
            const dataStream = await axios.post(
                'https://accounts.google.com/o/oauth2/token' , 
                body 
            )

            if(dataStream.status===200){
                
            console.log(req.teacher['tokens'])
                
                req.teacher['tokens'] = JSON.stringify({
                    refresh_token : JSON.parse( req.teacher.tokens).refresh_token,
                    scope : JSON.parse( req.teacher.tokens).scope,
                    token_type : JSON.parse( req.teacher.tokens).token_type,
                    id_token : JSON.parse( req.teacher.tokens).id_token,
                    access_token : dataStream.data.access_token,
                    expiry_date : parseInt( new Date().getTime() + dataStream.data.expires_in*1000 )
                })

                await req.teacher.save()
            }else{

                    fs.unlinkSync(req.file.path) 

                    return res.json({
                        success : 0,
                        msg : 'Invalid Authentication! Logout and login to continue!'
                    });
            }
    }
   
     next()

  } catch (err) {

  console.log(err,"err")
    return res.json({
        
        success:0,
        msg: "Internal server error."
    })

  }
}
module.exports = generateAccessToken