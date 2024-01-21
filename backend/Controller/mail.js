const Mail = require('../Model/mail')


const postMail = async (req,res)=>{
    try{
         await Mail.create({
            text:req.body.text,
            sender:req.user.email,
            receiver:req.body.receiver,
            unread:true
        })
        res.status(200).json({message:'Mail sent'})
    }catch(err){
        console.log(err)
        res.status(400).json({message:err})
    }
}
const getInbox = async (req,res) =>{
    try{
        const data = await Mail.findAll({where : {receiver:req.user.email}})
        // console.log(data)
        res.status(200).json({inbox:data})
    }catch(err){
        console.log(err)
        res.status(400).json({message:err})
    }

}
const putMail = async (req,res)=>{
    try{
        const id = req.params.id
        await Mail.update({unread:false},{where:{id:id}})
        res.status(200).json({message:'marked unread'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
}
const deleteMail =async (req,res) =>{
    try{
        const id =  req.params.id;
        await Mail.destroy({where:{id:id}})
        res.status(200).json({message:'mail deleted successfulyy'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
}
module.exports = {
    postMail,
    getInbox,
    putMail,
    deleteMail
}