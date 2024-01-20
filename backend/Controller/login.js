const User = require('../Model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 
function generateAccessToken(id,email){
    return jwt.sign({id:id,email:email},process.env.SECRET_TOKEN)
}

const loginPost = async (req,res,next) =>{
    try{
        const user = await User.findAll({where:{email:req.body.email}})
        if(user===undefined || user.length===0){
            res.status(404).json({message:'User doesnot exist'})
        }else{
            bcrypt.compare(req.body.password , user[0].password,(err,result)=>{
                if(err){
                    throw new Error(err)
                }else{
                    if(result){
                        res.status(200).json({message: 'user logged in successfully',token:generateAccessToken(user[0].id,user[0].email)})
                    }else{
                        res.status(201).json({message:'incorrect password'})
                    }
                }
            })  
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
}

module.exports = loginPost