var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '104.198.192.199',
	user: 'root',
	password: 'RunningMate',
	database:'RunningMate'
});

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;