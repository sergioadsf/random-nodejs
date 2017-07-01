let express = require('express');
let app = express();
let load = require('express-load');
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	
	next();
});

load('app/models')
    .then('app/config/dbConnection.js')
    .then('app/controllers')
    .then('app/routes')
    .into(app)

module.exports = app;