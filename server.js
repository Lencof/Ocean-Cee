const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// MongoDB
const MongoDBURI = process.env.MONGO_URI || 'mongodb+srv://Adriol:Qmozet!jhdsfrte@cluster0.nmrhx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/about.html'));
// app.use(express.static(__dirname + '/public/timer.html'));
// app.use(express.static(__dirname + '/routes/timer.js'));



const index = require('./routes/index');
const about = require('./routes/about');
const timer = require('./routes/timer');

app.use('/', index);
app.use('/about', about);
// app.use('/timer', timer);



// // Chatcord page
// app.get('/chatcord', function (req, res) {
//   res.redirect('http://localhost:4000/');
// });


// create Timer page
const timerPg = path.join(__dirname, "./public/timer.html"); 


// Timer page
app.get('/timer', function (req, res) {
  res.sendFile(timerPg);
});


// create About page
const aboutPg = path.join(__dirname, "./public/about.html");

// About page
app.get("/about", function (req, res) {
  res.sendFile(aboutPg);
});


// create 404 page
const errorPg = path.join(__dirname, "./public/index.html"); //this is your error page

// catch 404 and forward to error handler
app.get("*", function (req, res) {
  res.sendFile(errorPg);
});




// listen on port 4000
const port = 4000;

app.listen(process.env.PORT || 4000, () => {
  console.log(`Express app listening on port ${port}`);
});
