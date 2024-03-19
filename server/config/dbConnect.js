const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database Connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
