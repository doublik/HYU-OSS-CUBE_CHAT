
var socket = io.connect('http://localhost:8080');


var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        date: new Date()
    });
});

message.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        socket.emit('chat', {
            message: message.value,
            handle: handle.value,
            date: new Date()
        });
    }
    socket.emit('typing', handle.value);
});


document.addEventListener('submit', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        date: new Date()
    });
});

document.addEventListener('onkeyup', (e) => {
    if (e.key === 'Enter'){
        message.innerHTML = "";
    }
});

socket.on('chat', (data) => {
    console.log('chat.js chat');
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message 
                        + '&nbsp;<em>' + data.date + '</em></p>';
    feedback.innerHTML = '';
});

socket.on('typing', (data) => {
   feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em><p>';     
});

socket.on('initial chats', (data) => {
    for (var i = 0; i < data.length; i++) {
        if (i === (data.length-1)) console.log(data[i]);
        if (data[i].user === undefined){
            output.innerHTML += '<p><strong>' + data[i].handle + ': </strong>' + data[i].message
                        + '&nbsp;<em>' + data[i].date + '</em></p>';        
        } else {
            output.innerHTML += '<p><strong>' + data[i].user + ': </strong>' + data[i].content
                                + '&nbsp;<em>' + data[i].date + '</em></p>';
        }
    }
});
