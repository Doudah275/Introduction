const{verify}=require('jsonwebtoken');



const validatetoken=(req,res,next)=>{
  const accesstoken= req.header("accesstoken");

  if(!accesstoken) return res.json({error:"userr not logged in!"})

    try{
      const validtoken=verify(accesstoken,"importantsecret")
      if(validtoken){
        return next()
      }
    }catch(err){
      return res.json({error:err})
    }
}

module.exports={ validatetoken }