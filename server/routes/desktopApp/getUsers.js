const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const user = require('../../DB/userSchema');
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();

mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/faculties")
    .get((req, res) => {
        let query = user.find({"role" : "faculty"});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json({users : data});
            }
        })
    });
mainRouter.route("/students")
.get((req, res) => {
    let query = user.find({"role" : "student"});
    query.exec((err,data) => {
        if(err) {
            res.status(500);
        } else {
            res.status(200).json({users : data});
        }
    })
});
mainRouter.route("/admins")
    .get((req, res) => {
        let query = user.find({"role" : "admin"});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json({users : data});
            }
        })
    });

module.exports = mainRouter;