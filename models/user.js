var db = require('../mongo');

// Create new user in database and return its id
exports.create = function(name, promotion, longitude, latitude) {
    db.get().collection('users').insertOne({
        name: name,
        promotion: promotion,
        longitude: longitude,
        latitude: latitude
    });
    console.log('New user inserted into database: { username: "' + name + '", promotion: ' + promotion + ' }');
}