const path = require('path');

const adminRouts = require('./routes/admin');
const shopRouts = require('./routes/shop');
const shefRouts = require('./routes/chef');
const mongodbConnect = require('./util/database').mongodbConnect;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin',adminRouts);
app.use('/shef', shefRouts);
app.use(shopRouts);

mongodbConnect((client) => {
    console.log(client);
    app.listen(5000);
});
//chack