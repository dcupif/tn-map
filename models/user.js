var db = require('../mongo');

// Create new user in database
exports.create = function(name, promotion, longitude, latitude) {
    db.get().collection('users').insertOne({
        name: name,
        promotion: promotion,
        longitude: longitude,
        latitude: latitude
    });
    console.log('New user inserted into database: { username: "' + name + '", promotion: ' + promotion + ' }');
}

// Delete all users in database
exports.deleteAll = function() {
    db.get().collection('users').deleteMany({});
    console.log('Removed all users from the database');
}

// Find all users in database
exports.findAll = function(callback) {
    var cursor = db.get().collection('users').find().toArray(function(err, result) {
        if (err) {
            throw err;
        } else {
            callback(result);
        }
    });
}

// Init new user samples in database
exports.init = function() {
    db.get().collection('users').insertOne({
        name: "Damien Cupif",
        promotion: "2016",
        longitude: 5.041480,
        latitude: 47.322047
    });
    db.get().collection('users').insertOne({
        name: "Guillaume Haben",
        promotion: "2017",
        longitude: 6.054868,
        latitude: 48.903290
    });
    db.get().collection('users').insertOne({
        name: "Caroline Boyer",
        promotion: "2015",
        longitude: 7.009186,
        latitude: 43.641520
    });
}
