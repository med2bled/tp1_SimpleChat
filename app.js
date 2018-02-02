const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const http=require('http').Server(app);
const io=require('socket.io')(http);
var Message=require('./model/Message');
var Mongoose=require('mongoose');
var config=require('./config');
Mongoose.connect(config.getConnectionString(),{useMongoClient:true});




var userscount=0;
app.use('/static',express.static(__dirname+'/public'));
app.set('view engine','ejs');
io.on('connection', function(socket){
io.sockets.emit('userscount',++userscount);


  socket.on('disconnect',function(){
    io.sockets.emit('userscount',--userscount);


  });
  socket.on('chat message to server', function(msg){
    Message.create({
      sender:msg.sender,
      date:new Date(Date.now()).toLocaleString(),
      value:msg.value
    },function(err,result){
      if(err){
        console.log('error saving post');
      }else{
        io.sockets.emit('chat',result);

      }
    });


    console.log(socket.id);
  });
});

app.get('*',function(req,res){
    Message.find({},function(err,result){
      if(err){
        console.log('error');
      }else{
      res.render('home',{messages:result});
      }
    })


});

http.listen(3000,function(){
  console.log('server start on port 3000');
});
