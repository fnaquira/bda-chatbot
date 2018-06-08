var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
config = require('./config'),
handler = require('./handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(request,response){
	response.send('Hola mundo!');
});

app.get('/webhook',function(req,res){
	if(req.query['hub.verify_token']==config.SECURITY){
		res.send(req.query['hub.challenge']);
	}else{
		res.send('Error');
	}
});

app.post('/webhook',function(req,res){
	req.body.entry.forEach(function(entry){
		entry.messaging.forEach(function(message_event){
			if(message_event.message!=null){
				handler.recived_message(message_event,config.PAGE_ACCESS_TOKEN,config.URL_API);
			}
		});
	});
	res.send('ok');
});

app.listen(8080,function(){
	console.log('Iniciando!');
});