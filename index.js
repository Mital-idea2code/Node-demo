//Create WebServer
// var http = require('http');

// var server = http.createServer(function(req, res){

// });

// server.listen(5000);
// console.log("Node.js web server at port 5000 is running.....");

//File System
// var fs = require('fs');

// fs.readFile('TestFile.txt', function (err, data) {
//     if (err) 
//         // throw err;

//     console.log(data);
// });

// var fs = require('fs');

// fs.readFile('TestFile.txt', 'utf8', function (err, data) {
    
//     debugger;

//     if (err) throw err;
    
//     console.log(data);
// });

//Example: Raise and Handle Node.js events
// get the reference of EventEmitter class of events module
var emitter = require('events').EventEmitter;

//create an object of EventEmitter class by using above reference
var em = new emitter();

//Subscribe for FirstEvent
em.on('FirstEvent', function (data) {
    console.log('First subscriber: ' + data);
});

// Raising FirstEvent
em.emit('FirstEvent', 'This is my first Node.js event emitter example.');

// Express js
var express = require('express');
var app = express();
const mongoose = require("mongoose");
require("dotenv/config");
var cookieParser = require('cookie-parser')

app.use(cookieParser())


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/form.html');
});

app.post('/submit-student-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    
    res.send(name + ' Submitted Successfully!');
});


mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully.");
});
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

const postRoute = require("./routes/post");
app.use("/post",postRoute);


const sliderRoute = require('./routes/slider');
app.use("/slider",sliderRoute);

const mailRoute  = require("./routes/mail");
app.use('/mail',mailRoute);

var server = app.listen(5000);

