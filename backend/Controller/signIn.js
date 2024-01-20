const User = require('../Model/user')
const bcrypt = require('bcrypt')

const postUserDetails = async (req,res) =>{
    try{
        let salts = 10;
        bcrypt.hash(req.body.password , salts ,async (err,hash)=>{
            if(err){
                throw new Error(err)
            }else{
                await User.create({email:req.body.email,password:hash})
            }
        })       
        res.status(201).json({message:'user created sucessfully'})
    }catch(err){
        res.status(500).json({error:err})
    }
}

module.exports = postUserDetails