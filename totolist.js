
//var http =require('http');
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false });
var app = express();




app.use(session({secret:'todotopsecret'}))

.use(express.static('public'))

.use(function(req, res, next){
	if (typeof(req.session.list) == 'undefined'){
		req.session.list = [];
	}
	next();
})
.get('/todolist',function(req,res){
	// res.setHeader('content-tye":"text/plain');
	res.render('form.ejs', { lista : req.session.list});
})
.get('/todolist/newtask/',function(req,res){
	// res.setHeader('content-tye":"text/plain');
	res.render('newtask.ejs');
})



.post('/todolist/add/', urlencodedParser ,function(req,res){
	if (req.body.task != ''){

        req.session.list.push(req.body.task);
        //req.session.list.push('h');
       
	}

	res.redirect('/todolist');
	
})

.post('/todolist/update/:para', urlencodedParser ,function(req,res){
	if (req.body.task != ''){

		//req.session.list.push(req.body.task);
		req.session.list.splice(req.params.para, 1 ,req.body.task);

        //req.session.list[req.params.para]=req.body.task;
        //req.session.list.push('h');
	}

	res.redirect('/todolist');
	
})

.get('/todolist/delete/:parm', function(req,res){

	if (req.params.parm != '') {
		
		req.session.list.splice(req.params.parm, 1);
	}

	res.redirect('/todolist');
})
.get('/todolist/update/:par', function(req,res){

	if (req.params.parm != '') {
		
		res.render('update.ejs', {para:req.params.par});

	}

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