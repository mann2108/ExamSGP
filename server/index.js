const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
require("dotenv/config");
const connectDB = require('./DB/connections');
connectDB();
const details = require('./schema');
const registerRouter = require('./routes/webapp/register');

let uri = process.env.uri;
let port = process.env.port;

app.use(cors({
    origin: 'http://localhost:3000',
    // credentials: true,
})
);
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());


app.use("/", registerRouter);

app.listen(port, () => console.log("Example app listening on port ", port));