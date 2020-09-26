const mongoose = require("mongoose");
require("dotenv/config");

const connectDB = async () => {
    await mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Db connected ...");
}

module.exports = connectDB; 
