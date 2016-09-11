module.exports = function(req, res, next) {
    if (req.token && req.options.action === 'find') {
        req.options.where = req.options.where || {};
        req.options.where.usuario = req.token.id;
    }
    if (req.token && req.body) {
        req.body.usuario = req.token.id;
    }
    return next();
};