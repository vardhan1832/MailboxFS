const User = require('../Model/user');
const jwt = require('jsonwebtoken')


const authentication = async (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        //const row = localStorage.getItem('row')
        const userobj = jwt.verify(token , process.env.SECRET_TOKEN)
        const user = await User.findByPk(userobj.id);
        if(user){
            req.user = user;
            next();
        }else{
            throw new Error('something went wrong')
        }
    }catch(err){
        console.log(err)
        res.status(401).json({message: err, success: false})
    }
}

module.exports =  authentication