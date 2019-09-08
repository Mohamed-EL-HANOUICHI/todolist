
//var http =require('http');
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false });
var app = express();

app.use(session({secret:'todotopsecret'}))

.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())

.use(function(req, res, next){
	if (typeof(req.session.list) == 'undefined'){
		req.session.list = [];
	}
	next();
})
.get('/todolist',function(req,res){
	// res.setHeader('content-tye":"text/plain');
	res.render('form.ejs', { lists : req.session.list });
})

.post('/todolist/add/', function(req,res){
	if (req.body.fname != ''){

        req.session.list.push(req.body.fname);
        //req.session.list.push('h');
	}

	res.redirect('/todolist');
	
})

.get('todolist/delete/:id', function(req,res){

	res.redirect('/todolist');

   
})
.use(function(req,res){
	res.redirect('/todolist')
})

/* var server = http.createServer(function(req,res){
	var page= url.parse(req.url).pathname;
	console.log(page);
	
	res.writeHead(200,{"content-tye":"text/html"});
	if (page =='/'){
		res.write('hey how are you');
	}
	else if(page =='/mohamed'){
		res.write('hey how are you mohamed')
	}
	res.end();

});
*/
.listen(8080);