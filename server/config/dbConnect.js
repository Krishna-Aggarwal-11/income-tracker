const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://income_tracker:83zb6.iWfS*YZj9@cluster.fpxxlvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster");
    console.log("Database Connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
