angular.module('starterapp', ['ui.router', 'ngMaterial', 'ngMask'])

.constant('URLS', {
    'BACKEND': 'http://' + (location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 'localhost:1337' : location.hostname)
})

.config(function($stateProvider, $urlRouterProvider, $mdIconProvider, $mdThemingProvider) {
    $stateProvider.state('criar', {
        url: '/criar',
        templateUrl: 'modules/login/criar.html'
    });

    $stateProvider.state('login', {
        url: '/login/:unauthorized',
        templateUrl: 'modules/login/login.html'
    });
    
    $stateProvider.state('app', {
        templateUrl: 'modules/main.html',
        controller: 'MainCtrl'
    });
        
    $stateProvider.state('app.home', {
        url: '/home',
        templateUrl: 'modules/home/home.html',
        resolve: {
            atividades: function(dao) {
                return dao.feed();
            },
            projetos: function(dao) {
                return dao.getProjetos();
            }
        },
        controller: function($scope, atividades, projetos) {
            $scope.atividades = atividades;
            $scope.projetos = projetos;
        },
        roles: ['users','develops','admins']
    });
    
    $stateProvider.state('app.projeto', {
        url: '/projetos',
        templateProvider: ['$templateFactory', 'auth', function($templateFactory, auth) {
            var isDeveloper = auth.getUser().grupo === 'develops' || auth.getUser().grupo === 'admins',
                url = isDeveloper ? 'modules/develop/projeto/projeto.html' : 'modules/projeto/projeto.html';
            return $templateFactory.fromUrl(url);
        }],
        resolve: {
            projetos: function(auth, dao) {
                if (auth.getUser().grupo === 'users') {
                    return dao.getProjetos();
                }
                return dao.projPendentes();
            }
        },
        controller: function($scope, projetos) {
            $scope.projetos = projetos;
        },
        roles: ['users','develops','admins']
    });

    $stateProvider.state('app.estoria', {
        url: '/projeto/:id',
        templateUrl: 'modules/develop/estoria/estoria.html',
        resolve: {
            estorias: function(dao) {
                return dao.getEstorias();
            },
            projeto: function($stateParams, dao) {
                return dao.projPendentes().then(function(results) {
                    var index = results.indexOfKey('id', parseInt($stateParams.id));
                    return results[index];
                });
            }
        },
        controller: function($scope, estorias, projeto) {
            $scope.estorias = estorias;
            $scope.projeto = projeto;
        },
        roles: ['develops','admins']
    });
    
    $stateProvider.state('app.usuario', {
        url: '/usuarios',
        templateUrl: 'modules/admin/usuario/usuario.html',
        resolve: {
            usuarios: function(dao) {
                return dao.getUsuarios();
            }
        },
        controller: function($scope, usuarios) {
            $scope.usuarios = usuarios;
        },
        roles: ['admins']
    });
    
    /* Add New States Above */
    
    $mdIconProvider.defaultFontSet( 'fa' );
    
    $mdThemingProvider.theme('default').primaryPalette('blue');

    $urlRouterProvider.otherwise('/home');
})

.run(function($rootScope, $state, auth) {
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $rootScope.charsAt = function(text, len) {
        return text.length < len ? text : text.substring(0, len) + '...';
    };
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        var role = auth.getUser().grupo;
        
        if (toState.roles && toState.roles.indexOf(role) === -1) {
            event.preventDefault();
            $state.transitionTo('login');
        }
    });
    
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
        if ([401,403].indexOf(error.code) > -1) {
            auth.clear();
            return $state.go('login', { unauthorized: true });
        }
        console.error(error);
//        $state.transitionTo('error');
    });
});