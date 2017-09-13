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