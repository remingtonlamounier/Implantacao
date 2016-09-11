angular.module('starterapp').factory('auth', function($http, URLS) {
    var auth = {
            create: function(user, callback) {
                var url = URLS.BACKEND + '/usuario';
                
                if (this.isAuthorized()) {
                    return callback();
                }

                $http.post(url, JSON.stringify(user)).then(function(res) {
                    delete user.senha;
                    delete user.confirmaSenha;
                    
                    user.token = res.data.token;
                    user.id = res.data.usuario.id;
                    user.grupo = res.data.usuario.grupo;
                    
                    sessionStorage.setItem('user', JSON.stringify(user));
                    
                    callback();
                }, function(res) {
                    var message = 'Ocorreu um erro inesperado';

                    if (res.data && res.data.error) {
                        message = res.data.error;
                    }
                    
                    callback(message);
                });
            },
            
            authorize: function(user, callback) {
                var url = URLS.BACKEND + '/login';
                
                if (this.isAuthorized()) {
                    return callback();
                }

                $http.post(url, JSON.stringify(user)).then(function(res) {
                    delete user.senha;
                    
                    user.token = res.data.token;
                    user.id = res.data.usuario.id;
                    user.nome = res.data.usuario.nome;
                    user.grupo = res.data.usuario.grupo;
                    user.telefone = res.data.usuario.telefone;
                    
                    sessionStorage.setItem('user', JSON.stringify(user));
                    
                    callback();
                }, function(res) {
                    var message = 'Ocorreu um erro inesperado';

                    if (res.status === 404) {
                        message = 'E-mail e/ou senha inválidos';
                    } else if (res.data && res.data.error) {
                        message = res.data.error;
                    }
                    
                    callback(message);
                });
            },
            
            getUser: function() {
                var obj = sessionStorage.getItem('user') || '{}';
                return JSON.parse(obj);
            },
            
            isAuthorized: function() {
                return this.getUser().token ? true : false;
            },
        
            clear: function() {
                sessionStorage.setItem('user', '{}');
            }
        };

    return auth;
});