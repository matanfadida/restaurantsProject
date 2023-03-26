const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRouts = require('./routes/admin');
const shopRouts = require('./routes/shop');
const shefRouts = require('./routes/chef');
const authRouts = require('./routes/auth');
const mongodbConnect = require('./util/database').mongodbConnect;

const app = express();
const store = new MongoDBStore({
    uri:"mongodb+srv://matanfadida:OoJFchkVZajEpF21@cluster0.v7qxqtj.mongodb.net/restaurnt",
    collection: "sessions"
});

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));
const port = process.env.PORT || 5000;
app.use('/api/admin',adminRouts);
app.use('/api/chef', shefRouts);
app.use('/api/auth', authRouts);
app.use(shopRouts);

mongodbConnect((client) => {
    app.listen(port);
});
