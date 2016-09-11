var jwt = require('jsonwebtoken');

module.exports.sign = function(payload, secret) {
    return jwt.sign(payload, secret);
};

module.exports.verify = function(token, secret, callback) {
    return jwt.verify(token, secret, callback);
};