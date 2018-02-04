'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const db     = require("../config/db.json")

const userSchema = mongoose.Schema({

    name: {
        first   :  {type:string,  required: true },
        middle  :  string,
        last    :  {type: string, required: true },
    },
    email       : { type: String, unique: true },
    mobile      : { type: String, unique: true },
    created_at  : { type: Date, default: Date.now},
    listing     : { type: Boolean, default: false},
    job         : String,
    category    : String,
    tags        : [String],
    rate        : String,
    age         : String,
    rating      : String,
    comments    : [{
                    rating  : String,
                    comment : String,
                    user    : String
    }]
    experience  : String,
    token       : String,
    password    : { type: String, required: true},
    address     : {
                    name    : String,
                    city    : String,
                    state   : String,
                    pincode : String
    },
    location    : {
                    lat     : String,
                    long    : String
    }
});

// mongoose.Promise = global.Promise;
// mongoose.connect(db.db);

module.exports = mongoose.model('user', userSchema);  