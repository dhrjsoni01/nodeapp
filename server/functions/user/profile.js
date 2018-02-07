'use strict';
const user = require('../../models/user');
exports.getProfile = email =>
    new Promise((resolve, reject) => {

        user.find({ email: email },{password:0,_id:0,comments:0,varify:0,tags:0})
            .then(users => resolve(users[0]))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });