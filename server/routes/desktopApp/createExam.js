const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const forms = require('../../DB/forms');
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();
const nodemailer = require('nodemailer');
mainRouter.use(bodyParser.json());
require('dotenv/config');
var db = mongoose.connection;

mainRouter.route("/")
    .post((req, res) => {
        let body = req.body.users;
        try {
            for(let i=0;i<body.length;i++) {
                var data = {"formLink" : body[i].formLink, "subjectName" : body[i].subjectName, "examDate" : body[i].examDate, "examDuration" : body[i].examDuration, "examDescription" : body[i].examDescription};
                forms.findOneAndUpdate(
                    { email: body[i].email }, 
                    { $push: { exam: data } },
                ).then((data) => {
                    console.log(data);
                }).catch((err) => {
                    console.log(err);
                });
            }
            res.status(200).json({"status" : "Exam created !"});
        } catch(err) {
            res.status(500);
        }
    });
module.exports = mainRouter;