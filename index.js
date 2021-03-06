#!/usr/bin/env node
"use strict";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Setting all app api responses to no-cache, we always want fresh api responses
app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Disable annoying header from Express
app.disable('x-powered-by');

// Parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookie
app.use(cookieParser());

// Set app's port
app.set('port', process.env.PORT || 8000);


// Connecting to db and loading models
var db = mongoose.connect('mongodb://localhost/parking');
require('./models/carPark.js');


// Routes
var carParksRoute = require('./routes/carparks-route');
app.use('/ParkingManager/api/CarParks', carParksRoute);



var server = app.listen(app.get('port'), function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Express server listening listening at http://%s:%s', host, port);
});
