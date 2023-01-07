const express = require("express");
const User = require("./model/User");

const router = express.Router();
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async function (req,res,next){
    try{
        const{authorization}= req.headers
        if(!authorization || authorization=="Bearer null"){
            return res.json({error:"Please Login First"})
        }

        let token = authorization.replace("Bearer", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.user = await User.findById(decoded._id)
        next()
    }
    catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}