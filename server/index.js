const express = require('express');
const request = require('request');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv/config");
const details = require('./schema');

let uri = process.env.uri

const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    // credentials: true,
})
);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB Connected...")
})
.catch(err => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());

let final_details = [];

// var db = mongoose.connection;
details.find({})
.then((val) => {
    console.log(val);
})
.catch(err => console.log(err));

app.post('/signup', (req, res) => {
    // console.log(req.body.details);
    const details = new detailSchema({
        firstname: req.body.details.firstname,
        lastname: req.body.details.lastname,
        email: req.body.details.email,
        id: req.body.details.id,
        photo: req.body.details.photo,
        university: req.body.details.university,
        designation: req.body.details.designation
    });
    // db.collection('adminDetails').insertOne(details)
    details.save()
        .then((detail) => {
            console.log("Details entered into Database");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json({ "statusMessage": "Details Has Been Sent To The Admin. Further Instructions Will Sent To Given Mail Id.." });
        })
        .catch((err) => res.status(501).json({ "errMsg": err.message }));

    // res.statusCode = 200;

    // res.json(final_details);


})

app.listen(port, () => console.log("Example app listening on port ", port));