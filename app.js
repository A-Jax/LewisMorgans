const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

 // set static folder
app.use(express.static(__dirname + '/dist')); 

//DB config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Body-Parser middleware
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

const blogs = require('./routes/blog'); // import custom routing
const users = require('./routes/user');

var apiKey = 'SG.00odQRo4SGqTYBdSKYfgSQ.9ZIb35QKPSxoynGjXbgxUR5_GI2PR4IEP8_673cUoGg';
// Sendgrid middleware
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(apiKey);

app.post('/contact', (req, res) => {
 
var fromEmail = new helper.Email(req.body.email);
var toEmail = new helper.Email('lmorgans90@gmail.com');
var subject = req.body.subject + ' sent by ' + req.body.name;
var content = new helper.Content('text/html', req.body.message);
var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received' + error);
      res.json(false)
      
    } else {
      console.log('MESSAGE SENT')
      res.json(true)
 
    }
  });

}); 

// Use routes
app.use('/blog', blogs);
app.use('/user', users);

//catch all routes and send to Angular Router.
app.get('*/', (req, res) => { 
    res.sendfile(path.join(__dirname + '/dist/index.html'));
})

// Set listening port
const port =  process.env.PORT || 1337
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})