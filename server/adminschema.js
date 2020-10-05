const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
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

let user = mongoose.model('user', userSchema);

module.exports = user;
