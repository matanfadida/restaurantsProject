const path = require('path');

const adminRouts = require('./routes/admin');
const shopRouts = require('./routes/shop');
const shefRouts = require('./routes/chef');
const mongodbConnect = require('./util/database').mongodbConnect;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
app.use('/admin',adminRouts);
app.use('/shef', shefRouts);
app.use(shopRouts);

console.log('listen ', port)
    app.listen(port);

// mongodbConnect((client) => {
//     console.log('listen ', )
//     app.listen();
// });
//chack