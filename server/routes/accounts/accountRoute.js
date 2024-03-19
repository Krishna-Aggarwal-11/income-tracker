const express = require("express");
const { createAccount, getAllAccount, getSingleAccount, deleteAccount, updateAccount } = require("../../controllers/accounts/accountCtrl");
const isLogin = require("../../middlewares/isLogin");

const accountRoute = express.Router();


accountRoute.post("/",isLogin,createAccount);

accountRoute.get("/",getAllAccount);

accountRoute.get("/:id",getSingleAccount);

accountRoute.delete("/:id",deleteAccount);

accountRoute.put("/:id",updateAccount);





module.exports = accountRoute;