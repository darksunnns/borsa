const log = require ('./kaan');
log.ceren();


var fs = require('fs');

var express = require('express');
var path = require('path');
var app = express();
const port=process.env.PORT || 4000 
const server = app.listen(port);
const io=require('socket.io')(server);

let clientNo =0;
let clientRoom;

io.sockets.on('connection',function(socket){


  console.log(socket.rooms);


    
clientNo++;
socket.join(Math.round(clientNo/2));
socket.emit('serverMsg',Math.round(clientNo/2));

socket.on('buttonPressed',function(clientNo){
    console.log("gonderinfonsiyonun içindeyiz"+clientNo);
io.to(clientRoom).emit('switchFromServer');

});


     });



app.use('/public',express.static(path.join(__dirname,'public'))) 

app.get('/',function(req,res){

fs.readFile('client.html',function(err,data){

   res.write(data);
   res.write('');
    res.end('');



});

});





 