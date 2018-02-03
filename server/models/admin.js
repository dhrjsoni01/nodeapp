'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = mongoose.Schema({

    name: {
        first: { type: string, required: true },
        middle: string,
        last: { type: string, required: true },
    },
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    token: String,
    password: { type: String, required: true },

});

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/node-login');

module.exports = mongoose.model('admin', adminSchema);  