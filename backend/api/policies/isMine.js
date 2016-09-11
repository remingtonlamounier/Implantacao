module.exports = function(req, res, next) {
    if (!req.token) {
        return res.badRequest({error: 'token not found'});
    }
    
    var modelId = req.param('id'),
        model = sails.models[req.options.model];

    if (!model || !modelId) {
        return res.serverError({error: 'errors happen in the request', details: req.options});
    }
    
    model.findOne(parseInt(modelId)).exec(function(err, record) {
        if (err) {
            return res.badRequest(err);
        }
        if (!record) {
            return res.notFound({error: 'resource not found'});
        }
        if (record.usuario !== req.token.id) {
            return res.forbidden({error: 'resource not allowed'});
        }
        return next();
    });
};