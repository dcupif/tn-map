var io = require('socket.io')();
var Chat = require('./models/chat');

// let messages = Chat.findAll(function(m) {
//     return m;
// });

let messages = [{
    user: 'Toto Patapouf',
    time: '1505608205567',
    message: 'Bon anniversaire TELECOM !'
}, {
    user: 'Tata Miniclick',
    time: '1505608305567',
    message: 'Déjà 10 ans... Félicitations !'
}];

io.on('connection', function(socket) {
    socket.on('loadChats', function() {
        socket.emit('loadChatsRet', messages);
    });

    socket.on('sendMessage', function(m) {
        const c = {
            user: 'Unknown',
            time: new Date().getTime(),
            message: m
        };

        io.emit('messageSent', c);

        messages.push(c);
        Chat.create(c.user, c.time, c.message);
    });
});

module.exports = io;
