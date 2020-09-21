const mongoose = require('mongoose');
require('dotenv/config');

const connectDB = async() => {
    await mongoose.connect(process.env.uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useCreateIndex: true,
    });
    console.log("MongoDB Connection done Successfully...");
}

module.exports = connectDB;