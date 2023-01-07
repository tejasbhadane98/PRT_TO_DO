const express = require("express");
const User = require("../model/User");

const router = express.Router();
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const {body, validationResult}= require("express-validator");
const brcypt = require("bcrypt")

router.post("/signUp",
        body('email').isEmail(),
        body('password').isLength({min:8 , max:16 }),async(req,res)=>{
    try{
        let{email, password, confirmpassword}= req.body;
        let user = await User.findOne({email})
        if(user){
            return res.json({error:"User Already Registered"})
        };

        if(password !==confirmpassword){
            return res.json({error:"Password and Confirm Password Does not match"})
        }

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:"Minimum length of password Should be 8"})
        }

        brcypt.hash(password, 10, async function(err, hash){
            if(err){
                return res.status(500).json({
                    status:"Failed",
                    message:err.message
                })
            }
            user = await User.create({
                email:email,
                password:hash
            })
            res.json({user, message:"Account Created"});
            
        })
        
    }
    catch(err){
        res.json({
            message:err.message
        })

    }
} )


router.post("/signIn",async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:"Email is not Valid"})
        }

        let {email, password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.json({
                error:"User Does Not Exists"
            })
        }
        brcypt.compare(password,user.password, function(err, result){
            if(err){
                return res.status(500).json({
                    status:"Failed",
                    message:err.message
                })
            }
            if(result){
                const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
                res.json({
                    user,token,message:"Logged in Succesfully"
                })
            }
            else{
                if(password!=user.password){
                    return  res.status(405).json({
                        error:"Incorrect Password"
                    })
                }
            }
            
            
        })
    }
    catch(err){
        res.json({
            message:err.message
        })

    }
} )

module.exports = router;