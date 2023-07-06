const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
// const { multer } = require('../../config/storage');

const routes = require('./route');


const app = express();

app.use('/storage', express.static('storage'));

app.use(express.urlencoded({ extended: false  }));
app.use(express.json());

app.use(session({
  secret: 'fhdf4364*&#&&^@hgds?>k!esfg',
  resave: false,
  saveUninitialized: false
}));



app.use('/', routes);




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});





