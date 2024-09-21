const express = require("express");
const { createTransaction, getAllTransaction, getSingleTransaction, deleteTransaction, updateTransaction } = require("../../controllers/transactions/transactionCtrl");
const isLogin = require("../../middlewares/isLogin");

const transactionRoute = express.Router();


transactionRoute.post("/",isLogin,createTransaction);
transactionRoute.get("/",getAllTransaction);
transactionRoute.get("/:id",getSingleTransaction);
transactionRoute.delete("/:id",deleteTransaction);
transactionRoute.put("/:id",updateTransaction);

module.exports = transactionRoute;