module.exports = function(app, callback) {
	var http 	= require('http');
	var https	= require('https');

	var options = {
		host: 'api.giphy.com',
		port: 443,
		path: '/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cute+puppies',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	var request = https.request(options, function(res){
		var dataChunks = [];
		res.on('data', function(chunk){
			dataChunks.push(chunk);
		}).on('end', function() {
			var data = Buffer.concat(dataChunks);
			var string = data.toString('utf-8');
			var puppyData = JSON.parse(string);
			callback(null, puppyData);
		});
	});
	request.end();

	request.on('error', function(error){
		console.log('REQUEST ERROR: ' + error.message);
	});
}