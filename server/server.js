var express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
//console.log(__dirname + '/../public'); //works but not ideal way. use node library (path).
const publicPath = path.join(__dirname, '../public');
//console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;
app.use(express.static(publicPath)); //express middleware. you can now visit localhost:3000/help.html

io.on('connection', (socket)=>{
    console.log("new User Connected.");
    
    socket.emit('newMessage', { //event
        from: "Pete",
        text: "Hello client",
        createdAt: 123
    });
    
    socket.on('createMessage', (message)=>{ //listener
        console.log('Create Msg', message);
    });
    
    
    socket.on('disconnect', ()=>{
        console.log('client disconnected.');
    });


});


server.listen(port, ()=>{
    console.log(`Started on Port ${port}`);
});