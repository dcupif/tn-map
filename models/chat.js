var db = require('../mongo');
ObjectId = require('mongodb').ObjectID;

// Create new chat in database
exports.create = function(user, time, message) {
    db.get().collection('chats').insertOne({
        user: user,
        time: time,
        message: message
    });
    //return db.get().collection('chats').findOne({chatId});
}

// Delete all chats in database
exports.deleteAll = function() {
    db.get().collection('chats').deleteMany({});
}

// Find all chats in database
exports.findAll = function(callback) {
    callback(db.get().collection('chats').find().map(function(c) {
        return c;
    }) || []);

    // var cursor = db.get().collection('chats').find().toArray(function(err, result) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         callback(result);
    //     }
    // });
}

// Init new chat samples in database
exports.init = function() {
    db.get().collection('chats').insertOne({
        user: 'Toto Patapouf',
        time: '1505608205567',
        message: 'Bon anniversaire TELECOM !'
    });
    db.get().collection('chats').insertOne({
        user: 'Tata Miniclick',
        time: '1505608305567',
        message: 'Déjà 10 ans... Félicitations !'
    });
}