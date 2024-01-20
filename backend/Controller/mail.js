const Mail = require('../Model/mail')


const postMail = async (req,res)=>{
    try{
         await Mail.create({
            text:req.body.text,
            sender:req.user.email,
            receiver:req.body.receiver
        })
        res.status(200).json({message:'Mail sent'})
    }catch(err){
        console.log(err)
        res.status(400).json({message:err})
    }
}

module.exports = {
    postMail
}