angular.module('starterapp').factory('dao', function($http, $q, URLS, auth) {
    var header = { Authorization: 'Bearer ' + auth.getUser().token },
        config = { url: URLS.BACKEND, headers: header },
//        db = new DbFactory(DbProxies.LOCALSTORAGE, 'alpha'),
        db = new DbFactory(DbProxies.RESTFUL, config),
        projetos = db.createDataSet('projeto'),
        estorias = db.createDataSet('estoria'),
        usuarios = db.createDataSet('usuario');
    
    var promise = function(dataset) {
        var defer = $q.defer();

        dataset.open(function(err, results) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(dataset);
            }
        });
        
        return defer.promise;
    };
    
    var httpRequest = function(method, url) {
        var defer = $q.defer();
        
        $http[method](url, { headers: header }).then(
            function(res) {
                var results = new ArrayMap();
                results.putRange(res.data);
                defer.resolve(results);
            },
            function(res) {
                var message = 'Ocorreu um erro inesperado';
                if (res.data && res.data.error) {
                    message = res.data.error;
                }
                defer.reject(new Error(message));
            });
        
        return defer.promise;
    };
    
    return {
        getDb: function() {
            return db;
        },
                
        getProjetos: function() {
            return promise(projetos);
        },
        
        getEstorias: function() {
            return promise(estorias);
        },
        
        getUsuarios: function() {
            return promise(usuarios);
        },
        
        feed: function() {
            var url = URLS.BACKEND + '/atividade/feed';
            return httpRequest('get', url);
        },
        
        projPendentes: function() {
            var url = URLS.BACKEND + '/projeto/pending';
            return httpRequest('get', url);
        }
    };
});