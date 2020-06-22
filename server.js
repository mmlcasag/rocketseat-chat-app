const http = require('http');
const path = require('path');

const express = require('express');

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', (req, res, next) => {
    res.render('index');
});

let messages = [];

io.on('connection', socket => {
    socket.emit('previousMessages', messages);
    
    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3000);