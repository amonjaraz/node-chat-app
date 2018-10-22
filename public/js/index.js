var socket = io(); //initiating request from client to server to open web socket and keep open.
socket.on('connect', function(){ //event
    console.log('connected to server.');

    socket.on('newMessage', function(msg){ //event
        console.log('new Message', msg);
    });
    
    socket.on('disconnect', function(){ //event
        console.log('Disconnected from Server.');
    });    

});




