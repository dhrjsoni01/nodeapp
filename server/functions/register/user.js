'use strict';

const user = require('../../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (name, email, mobile, password) =>{

   return new Promise((resolve, reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        var splitname = name.split(" ");
        const mname = "";
        var len = splitname.length;
        console.log(len);
        console.log(len-1);
        
        if (splitname.length>3) {
            mname = splitname[1]+" "+ splitname[2]
        }else if (splitname.length==3) {
            mname = splitname[1]
        }


        const newUser = new user({
            name:{
                first   : splitname[0],
                middle  : mname,
                last    : splitname[len-1]
            },
            email       : email,
            mobile      : mobile,
            password    : hash
        });

        newUser.save()

            .then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 409, message: 'User Already Registered !' });

                } else {

                    reject({ status: 500, message: 'Internal Server Error !'+err });
                }
            });
    });
}