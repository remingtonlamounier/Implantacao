module.exports = function(req, res, next) {
    if (!req.token) {
        return res.badRequest({error: 'token not found'});
    }
    
    var usuario;
    
    if (req.options.model === 'usuario') {
        usuario = req.param('id');
    }
    
    if (usuario && parseInt(usuario) !== req.token.id) {
        return res.forbidden({error: 'action not allowed'});
    }
    
    return next();
};