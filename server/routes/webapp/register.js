const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
// require(path);
const det = require('../../schema');
const admin = require('../../adminschema');

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
                        designation: req.body.details.designation
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

mainRouter.route("/admin")
    .post((req, res, next) => {
        let adminUser = {
            email: req.body.admin_users.email,
            passwd: req.body.admin_users.passwd
        };
        var query = admin.find({ $and: [{ email: { $eq: req.body.admin_users.email } }, { passwd: { $eq: req.body.admin_users.passwd } }] });
        query.exec((err, someValue) => {
            if (err) {
                next(err);
            }
            else {
                console.log(someValue)
                if (someValue.length) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ "statusMessage": "Login Successful" });
                    
                }
                else{
                    res.status(401).send({error: 'Incorrect Credentials'});
                }

            }
        })


    })



module.exports = mainRouter;
