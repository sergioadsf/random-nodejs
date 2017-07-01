let app = require('./app/config/express');
//var db = require('./config/database');
let http = require('http').Server(app);

http.listen(9000, function(){
	console.log('listening on *:9000');
});