const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const user = require('../../DB/userSchema');
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();
const det = require('../../DB/schema');
mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/")
    .post((req, res) => {
        let body = req.body.email;
        emails = [body];
        var query = user.find({ $and: [{ email: { $eq: body } }] });
        query.exec((err, someValue) => {
            if (err) {
                res.status(500);
            }
            else {
                if (someValue.length) {
                    console.log(someValue[0].orgId)
                    res.status(200).json({code : 1, status: 'User found with email', orgId : someValue[0].orgId});
                }
                else {
                    res.status(200).json({code : 2, status: 'No data with that email exist'});
                }
            }
        });
    });


module.exports = mainRouter;