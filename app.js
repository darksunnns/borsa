
var fs = require('fs');

var express = require('express');

var app = express();
const port=process.env.PORT || 4000


app.get('/',function(req,res){

fs.readFile('index.html',function(err,data){

    res.write(data);
    res.write('kaandene me');
    res.end('mesaj bitti');



});

});


app.listen(port);