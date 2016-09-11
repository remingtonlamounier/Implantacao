/**
 * Token.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var crypto = require('crypto');

module.exports = {
  connection: 'memory',
    
  attributes: {
      key: {
          type: 'string',
          unique: true,
          required: true,
          size: 255
      },
      secret: {
          type: 'string',
          size: 32,
          required: true
      }
  },
    
  newToken: function(user, callback) {
    var self = this,
        tokenSecret = crypto.randomBytes(32).toString('hex'),
        payload = { id: user.id, nome: user.nome, grupo: user.grupo },
        token = {
            key: TokenService.sign(payload, tokenSecret),
            secret: tokenSecret
        };

    self.findOne({key: token.key}, function(err, finded) {
        if (finded) {
            callback(err, finded);
            return;
        }
        
        self.create(token).exec(callback);
    });
  }
};
