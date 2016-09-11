angular.module('starterapp').controller('CriarCtrl', function($scope, $state, $mdToast, auth) {
    $scope.usuario = {};
    
    $scope.arePassEquals = function() {
        return $scope.usuario.senha === $scope.usuario.confirmaSenha;
    };
    
    $scope.create = function() {
        var user = $scope.usuario;
        
        if (user.senha !== user.confirmaSenha) {
            $scope.newfrm.confirmaSenha.$setValidity('isEqual', false);
            return;
        }
        
        if (!$scope.newfrm.$dirty || !$scope.newfrm.$valid) {
            return;
        }
        
        auth.create(user, function(err) {
            if (err) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(err)
                        .position('bottom center')
                        .hideDelay(5000)
                );
                return;
            }
            
            $state.go('app.home');
        });
    };
});