var io = require('socket.io')();
var Chat = require('./models/chat');

// Can't init messages here as db.get() is still null when first required.
// var messages = [];
// let messages = Chat.findAll(function(m) {
//     return m
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
        // messages = Chat.findAll(function(m) {
        //     return m
        // });

        socket.emit('loadChatsRet', messages);
    });

    socket.on('sendMessage', function(user, text) {
        let date = new Date();
        const c = {
            user: user,
            time: date.getTime(),
            message: text
        };

        io.emit('messageSent', c);

        messages.push(c);
        Chat.create(c.user, c.time, c.message);
    });
});

module.exports = io;
