var socket = io(); //initiating request from client to server to open web socket and keep open.
socket.on('connect', function(){ //event
    console.log('connected to server.');

    socket.on('newMessage', function(msg){ //event
        console.log('new Message', msg);
        var li = jQuery('<li></li>');
        li.text(`${msg.from}: ${msg.text}`);

        jQuery('#messages').append(li);
    });

    socket.on('newUserWelcome', function(msg){
        console.log(msg.text);
    });

    socket.on('newUserJoined', function(msg){
        console.log(msg.text);
    });

    jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'user',
            text: jQuery('[name=message]').val()
        }, function() {
            console.log('Done');
        })
    });

    socket.on('disconnect', function(){ //event
        console.log('Disconnected from Server.');
    });    

});




