angular.module('starterapp').controller('MainCtrl', function($scope, $mdSidenav, auth) {
    $scope.usuario = auth.getUser();
    
    $scope.isDeveloper = function() {
        return $scope.usuario.grupo !== 'users';
    };
    
    $scope.toggleMenu = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
});
