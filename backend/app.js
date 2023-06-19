const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');
const nodemailer = require('nodemailer');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const shefRoutes = require('./routes/chef');
const authRoutes = require('./routes/auth');
const detailsRoutes = require('./routes/details');
const categoryRoutes = require('./routes/category');
const mongodbConnect = require('./util/database').mongodbConnect;

const app = express();
const store = new MongoDBStore({
    uri:"mongodb+srv://matanfadida:OoJFchkVZajEpF21@cluster0.v7qxqtj.mongodb.net/restaurnt",
    collection: "sessions"
});


app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this domain
  }));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));
const port = process.env.PORT || 5000;
app.use('/api/admin',adminRoutes);
app.use('/api/chef', shefRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/details', detailsRoutes);
app.use(shopRoutes);


mongodbConnect((client) => {
  const server = http.createServer(app);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'matantestweb@gmail.com',
      pass: 'qxcuyudifmnifhas'
    }
  });
  app.set('transporter', transporter);
  
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  app.set('io', io);

  server.listen(port, () => console.log(`Server started on port ${port}`));
});

module.exports = app;