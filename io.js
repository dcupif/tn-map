var io = require('socket.io')();
var Chat = require('./models/chat');

// Can't init messages here as db.get() is still null when first required.
var messages = [];


io.on('connection', function(socket) {
    socket.on('loadChats', function() {
        var cursor = Chat.findAll();
        cursor.toArray(function(err, result) {
            if (err) {
                throw err;
            } else {
                socket.emit('loadChatsRet', result);
            }
<<<<<<< HEAD
        })
        //socket.emit('loadChatsRet', messages);
=======
        });

>>>>>>> 368c626adbb90134125bd08745bab6c41fab449e
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
