const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const user = require('../../DB/userSchema');
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();

mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/")
    .get((req, res) => {
        let query = user.find({});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json({users : data});
            }
        })
    });

module.exports = mainRouter;