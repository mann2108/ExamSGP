const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/connection");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT;

app.get("/",(req,res,next) => {
    res.send("Helloo");
});
app.listen(Port, () => console.log("Server Started"));
