const express = require('express');
const bodyParser = require('body-parser');

const adminRouts = require('./routes/admin');
const shopRouts = require('./routes/shop');
const shefRouts = require('./routes/chef');
const mongodbConnect = require('./util/database').mongodbConnect;

const app = express();

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
app.use('/api/admin',adminRouts);
app.use('/api/shef', shefRouts);
app.use(shopRouts);

mongodbConnect((client) => {
    app.listen(port);
});
