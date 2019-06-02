
var socket = io.connect('http://localhost:8080');


var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
    }
    socket.emit('typing', handle.value);
});

document.addEventListener('submit', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

document.addEventListener('onkeyup', (e) => {
    if (e.key === 'Enter'){
        message.innerHTML = "";
    }
});

socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    feedback.innerHTML = '';
});

socket.on('typing', (data) => {
   feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em><p>';     
});
