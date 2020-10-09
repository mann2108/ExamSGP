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
    .post((req, res) => {
        let body = req.body.users;
        
        var passwords = generator.generateMultiple(body.length, {
            length: 10,
            uppercase: true,
            numbers: true,
            symbols: true
        });
        
        let queryData  = [];
        let emails = [];
        for(let i=0;i<body.length;i++) {
            emails.push(body[i].email);
            queryData.push({
                "email" : body[i].email,
                "passwd" : passwords[i],
                "role" : body[i].role,
                "orgId" : body[i].orgId  
            });
        }
        user.collection.find({"email" : { $in: emails }}).count()
        .then((countUserExist) => {
            console.log(countUserExist);
            if(countUserExist===0) {
                user.collection.insertMany(queryData)
                .then(() => {
                    console.log("success");
                    res.status(200).json({"status" : "All Users Generated Successfully !"})
                })
                .catch((err) => {
                    console.log("error");   
                    res.status(200).json({"status" : "Server Side Error Occured !"})
                })
            } else {
                res.status(200).json({"status" :countUserExist+" user/users from the file already exist, please check and generate again after updating the files !"})
            }
        }).catch((err) => {
            res.status(500);
        });
    });


module.exports = mainRouter;