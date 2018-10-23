var express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
//console.log(__dirname + '/../public'); //works but not ideal way. use node library (path).
const publicPath = path.join(__dirname, '../public');
//console.log(publicPath);

const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;
app.use(express.static(publicPath)); //express middleware. you can now visit localhost:3000/help.html

io.on('connection', (socket)=>{
    console.log("new User Connected.");

    socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app.') ); 

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'from Admin New User Joined'));
    
    socket.on('createMessage', (message)=>{ //listener
        console.log('Create Msg', message);

        io.emit('newMessage',generateMessage(message.from, message.text))  //broadcast send.

        // socket.broadcast.emit('newMessage', { //broadcast except this user.
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
    });
    
    
    socket.on('disconnect', ()=>{
        console.log('client disconnected.');
    });


});


server.listen(port, ()=>{
    console.log(`Started on Port ${port}`);
});