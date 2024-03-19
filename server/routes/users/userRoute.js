const express = require("express");
const { userRegistration, userLogin, userProfile, deleteUserProfile, updateUserProfile } = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");

const userRoute = express.Router();

userRoute.post("/register", userRegistration);

userRoute.post("/login" , userLogin);

userRoute.get("/profile/",isLogin,userProfile);

userRoute.delete("/",isLogin,deleteUserProfile);

userRoute.put("/",isLogin,updateUserProfile);




module.exports = userRoute;