

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('Usuario conectado');

    socket.on('chat message 1', function(data){
        console.log('Mensaje del chat 1: ' + data.mensaje);
        var fecha = new Date();
        var hora = fecha.getHours();
        var minutos = fecha.getMinutes();
        var horaEnvio = hora + ":" + minutos;
        io.emit('chat message 1', { mensaje: data.mensaje, nombreUsuario: data.nombreUsuario, imagenPerfil: data.imagenPerfil, hora: horaEnvio });
    });

    socket.on('chat message 2', function(data){
        console.log('Mensaje del chat 2: ' + data.mensaje);
        var fecha = new Date();
        var hora = fecha.getHours();
        var minutos = fecha.getMinutes();
        var horaEnvio = hora + ":" + minutos;
        io.emit('chat message 2', { mensaje: data.mensaje, nombreUsuario: data.nombreUsuario, imagenPerfil: data.imagenPerfil, hora: horaEnvio });
    });

    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });

});

http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000');
});