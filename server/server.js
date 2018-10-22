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

    socket.emit('newMessage',{
        from: 'Admin',
        text: ' welcome to chat app.',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'from Admin New User Joined',
        createdAt: new Date().getTime()
    });
    
    socket.on('createMessage', (message)=>{ //listener
        console.log('Create Msg', message);

        io.emit('newMessage', { //broadcast send.
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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