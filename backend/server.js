const express = require("express");
const app = express();

// sets up our graphql server
const graphqlHTTP = require('express-graphql')
// grabs buildSchema method from graphql, this will help us build out our schema
const { buildSchema } = require('graphql')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config({ path: '.env' });
const Chatkit = require('@pusher/chatkit-server');
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware');
const secret = 'mysecretsshhh';


//var User = require('mongoose').model('User');


var index = require('./routes/index');


const schema = require("./schema");


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mattbloem:sp1k3123@cluster0-foley.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
  
//   if(err) return console.log(err)
//   console.log('connected to mongodb')
//   const collection = client.db("ccMember").collection("members");
//   // perform actions on the collection object
//   client.close();
// });



const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mattbloem:sp1k3123@cluster0-foley.mongodb.net/ccMember?retryWrites=true&w=majority')

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

const chatkit = new Chatkit.default({
      instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
      key: process.env.CHATKIT_SECRET_KEY,
    });

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', index);

app.post('/users', (req, res) => {
  const { userId } = req.body;

  chatkit
    .createUser({
      id: userId,
      name: userId,
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        console.log(`User already exists: ${userId}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });
});

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
});

app.post('/api/authenticate', function(req, res) { 
          const { username } = req.body.username.data.login
          const payload = { username };

          console.log(payload)
          // Issue token
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          console.log(token)
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

// app.post('/api/register', function(req, res) {
//   const { username, email, password } = req.body;
//   const user = new User({ username, email, password });
//   user.save(function(err) {
//     if (err) {
//       res.status(500)
//         .send("Error registering new user please try again.");
//     } else {
//       res.status(200).send("Welcome to the club!");
//     }
//   });
// });

const PORT = 5000;
app.listen(PORT, () => {
console.log("server is running");
});

module.exports = app;


