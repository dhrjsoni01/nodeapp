const config  = require('../config/config.json');
const jwt     = require('jsonwebtoken')
exports.check=(req) =>{
    const token = req.headers['x-access-token'];
    console.log(token);
    console.log(config.secret);
    
    if (token) {
        try {
            var decoded = jwt.verify(token, config.secret);
            return decoded.message === req.params.id;
        } catch (err) {
            console.log(err);            
            return false;
        }
    } else {
        return false;
    }
}