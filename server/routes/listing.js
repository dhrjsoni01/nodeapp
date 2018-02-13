'use strict';
const express = require('express');
const router = express.Router();

//models 
const user =  require('../models/user');

//functions
const addlisting = require('../functions/register/listing')
const checkToken = require('../functions/checktoken')

//to register a listing 
router.put('/:id/createlisting', (req, res) => {
    console.log(req.params.id);
    
        if (checkToken.check(req)) {
            console.log(req.params.id);
            
            addlisting.registerlisting( req.params.id,
                                        req.body.job,
                                        req.body.category,
                                        req.body.rate,
                                        req.body.description,
                                        req.body.age,
                                        req.body.experience,
                                        req.body.agency,
                                        req.body.locationname,
                                        req.body.city,
                                        req.body.state,
                                        req.body.pincode,
                                        req.body.lat,
                                        req.body.long
                                        )

            .then(result => res.status(result.status).json({ message: result.message }))
            .catch(err => res.status(err.status).json({ message: err.message }))
        }else{
            // token is not valid
            res.status(401).json({ message: 'Invalid Token !' });
        }
});
module.exports = router;