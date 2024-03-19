const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true,
    },
    accountType : {
        type : String ,
        enum : [
            "Saving",
            "Investment",
            "Checking",
            "Credit Card",
            "Building",
            "School",
            "Project",
            "Utilities",
            "Travel",
            "Personal",
            "Groceries",
            "Enterainment",
            "Loan",
            "Uncategorized",
        ],
        required :true
    },

    initialBalance : {
        type : Number ,
        default : 0,
    },
    transactions : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transaction"
        },
    ],
    createdBy : {
        type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    notes : {
        type : String,
        required : true 
    }

    },
    {
        timestamps : true ,
        toJSON:{virtuals : true},
    }
);

const Account = mongoose.model("Account",AccountSchema);

module.exports = Account ;