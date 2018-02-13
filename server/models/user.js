'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({

    name: {
        first   :  {type: String, required: true },
        middle  :  String,
        last    :  {type: String, required: true },
    },
    agency      : String,
    email       : { type: String, unique: true },
    mobile      : { type: String, unique: true },
    created_at  : { type: Date, default: Date.now},
    listingOn   : { type: Boolean, default: false},
    job         : String,
    gender      : String,
    category    : String,
    tags        : [String],
    discription : String,
    rate        : String,
    age         : String,
    rating      : String,
    comments    : [{
                    rating  : String,
                    comment : String,
                    user    : String
    }],
    experience  : String,
    temp_str    : String,
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
    },
    varify      :{
                    mobile  : { type: Boolean, default: false},
                    email   : { type: Boolean, default: false}
    }
});

module.exports = mongoose.model('user', userSchema);  