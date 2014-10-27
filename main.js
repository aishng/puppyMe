var express = require('express'),
app 		= express(),
http		= require('http'),
getPuppies	= require('./server/getPuppies');

app.server = http.Server(app);

app.use(express.static(__dirname + '/views'));

app.get('/', function(req,res) { 
	getPuppies(app, function(err, puppyData) {
		if (err) {
			return console.error("error: " + err.message);
		}
		puppies = puppyData;
		res.render('./index.ejs', puppies);

	});
});

app.server.listen(process.env.PORT || 9000);