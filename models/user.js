var db = require('../mongo');
ObjectId = require('mongodb').ObjectID;

// Create new user in database
exports.create = function(name, promotion, longitude, latitude, facebookID, googleID) {
    db.get().collection('users').insertOne({
        name: name,
        promotion: promotion,
        longitude: longitude,
        latitude: latitude,
        facebookId: facebookID,
        googleId: googleID
    });
    //return db.get().collection('users').findOne({userId});
}

// Find User
exports.find = function(id, cb) {
    db.get().collection('users').findOne({_id: ObjectId(id)}).then(function(user) {
        cb(user);
    });
}

// Delete all users in database
exports.deleteAll = function() {
    db.get().collection('users').deleteMany({});
}

exports.update = function(id, latitude, longitude, cb) {
    db.get().collection('users').update(
        { _id: ObjectId(id) },
        { $set:
            {
                longitude: longitude,
                latitude: latitude
            }
        },
        { upsert: false }).then(function() {
            cb();
        });
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

exports.findOrCreateGoogle = function(profile, cb) {
    db.get().collection('users').findOne({googleId: profile.id}).then(function(user) {
        if (user !== undefined && user !== null) {
            console.log("Google auth - User found");
            cb(null, user);
        } else {
            console.log("Google auth - Creating user");
            db.get().collection('users').insertOne({
                name: profile.name.givenName + " " + profile.name.familyName,
                promotion: null,
                longitude: "79",
                latitude: "-35",
                facebookId: null,
                googleId: profile.id
            }).then(function(result) {
              cb(null, result.ops[0]);
          });
        }
    });
}


exports.findOrCreateFacebook = function(profile, cb) {

    db.get().collection('users').findOne({facebookId: profile.id}).then(function(user) {
        if (user !== undefined && user !== null) {
            console.log("Facebook auth - User found");
            console.log(user);
            cb(null, user);
        } else {
            console.log("Facebook auth - Creating user");
            db.get().collection('users').insertOne({
                name: profile.displayName,
                promotion: null,
                longitude: "79",
                latitude: "-35",
                facebookId: profile.id,
                googleId: null,
            }).then(function(result) {
              cb(null, result.ops[0]);
          });
        }
    });
}

// Init new user samples in database
exports.init = function() {
    db.get().collection('users').insertOne({
        name: "Damien Cupif",
        promotion: "2016",
        longitude: 5.041480,
        latitude: 47.322047,
        facebookID: null,
        googleID: null
    });
    db.get().collection('users').insertOne({
        name: "Guillaume Haben",
        promotion: "2017",
        longitude: 6.054868,
        latitude: 48.903290,
        facebookID: null,
        googleID: null
    });
    db.get().collection('users').insertOne({
        name: "Caroline Boyer",
        promotion: "2015",
        longitude: 7.009186,
        latitude: 43.641520,
        facebookID: null,
        googleID: null
    });
}
