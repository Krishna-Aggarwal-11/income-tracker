const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname : {
        type : String ,
        required : true,
    },
    email : {
        type : String ,
        required : true,
    },
    password : {
        type : String ,
        required : true,
    },
    hasCreatedAccount : {
        type : Boolean ,
        default : false,
    },
    accounts : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Account"
        },
    ],
    },{
        timestamps : true ,
        toJSON:{virtuals : true},
    }
);

const User = mongoose.model("User",UserSchema);

module.exports = User ;