const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const MongoDBURI = process.env.MONGO_URI || 'mongodb+srv://Adriol:Qmozet!jhdsfrte@cluster0.nmrhx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
});

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
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/about.html'));
app.use(express.static(__dirname + '/routes/chatcord.js'));


const index = require('./routes/index');
const about = require('./routes/about');
const chatcord = require('./routes/chatcord')

app.use('/', index);
app.use('/about', about);
app.use('/chatcord', chatcord);


// Chatcord page
app.get('/chatcord', function(req, res) {
  res.redirect('http://localhost:4000/');
});



// About page
app.use((req, res) => {
  res.sendFile(__dirname + '/public/about.html');
})


// create 404 page
const errorPg = path.join(__dirname, "./public/index.html"); //this is your error page

// catch 404 and forward to error handler
app.get("*", function(req,res){
  res.sendFile(errorPg);
});

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express app listening on port 3000');
});