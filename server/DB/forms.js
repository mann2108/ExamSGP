const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userForms = new Schema({
    email : {
        type: String,
        required:true
    },
    exam: {
        type: Array
    },
    
});

let Forms = mongoose.model('form', userForms);

module.exports = Forms;
