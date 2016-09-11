angular.module('starterapp').controller('EditUserCtrl', function($scope, $mdDialog, usuario) {
    $scope.usuario = usuario;
    
    $scope.cancel = function() {
        $mdDialog.hide();
    };
    
    $scope.save = function() {
        $mdDialog.hide($scope.usuario);
    };
});