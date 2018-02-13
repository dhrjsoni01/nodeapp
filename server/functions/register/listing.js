'use strict';

const user = require('../../models/user');

exports.registerlisting = (   email,
                                 job, 
                                 category, 
                                 rate, 
                                 description, 
                                 age, 
                                 experience, 
                                 agency, 
                                 locationname, 
                                 city, 
                                 state, 
                                 pincode, 
                                 lat, 
                                 long )=>{
    return  new Promise((resolve, reject)=>{
        user.find({ email: email })
            .then((users)=>{
                if (users.length==0) {
                    reject({ status: 404, message: 'User Not Found !' });
                }else{
                    return users[0];
                }
            }).then((user) =>{
                console.log(user);
                
                user.job = job;
                user.category = category;
                user.rate = rate;
                user.description = description;
                user.age = age;
                user.experience = experience;
                user.agency = agency;
                user.address.name = locationname;
                user.address.city = city;
                user.address.state = state;
                user.address.pincode = pincode;
                user.location.lat = lat;
                user.location.long = long;
                //enable listing
                user.listingOn = true;

                return user.save();
            })
            .then(user => resolve({ status: 200, message: 'listing is created sucessfully' }))
            .catch(err => {
                reject({ status: 500, message: 'Internal Server Error !' })
                console.log(err);
            })
    });
}