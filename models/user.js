var db = require('../mongo');

// Create new user in database and return its id
exports.create = function(name, promotion, longitude, latitude) {
    console.log('Inserting new user...');
    db.collection('users').insertOne({
        name: name,
        promotion: promotion,
        longitude: longitude,
        latitude: latitude
    });
    console.log('Can you see me...? THEN SUCCESS!');
}