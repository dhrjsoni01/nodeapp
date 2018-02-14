'use strict';
const express = require('express');
const router  = express.Router();
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

//secret
const config = require('../config/config.json');

//models
const user = require('../models/user');
//fuctions
const register  = require('../functions/register/user');
const login     = require('../functions/login/user');
const profile   = require('../functions/user/profile');
const checkToken= require('../functions/checktoken');
const verifyemail= require('../functions/user/verifyemail')

    router.get('/', (req, res) => res.end('Welcome to DKS node app ! '));

    router.post('/authenticate', (req, res) => {
        const credentials = auth(req);
        console.log(credentials);
        if (!credentials) {
            res.status(400).json({ message: 'Invalid Request !' });
        } else {
            login.loginUser(credentials.name, credentials.pass)
                .then(result => {
                    const token = jwt.sign(result, config.secret);
                    res.status(result.status).json({ message: result.message, token: token });
                })
                .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });

    router.post('/register', (req, res) => {

        console.log(req.body);

        const name      = req.body.name;
        const email     = req.body.email;
        const password  = req.body.password;
        const mobile    = req.body.mobile;

        if (!name || !email || !password || !mobile || !name.trim() || !email.trim() || !password.trim() || !mobile.trim() ) {
            console.log("invalid requestdue to insufficiant data in request");
            res.status(400).json({ message: 'Invalid Request !' });
        } else {
            register.registerUser(name, email, mobile, password)
                .then((result) => {
                    res.setHeader('Location', '/users/' + email);
                    res.status(result.status).json({ message: result.message })
                })
                .catch((err) => res.status(err.status).json({ message: err.message }));
        }
    });

    router.get('/profile/:id', (req, res) => {
                
        if (checkToken.check(req)) {

            profile.getProfile(req.params.id)

                .then(result => res.json(result))

                .catch(err => res.status(err.status).json({ message: err.message }));

        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }
    });

    router.get('/otpemail/:id',(req,res)=>{
        console.log(req.params.id);
        verifyemail.send(req.params.id)
        .then(result => {res.status(result.status).json({ message: result.message})})
        .catch(err => {res.status(err.status).json({ message: err.message})})
    })

    router.put('/otpemail/:id/:otp',(req,res)=>{
        console.log(req.params.id);
        verifyemail.verify(req.params.id,req.params.otp)
        .then(result => { res.status(result.status).json({ message: result.message }) })
        .catch(err => { res.status(err.status).json({ message: err.message }) })
    })

    // router.put('/users/:id', (req, res) => {

    //     if (checkToken(req)) {

    //         const oldPassword = req.body.password;
    //         const newPassword = req.body.newPassword;

    //         if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

    //             res.status(400).json({ message: 'Invalid Request !' });

    //         } else {

    //             password.changePassword(req.params.id, oldPassword, newPassword)

    //                 .then(result => res.status(result.status).json({ message: result.message }))

    //                 .catch(err => res.status(err.status).json({ message: err.message }));

    //         }
    //     } else {

    //         res.status(401).json({ message: 'Invalid Token !' });
    //     }
    // });

    // router.post('/users/:id/password', (req, res) => {

    //     const email = req.params.id;
    //     const token = req.body.token;
    //     const newPassword = req.body.password;

    //     if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

    //         password.resetPasswordInit(email)

    //             .then(result => res.status(result.status).json({ message: result.message }))

    //             .catch(err => res.status(err.status).json({ message: err.message }));

    //     } else {

    //         password.resetPasswordFinish(email, token, newPassword)

    //             .then(result => res.status(result.status).json({ message: result.message }))

    //             .catch(err => res.status(err.status).json({ message: err.message }));
    //     }
    // });

   
module.exports = router;