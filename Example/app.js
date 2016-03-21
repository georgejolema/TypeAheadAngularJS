var express = require('express');

var app = express();

app.use(express.static('public'));
app.set('views', './web');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/api/data', function(req, res){
	res.send([
        { id: 1, name: "juan" , email:"jjjdsf@dsf.com", enabled:false},
        { id: 2, name: "samuel", email: "samuel@dsf.com",enabled:true },
        { id: 3, name: "jerry", email: "jerry@dsf.com", enabled: true },
        { id: 4, name: "Joe", email: "abc@dsf.com", enabled: true },
		{ id: 5, name: "Barry", email: "ee@dsf.com", enabled: true },
		{ id: 6, name: "Helen", email: "aaaadd@dsf.com", enabled: true },
		{ id: 7, name: "Mary", email: "cc@dsf.com", enabled: true },
		{ id: 8, name: "Rob", email: "dd@dsf.com", enabled: true }
    ]);
});

app.listen(5000, function(err){
	console.log('Listening port 5000');
});