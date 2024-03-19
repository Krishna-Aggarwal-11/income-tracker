const express = require("express");
const cors = require("cors");
require("./config/dbConnect");
const userRoute = require("./routes/users/userRoute");
const transactionRoute = require("./routes/transactions/transactionRoute");
const accountRoute = require("./routes/accounts/accountRoute");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();

//middlewares
app.use(express.json()) //pass incoming data
app.use(cors());

//routes
app.use("/api/v1/users/",userRoute) ;

app.use("/api/v1/transactions/",transactionRoute) ;

app.use("/api/v1/accounts/",accountRoute) ;


//Error handlers 
app.use(globalErrorHandler);

//listen to serevr

const PORT = process.env.PORT || 9000 ;
app.listen(PORT , console.log(`Server is sup and running on port ${PORT}`));
