const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = express.Router();
const port   = process.env.PORT || 3000 ;


app.use(bodyParser.json());
app.use(logger('dev'));
app.get("/",function (req,res){
    res.send("hello world!")
} )

// require('./routes')(router);
// app.use('/api/v1', router);

app.listen(port);

console.log(`App Runs on ${port}`);