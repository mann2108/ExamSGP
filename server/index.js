const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
require("dotenv/config");
const connectDB = require('./DB/connections');
connectDB();
const details = require('./DB/schema');
const registerRouter = require('./routes/webapp/register');
const addUsersRouter = require('./routes/desktopApp/addUsers');
const getUsersRouter = require('./routes/desktopApp/getUsers');
let uri = process.env.uri;
let port = process.env.port;

app.use(cors({
    origin: 'http://localhost:3000',
    // credentials: true,
    })
);

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb' }));
app.use(express.urlencoded({limit: '10mb', extended: false }));
app.use(express.json());

app.use("/", registerRouter);
app.use("/addUser",addUsersRouter);
app.use("/getUsers", getUsersRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({error:{
        message: error.message
    }});
});

  

app.listen(port, () => console.log("Example app listening on port ", port));