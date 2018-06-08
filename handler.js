var request = require('request'),
mongoose = require('mongoose');
module.exports = {
	recived_message: function(evento,token,url){

		request({
			url: url+'me/messages',
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			json: {
				recipient: {
					id: evento.sender.id
				},
				sender_action: 'typing_on'
			},
			qs: {
				access_token: token
			}
		},function(error, response, body){
			if (!error && response.statusCode == 200) {
				console.log('Mensaje enviado con exito!');
			}
		});

		request({
			url: url+evento.sender.id,
			method: 'GET',
			qs: {
				access_token: token
			}
		},function(error, response, body){
			/*
			TAREA
			- Hacer una consulta que verifique si el usuario
			esta registrado en la base de datos
				-si no esta, GUARDARLO y responder HOLA <USUARIO>
				-si si esta, agradecerle su regreso
			*/
			var usuario = JSON.parse(response.body);
			request({
				url: url+'me/messages',
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				json: {
					recipient: {
						id: evento.sender.id
					},
					message: {
						text: 'Hola '+usuario.first_name
					}
				},
				qs: {
					access_token: token
				}
			},function(error, response, body){
				if (!error && response.statusCode == 200) {
					console.log('Mensaje enviado con exito!');
				}
			});
		});
	}
};