const Account = require("../../model/Account")
const User = require("../../model/User");
const Transaction = require("../../model/Transaction");
const { AppErr } = require("../../utils/appError");

const createTransaction = async(req,res,next)=>{
    const {name , amount, notes , account, category, transactionType} = req.body;
    try {
        const userFound = await User.findById(req.user);
        if(!userFound){
            return next(new AppErr("User not found",404));
        }
        const accontFound = await Account.findById(account);
        if(!accontFound){
            return next(new AppErr("Account not found",404));
        }
        const transaction = await Transaction.create({
            name , amount, notes,transactionType,category,account, createdBy : req.user,
        })

        accontFound.transactions.push(transaction._id);
        await accontFound.save();

        res.json({status :"success",data : transaction});
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const getSingleTransaction = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const transaction = await Transaction.findById(id)
        res.status(200).json({
            status:"success",
            data : transaction
        })
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const getAllTransaction = async(req,res,next)=>{
    try {
        
        const transactions = await Transaction.find()
        res.status(200).json({
            status:"success",
            data : transactions
        });
    } catch (error) {
        next(new AppErr(error.message,500));;
    }    
};

const deleteTransaction = async(req,res,next)=>{
    try {
        const {id} = req.params;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({status :"success",data: null});
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
};

const updateTransaction =async(req,res,next)=>{
    try {
        const {id} = req.params;
        const transaction = await Transaction.findByIdAndUpdate(id,req.body , {new :true , runValidators:true}) 
        res.json({status : "success",data:transaction});
    } catch (error) {
        next(new AppErr(error.message,500));
    }    
} ;

module.exports = {
    createTransaction,
    getAllTransaction,
    getSingleTransaction,
    deleteTransaction,
    updateTransaction,
}