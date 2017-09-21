var db = require('../mongo');
ObjectId = require('mongodb').ObjectID;

// Create new chat in database
exports.create = function(user, time, message) {

    db.get().collection('chats').insertOne({
        user: user,
        time: time,
        message: message
    });
}

// Delete all chats in database
exports.deleteAll = function() {
    db.get().collection('chats').deleteMany({});
}

// Find all chats in database
exports.findAll = function(callback) {
    return db.get().collection('chats').find();
}

// Init new chat samples in database
exports.init = function() {}
