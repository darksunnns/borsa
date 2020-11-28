const log = require ('./kaan');
log.ceren();


var fs = require('fs');

var express = require('express');
var path = require('path');
var app = express();
const port=process.env.PORT || 4000

app.use('/public',express.static(path.join(__dirname,'public'))) 

app.get('/',function(req,res){

fs.readFile('index.html',function(err,data){

    res.write(data);
    res.write('kaandeneme');
    res.end('mesaj bitti');



});

});


app.listen(port);
