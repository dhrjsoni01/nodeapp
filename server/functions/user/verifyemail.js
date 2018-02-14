//dependency
const nodemailer = require('nodemailer')
const randomstring = require('randomstring')
const config       = require('../../config/config.json')

//models
const user = require('../../models/user')
exports.send = (email)=>{
    return new Promise((resolve,reject)=>{
        const otp = randomstring.generate({
            length: 6,
            charset: "alphabetic"
        });
        console.log(otp);
        user.find({ email: email })
            .then(users => {
                if (users.length == 0) {
                    reject({ status: 404, message: 'User Not Found !' });
                } else {
                    return users[0];
                }
            })
            .then(user => {     
                user.temp_str = otp
                return user.save();
            })
            .then(user=>{
                var transpoter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: config.email,
                        pass: config.pass
                    }
                });
                const mailOptions = {
                    from: config.email,
                    to: email,
                    subject: 'Subject of your email',
                    html: `<p> hey ${user.name},Your html here ${otp}</p>`
                };
                return transpoter.sendMail(mailOptions)
            })
            .then(info => {

                console.log(info);
                resolve({ status: 200, message: 'Check mail for instructions' })
            })
            .catch(err => {

                console.log(err);
                reject({ status: 500, message: 'Internal Server Error !' });

            });
    });
}
exports.verify = (email,otp)=>{
    return new Promise((resolve, reject) =>{
    user.find({ email: email })
        .then(users => {
        if (users.length == 0) {
            reject({ status: 404, message: 'User Not Found !' });
        } else {
            return users[0];
        }
    })
    .then(user => {
        if (otp == user.temp_str) {
                user.temp_str = "";
                user.verify.email = true;
                return user.save();
        }else{
                reject({ status: 401, message: 'Invalid otp' });
        }
    }).then(user =>{
            resolve({ status: 200, message: 'email verified' })
    })
    .catch(err => {
            console.log(err);
            reject({ status: 500, message: 'Internal Server Error !' });
        });
    });
}
   