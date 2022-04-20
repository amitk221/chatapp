const Users = require('../../Models/user/userModels')
const mongoose = require('mongoose');

const auth = require("../../middleware/auth");
var jwt = require('jsonwebtoken');
// login 
const login = async (req ,res)=>{
    const { email, password } = req.body;
    try{
     
       let user= await Users.findOne({email:email});


        if(user.password === password){
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
        
              // save user token
              user.token = token;
              await user.save()
            res.cookie("jwt" , token , {httpOnly:true , secure:true , maxAge: 2*60*60*1000})
            res.status(200).jsonp({
                status:"Success",
                message: "Successfull Logined!", 
                data: user, 
                token:token
            })
        } else{
            res.status(401).jsonp({
                status:"Unauthorized",
                message: "Please provide correct email and password!", 
                data: []
            })
        }

    } catch(err){
        console.log("ll" ,err);
        res.status(400).jsonp({
            status:"failed",
            message: "Something went wrong!", 
            data: []
        })
    }
} 

// signup
const signUp = async (req ,res)=>{
    try{
       // console.log(req.body);
        // console.log("ll");
         const { username, email, password } = req.body;
        const user = new Users({
            username : username,
            email : email,
            password  : password
          });
        let userRegistered =await user.save(); 
        const token = jwt.sign(
            { user_id: userRegistered._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          userRegistered.token = token;
          userRegistered = await userRegistered.save(); 
            res.cookie("jwt" , token , {httpOnly:true , secure:true , maxAge: 2*60*60*1000})
        res.status(201).jsonp({
            status:"success",
            message: "Successfull created", 
            data: userRegistered
        })

    } catch(err) {
        console.log("ll" ,err);
        res.status(400).jsonp({
            status:"failed",
            message: "Something went wrong!", 
            data: []
        })
    }
   
} 



module.exports = {
    login, 
    signUp
}