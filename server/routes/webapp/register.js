const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');

const det = require('../../DB/schema');
const user = require('../../DB/userSchema');
const { MongoClient } = require('mongodb');
const Cookies = require('js-cookie');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
require('dotenv/config');
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
                else {
                    res.status(401).send({ error: 'Incorrect Credentials' });
                }

            }
        })


    });

mainRouter.route("/dashboard")
    .get((req, res) => {
        // let cookie = Cookies.get()
        // console.log(cookie)
        det.find({ "status": "pending" })
            .then((values) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(values);
            })
            .catch((err) => res.status(503).send({ error: "Server Unable to Process Data" }));
    });

mainRouter.route("/accepted")
    .get((req, res) => {
        det.find({ "status": "accepted" })
            .then((values) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(values);
            })
            .catch((err) => res.status(503).send({ error: "Server Unable to Process Data" }));
    });

mainRouter.route("/rejected")
    .get((req, res) => {
        det.find({ "status": "rejected" })
            .then((values) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(values);
            })
            .catch((err) => res.status(503).send({ error: "Server Unable to Process Data" }));
    });

mainRouter.route("/confirmation")
    .post((req, res) => {
        let password = generator.generate({
            length: 10,
            uppercase: true,
            numbers: true,
            symbols: true
        });

        det.find({ "email": { $in: [req.body.details.email] } })
            .then(data => {
                console.log(data[0]._id)
                user.collection.find({ "email": { $in: [req.body.details.email] } }).count()
                    .then((countUserExist) => {
                        console.log(countUserExist);
                        if (countUserExist === 0) {
                            let queryData = [];
                            queryData.push({
                                "email": req.body.details.email,
                                "passwd": password,
                                "role": "admin",
                                "orgId": data[0]._id
                            });
                            user.collection.insertMany(queryData)
                                .then(() => {
                                    console.log("success");
                                    let transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: 'sgpexamination@gmail.com',
                                            pass: process.env.password
                                        }
                                    });
                                    let mailOptions = {
                                        from: 'sgpexamination@gmail.com',
                                        to: 'jeet3766@gmail.com',
                                        subject: 'Application Accepted',
                                        text: `Your Organization has been successfully registered with our service. Now you can create an exam paper with all sorts of functions which are avaiable with our system. Here is your temporary password ${password} & This is your Registered MailId from your Organization  ${req.body.details.email}`
                                    }
                                    transporter.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            console.log(err);
                                            res.statusCode = 502;
                                            res.send({ error: "Mail Not Sent" });
                                        }
                                        else {
                                            det.findOneAndUpdate({ email: req.body.details.email }, { $set: { status: "accepted" } }, { new: true }, (error, doc) => {
                                                if (error) {
                                                    res.statusCode = 501;
                                                    res.send({ error: "Failed to Update DB" })
                                                }
                                                else {
                                                    console.log('email sent ' + info.response)
                                                    res.statusCode = 200;
                                                    res.setHeader('Content-Type', 'text/plain');
                                                    res.json({ "statusMessage": "Mail Sent Successfully" });
                                                }
                                            })

                                        }
                                    })
                                })
                                .catch((err) => {
                                    console.log("error");
                                    res.status(500).send({error : "Server Side Error Occured !" })
                                })
                        } else {
                            res.status(200).json({ "statusMessage": "Organization with this email id already exists.." })
                        }
                    });
            })
            .catch(err => res.status(500).send({ error: "Server Side Error Occured !" }))


    });

mainRouter.route("/rejection")
    .post((req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sgpexamination@gmail.com',
                pass: process.env.password
            }
        });
        let mailOptions = {
            from: 'sgpexamination@gmail.com',
            to: 'jeet3766@gmail.com',
            subject: 'Application Rejected',
            text: `Your application has been Rejected. It may be due to multiple user logins registered or may be due any incorrect documents submitted. For any further guidance mail us at sgpexamination@gmail.com`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.statusCode = 502;
                res.send({ error: "Mail Not Sent" });
            }
            else {
                det.findOneAndUpdate({ email: req.body.details.email }, { $set: { status: "rejected" } }, { new: true }, (error, doc) => {
                    if (error) {
                        res.statusCode = 501;
                        res.send({ error: "Failed to Update DB" })
                    }
                    else {
                        console.log('email sent ' + info.response)
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.json({ "statusMessage": "Mail Sent Successfully" });
                    }
                })

            }
        })

    });

module.exports = mainRouter;

