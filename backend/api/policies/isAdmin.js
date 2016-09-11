module.exports = function(req, res, next) {
    if (!req.token) {
        return res.badRequest({error: 'token not found'});
    }
    if (req.token.grupo !== 'admins') {
        return res.forbidden({error: 'resource not allowed'});
    }
    return next();
};