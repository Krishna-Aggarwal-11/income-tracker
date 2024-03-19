const jwt = require("jsonwebtoken");

const verifyToken = token =>{
    return jwt.verify(token , "anykey",(err,decoded)=>{
        if (err) {
            return "Token is not valid";
        }else{
            return decoded ;
        }
    });
};

module.exports = verifyToken;