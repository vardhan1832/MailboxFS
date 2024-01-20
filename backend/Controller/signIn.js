const User = require('../Model/user')
const postUserDetails = async (req,res) =>{
    try{
        await User.create({email:req.body.email,password:req.body.password})
        res.status(201).json({message:'user created sucessfully'})
    }catch(err){
        res.status(500).json({error:err})
    }
}

module.exports = postUserDetails