const log = require ('./kaan');
log.ceren();


var fs = require('fs');

var express = require('express');
var path = require('path');
const { Console } = require('console');
var app = express();
const port=process.env.PORT || 4000 
const server = app.listen(port);
const io=require('socket.io')(server);

let dizim =[100,200,500];
//var allConnectedClients;
//let i=0;

var limit=2;
let ekzaman;
let clientNo =0;

var serverclick;
let players={};
let aksiyonlar =["2x","60","100","40"];
let sirketler =["ibm","bmw","shell","ebay"];
let degerler =[100,100,100,100];





// let clientRoom;


io.sockets.on('connection',function(socket){


 



  var ids = Object.keys(io.sockets.connected);
  //var id = Object.keys(io.sockets.adapter.rooms);
 // console.log("socket id :   "+" "+socket.id);
 //AŞIRI ÖNEMLİ ALTTAKİ KOD bu kod sadeyinde güncel socket id objesindeki socket idleri dizi olarak alabiliyorum.
 // io.eio.clients



//console.log(id); 
 
 // socket.emit('serverMsg',{"id":allConnectedClients[i],"stabilid":allConnectedClients[0]});
  // i++;

 
 
  //console.log("sonuncu altta");
 

   


  clientNo++;
  //console.log("connect room"+" "+socket.id);
  socket.on("disconnect", function () { clientNo--; //i--; //console.log("disconnect room"+" "+socket.id) ; 
  delete players[socket.id];
   console.log(players);
});



  socket.on("login", function (data)  {
  

    var Personel = {
      ad:data.name,
      mesaj:data.yazi
      };
     
   
   //   console.log("msg :"+Personel.mesaj);
    
 //   console.log(data.param);
  
       
      
       socket.join(data.isim, function ()  {
        let kartsayisi=8;
        let dizi =[];
        let test=0;
        var clients;
       var odalar;
       let x=0; 
     
       var numClients;

        console.log(data.odalimit+": "+"kişilik oda odayaratıldı");
        console.log(data.odalimit);
        
     //   socket.emit('updategamedata',{"sirket":sirketler});
          
        players[socket.id]=data ;
        players[socket.id].money=300;
         players[socket.id].deger= dizi[0];
        players[socket.id].aksiyonkartisayisi =kartsayisi;
     //   players[socket.id].i=0;
        players[socket.id].key=false;
        console.log(players[socket.id].yazi);
        console.log(players[socket.id].key);
      
       // console.log(players);
        for (var Id in players ) {
         
          if(data.isim==players[Id].isim){
            console.log("böyle bir oda yaratılmış");
            test++;
         
          };
          if( data.odalimit == null){
            data.odalimit=data.isim[data.isim.length-1];
            console.log("nulla eşit"+data.odalimit);
          };
          console.log(players[Id].isim);
          console.log(test);
          console.log("data isim :"+data.isim);
          console.log("now :"+data.isim[data.isim.length-1]);
          
          
          };

       
         
       // io.to(socket.adapter.rooms[data.isim].sockets).emit('updategamedata',{"sirket":sirketler});
         
        socket.on('gamedata', function(msg){
       
    
          
          let randomdeger = ( Math.random() * 500 ) | 0;
         console.log("heyyoo");
          //console.log(players);
          console.log(data.isim);
          if(typeof msg.deger !== 'undefined'){
            dizi[0]=msg.deger;
          }
          degerler[0]=randomdeger;
          players[socket.id].key=true;
      
          console.log("burrda veri var");
        
          var keys = Object.keys(socket.rooms);
          for (var i = 0; i < keys.length; i++) {
              io.to(socket.rooms[keys[i]]).emit('updategamedata',{"sirket":sirketler,"deger":degerler});
              console.log("sondan önceki :"+keys);
          };
       //   console.log("enson :"+keys);
      //    socket.to(odalar[i]).emit("message", {"promtkey":true});
          if(players[socket.id].key){ 
            kartsayisi--;
            players[socket.id].aksiyonkartisayisi =kartsayisi;
          //  players[socket.id].i=1;
            players[socket.id].money=200;
            players[socket.id].deger= dizi[0];
           // console.log("i nin deger :"+players[socket.id].i);
            console.log(players);
            players[socket.id].key=false;
          };
          if(kartsayisi== players[socket.id].deger){ 
           console.log("6ya ulaşıldı"+data.isim);
          };

      });//game data burda bitiyor
     

 //     if(players[socket.id].i==1){console.log("kazanan kaan");};  
 gameturn ();
 function gameturn ()
 {
  clients = io.sockets.adapter.rooms[data.isim].sockets;   
  odalar =  Object.keys(socket.adapter.rooms[data.isim].sockets);
 console.log("clients  :"+ Object.keys(clients));

    //to get the number of clients
     var numstabil =Object.keys(clients).length;
     numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length -=1 :0;
 //   console.log("son yazi :" +numstabil); 
   

    for (var clientId in clients ) {
    console.log("for in :"+clientId);
         //this is the socket of each client in the room.
         var clientSocket  =  io.sockets.connected[clientId];
         clientSocket.isim=data.yazi;

          
        
         //you can do whatever you need with this
         //oda içindeki herkeze
     
        // oda içinde sadece bir kişiye
        
       //  console.log("x  : "+ numClients);
     
      // console.log(clientSocket.isim);
     //  console.log( "index 0"+Object.keys(clientSocket.rooms)[0]);
    
    }
 
   


    console.log("eklene isim"+clientSocket.isim);
    console.log(clientSocket.rooms);
    clientSocket.emit('newevent', {"servermes":data.yazi});
 
  
        //console.log(`Connected. Root Name : ${data}`);
        if(typeof numClients == "number"){//console.log("number eşit"); 
              
       console.log("numclient :"+numClients);
   
        if(numClients==data.odalimit){
         
         console.log("yeni x:"+ x);
        
         if(x==data.odalimit){
         socket.to(odalar[0]).emit("ozel", {"tikla":true});    
      }; 
    
    
   // var i = 0;                  //  set your counter to 1
   // var keys = Object.keys(socket.rooms);
    function myLoop() {        //  create a loop function
        
      setTimeout(function() {
        io.to(odalar[x]).emit("message", {"isim":"OYUN BAŞLIYOR SIRA SENDE : "+x,"playkey":true});     
        //socket to  ve io to arasında çok fark var.
        // odalarda io.to iyi çalışıyo tekrar tarayıcıya tıklama göndermeye gerke kalmıyo.

        x++;                    //  increment the counter
        if (x <= data.odalimit) {  
          console.log("x in şuanki degeri"+x);            
          myLoop();          
        }  
                     
      }, 1000)
    }
  
    setInterval(function() { x=0; myLoop(); },5000);

 
    //1 tur boyunca geçen süre kesinlikle
    // my loop fonsiyonun içindeki süreden küçük 
   //olamaz bu süre oda içindeki istemcilere göre 
  //dinamik olarak hesaplanmalı fazla olmasında sakınca yok
    
   
  

      
   /*   
      
      setInterval(function(){
        var keys = Object.keys(socket.rooms);


        for (let i = 1; i <= 2; i++) {
          setTimeout(function() { alert(i) }, 100);
      }
      
      for (let i = 0; i < keys.length; i++ ) {
      //  console.log("i degerim :"+i);
       setTimeout(function() { console.log(i) }, 100);
        
     //    io.to(socket.rooms[keys[i]]).emit('message',{"isim":"OYUN BAŞLIYOR SIRA SENDE : "+i,"playkey":true});
      
    };
  }, 3000);
       
      console.log("yeni x:"+ x);
      // socket.to(odalar[x]).emit("message", {"isim":"OYUN BAŞLIYOR SIRA SENDE : "+x,"playkey":true});
    
        x++;
 */
      //  socket.to(odalar[1]).emit("message", {"isim":"OYUN BAŞLIYOR SIRA SENDE : "+x,"playkey":true});
     // players[socket.id].i=1;
  
      
          
       //   socket.to(odalar[i]).emit("message", {"isim":"İSMİN :"+data.name});
       // console.log("sıra sende ");      
        socket.on("serverclick", function (veri) {
          
          serverclick = veri.on;   
          if(serverclick !== true){
          //  x++; 
            console.log("yeni x:"+ x);};
        
          
        });    
       


     
             
      //  var loop =  setTimeout(function() {
        
      
           //önemli sorun koşuldaki sayıya büyük eşit olursa aynı zamanda
         //if koşulunun içindeki işlemi yaptığından çok hızlı gerçekleşiyor
        
            
              
              
            //   i=0; 
             //  numClients=0;   
        
        
                  
     //      },3000);
        
          // clearInterval(loop);
         
         
         };
        };//sıra mantığı burda bitiyor
        
};//fonsiyon kapandı
         
        //  console.log(players[socket.id].key);
          
         
            
             //console.log("odadaki client sayısı :"+  numClients);
       });//join burda bitiyo
    



     
      // io.in(data).emit("message", data);
     
      // console.log(io.sockets.adapter.rooms);
    

  //console.log("stabilid"+" "+ allConnectedClients[0]);
 // console.log("socket id"+" "+ socket.id);
  //socket.emit('serverMsg',{"id":allConnectedClients[0]});

 
      //Ya da
      
  //    io.to(data.isim).emit("message", data);
            //belli bir cliente mesaj 
     // socket.to(id[0]).emit("message", {"isim":id[i]});
    //  io.to(data.yazi).emit("message", data);
     
  });

 

});







app.use('/public',express.static(path.join(__dirname,'public'))) 

app.get('/',function(req,res){

fs.readFile('index.html',function(err,data){

   res.write(data);
   res.write('');
    res.end('');



});

});


/*

//son kodblogu geçici burda
 

 
if(typeof numClients == "number"){console.log("number eşit"); 

// console.log("inin degeri :"+i);



//  clearTimeout(ekzaman);

 if(numClients>=3){

  
 
    
  
  function gonder(){ 
    socket.to(odalar[i]).emit("message", {"isim":"SIRA SENDE :"+i});
   console.log("sıra sende ");      
    
  };
var loop =  setInterval(function() {

console.log("inin degeri :"+i  );

gonder();

function aaa() {
  console.log("inin degeri :"+i );  
  i=0; 
 numClients=0;   
    
           
   };

i++;

  //önemli sorun koşuldaki sayıya büyük eşit olursa aynı zamanda
//if koşulunun içindeki işlemi yaptığından çok hızlı gerçekleşiyor

if(i==2) { 
   
      ekzaman =setTimeout(aaa,3000);    
      console.log( "i nin degeri :"+i  ); 
    

         };
         
  },3000);

 // clearInterval(loop);

 



 


};
};

console.log("odadaki client sayısı :"+  numClients);

*/
