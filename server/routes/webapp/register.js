const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
// require(path);
const det = require('../../schema');
const user = require('../../adminschema');
const { MongoClient } = require('mongodb');
const Cookies = require('js-cookie');

const mainRouter = express.Router();

mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/signup")
    .post((req, res, next) => {
        det.countDocuments({ email: req.body.details.email }, (err, cnt) => {
            if (err) {
                console.log(err);
            }
            else {
                if (cnt) {
                    res.status(422).json({ error: "Email Already Exist." });
                }
                else {
                    const details = new det({
                        firstname: req.body.details.firstname,
                        lastname: req.body.details.lastname,
                        email: req.body.details.email,
                        id: req.body.details.id,
                        photo: req.body.details.photo,
                        university: req.body.details.university,
                        designation: req.body.details.designation,
                        idName: req.body.details.idName,
                        photoName: req.body.details.photoName
                    });
                    det.create(details)
                        // details.save()
                        .then((detail) => {
                            console.log("Details entered into Database");
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.json({ "statusMessage": "Details Has Been Sent To The Admin. Further Instructions Will Sent To Given Mail Id.." });
                        })
                        .catch((err) => next(err));
                }
            }
        });
    });

mainRouter.route("/signin")
    .post((req, res, next) => {
        let adminUser = {
            email: req.body.admin_users.email,
            passwd: req.body.admin_users.passwd
        };
        var query = user.find({ $and: [{ email: { $eq: req.body.admin_users.email } }, { passwd: { $eq: req.body.admin_users.passwd } }] });
        query.exec((err, someValue) => {
            if (err) {
                next(err);
            }
            else {
                
                if (someValue.length) {
                    console.log(someValue[0].role)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ "statusMessage": "Login Successful", "role": someValue[0].role });
                    
                }
                else{
                    res.status(401).send({error: 'Incorrect Credentials'});
                }

            }
        })


    })

mainRouter.route("/dashboard")
.get((req, res) => {
    let cookie = Cookies.get()
    console.log(cookie)
    det.find({"status": "pending"})
    .then((values) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(values);
    })
    .catch((err) => res.status(503).send({error: "Server Unable to Process Data"}));
})

mainRouter.route("/accepted")
.get((req, res) => {
    det.find({"status": "accepted"})
    .then((values) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(values);
    })
    .catch((err) => res.status(503).send({error: "Server Unable to Process Data"}));
})

mainRouter.route("/confirmation")
.post((req, res) => {
    
})

module.exports = mainRouter;
