/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto');

module.exports = {
    // Override sails default "create" action
    create: function(req, res) {
        if (req.body.senha !== req.body.confirmaSenha) {
            return res.badRequest({error: 'password and confirm password doesn\'t match'});
        }
        
        delete req.body.confirmaSenha;
        var senha = req.body.senha;
        
        req.body.senha = crypto.createHash('sha1').update(senha).digest('hex');
        req.body.grupo = 'users';
        
        Usuario.create(req.body).exec(function(err, user) {
            if (err) {
                return res.json(err.status, err);
            }
            
            Token.newToken(user, function(err, newToken) {
                if (err) {
                    return res.json(err.status, err);
                }
                
                res.created({
                    usuario: user,
                    token: newToken.key
                });
            });
        });
    },
    
	login: function(req, res) {
        var email = req.body.email,
            password = req.body.senha;
        
        if (!email || !password) {
            return res.badRequest({error: 'e-mail and password is required'});
        }
        
        password = crypto.createHash('sha1').update(password).digest('hex');
        
        Usuario.findOne({email: email, senha: password}).exec(function(err, user) {
            if (!user) {
                return res.notFound({error: 'invalid e-mail and/or password'});
            }
            
            Token.newToken(user, function(err, newToken) {
                if (err) {
                    return res.json(err.status, err);
                }
                
                res.ok({
                    usuario: user,
                    token: newToken.key
                });
            });
        });
    }
};
