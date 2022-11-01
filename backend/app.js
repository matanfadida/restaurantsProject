const path = require('path');

const adminRouts = require('./routes/admin');
const shopRouts = require('./routes/shop');
const mongodbConnect = require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res) => {});
// app.use('/admin',adminRouts);
// app.use(shopRouts);

mongodbConnect((client) => {
    console.log(client);
    app.listen(3000);
});
