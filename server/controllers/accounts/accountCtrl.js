const User = require("../../model/User");
const Account = require("../../model/Account");
const { AppErr } = require("../../utils/appError");

const createAccount = async(req,res,next)=>{
    const {name  , accountType ,initialBalance,notes} = req.body
    try {
        const userFound = await User.findById(req.user);
        if(!userFound){
            return next(new AppErr("User not found",404));
        }
        const account = await Account.create({
            name ,initialBalance , accountType , notes , createdBy : req.user,
        });
        userFound.accounts.push(account._id);
        await userFound.save();

        res.json({status :"success",data : account});
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
} ;

const getSingleAccount = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const account = await Account.findById(id).populate("transactions") 
        res.status(200).json({
            status:"success",
            data : account
        })
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
} ;

const getAllAccount = async(req,res,next)=>{
    try {
        const accounts = await Account.find().populate("transactions");
        res.json(accounts);
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
} ;

const deleteAccount =  async(req,res,next)=>{
    try {
        const {id} = req.params;
        await Account.findByIdAndDelete(id);
        res.status(200).json({status :"success",data: null});
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const updateAccount = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const account = await Account.findByIdAndUpdate(id,req.body , {new :true , runValidators:true}) 
        res.json({status : "success",data:account});
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
} ;

module.exports = {
    createAccount,
    getSingleAccount,
    getAllAccount,
    deleteAccount,
    updateAccount,
}
