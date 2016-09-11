/**
 * FuncionalidadeController
 *
 * @description :: Server-side logic for managing funcionalidades
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // Override sails default "create" action
    create: function(req, res) {
        if (!req.body.projeto) {
            return res.badRequest({error: 'attribute "projeto" not found'});
        }
        
        function saveModel(model) {
            var criterios = [],
                i = 0;

            if (model.criterios) {
                criterios = model.criterios.split('|');
                delete model.criterios;
            }
            
            Funcionalidade.create(model).exec(function(err, funcionalidade) {
                if (err) {
                    return res.serverError(err);
                }

                if (!_.isArray(criterios) || !criterios.length) {
                    return res.created(funcionalidade);
                }

                for (; i < criterios.length; i++) {
                    funcionalidade.criterios.add({descricao: criterios[i]});
                }

                funcionalidade.save(function(err) {
                    if (err) {
                        return res.serverError(err);
                    }
                    res.created(funcionalidade);
                });
            });
        }
        
        Projeto.findOne(req.body.projeto).exec(function(err, projeto) {
            if (err) {
                return res.serverError(err);
            }
            
            if (!projeto || req.body.usuario !== projeto.usuario) {
                return res.forbidden({error: "action not allowed"});
            }
            
            saveModel(req.body);
        });
    }
};

