const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
// require(path);
const det = require('../../schema');
const path = require('path');

const mainRouter = express.Router();

mainRouter.use(bodyParser.json());

var db = mongoose.connection;



mainRouter.route("/signup")
    .post((req, res) => {
        det.countDocuments({ email: req.body.details.email }, (err, cnt) => {
            if (err) {
                console.log(err);
            }
            else {
                if (cnt) {
                    return res.json({"statusMessage": "Email Already Exist."})
                }
            }
        });


        
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
            .catch((err) => res.status(501).json({ "statusMessage": err.message }));
    });

module.exports = mainRouter;
