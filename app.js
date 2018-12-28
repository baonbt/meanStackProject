const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//routes
const Users = require('./routes/users');
const Goods = require('./routes/goods');
const Customers = require('./routes/customers');
const Suppliers = require('./routes/suppliers');
const GoodNpps = require('./routes/goodNpps');

//database
const configDatabse = require('./config/database');
mongoose.connect(configDatabse.CLOUDY);
//on connection
mongoose.connection.on('connected', function () {
    console.log('connected to database: ' + configDatabse.CLOUDY);
});
//on connection to db error
mongoose.connection.on('error', function (err) {
    console.log('connection to database error: ' + err);
});

const port = process.env.PORT || 80;
const app = express();

//CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

//pasport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));

app.use('/users', Users);
app.use('/goods', Goods);
app.use('/goodnpps', GoodNpps);
app.use('/customers', Customers);
app.use('/suppliers', Suppliers);

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('public/index.html', { root: __dirname });
});

app.listen(port, function() {
    console.log('started ' + port );
});