const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const {AppErr , appErr} = require("../../utils/appError");
const generateToken = require("../../utils/generateToken")
const verifyToken = require("../../utils/verifyToken");

const userRegistration = async(req,res,next)=>{
    const {fullname , password , email} = req.body

    try {
        //if email exit
        const userFound = await User.findOne({email});
        if (userFound) {
           return next(new AppErr("User Already Exits",400));
        }
        //hash password
        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        //create user 
        const user = await User.create({
            fullname,
            email,
            password : hashedPassword
        });
        res.json({
            status : "success",
            fullname : user.fullname,
            email : user.email ,
            id : user._id
        });
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const userLogin = async(req,res,next)=>{
    const {password , email} = req.body
    try {
        //check if email exit 
        const userFound = await User.findOne({email});
        if (!userFound) {
            return next(new AppErr("Invalid login credentials .",400));
        }

        //check password validity 
        const isPassowrdMatch = await bcrypt.compare(password , userFound.password);
        if (!isPassowrdMatch) {
            return next(new AppErr("Invalid login credentials .",400));
        };
        res.json({status : " success",fullname : userFound.fullname , id : userFound._id ,
        token : generateToken(userFound._id)
    });
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const userProfile = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user).populate({path : "accounts",populate :{
            path : "transactions","model " : "Transaction"
        }})
        res.json(user);
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const deleteUserProfile = async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.user);
        res.status(200).json({status :200 , data :null});
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const updateUserProfile = async(req,res,next)=>{
    try {
        //if email exit
        if (req.body.email) {
            const userFound = await User.findOne({email: req.body.email});
        if (userFound) {
           return next(new AppErr("Email Already Taken",400));
        }
        }
        

        // chceck if user is updating passaword
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , salt);
            const user = await User.findByIdAndUpdate(
                req.user,{password : hashedPassword},{new: true , runValidators:true}
            );
            return res.status(200).json({status : "success" , data :user })
        }

        const user = await User.findByIdAndUpdate(req.user , req.body , {new: true , runValidators:true})
        res.status(200).json({status : "success" , data :user })
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

module.exports = {
    userRegistration ,
    userLogin,
    userProfile,
    deleteUserProfile,
    updateUserProfile,

};

