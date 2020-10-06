const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let detailSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    photo: {
        type: String, 
        required: true
    },
    id: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    idName: {
        type: String,
        required: true
    },
    photoName: {
        type: String,
        required: true
    },
    status: {
        type: String, 
        default: "pending"
    }
});

let details = mongoose.model('admindetail', detailSchema);

module.exports = details;