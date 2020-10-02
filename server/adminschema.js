const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let adminschema = new Schema({
    email: {
        type: String,
        required:true
    },
    passwd: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

let admin = mongoose.model('user', adminschema);

module.exports = admin;