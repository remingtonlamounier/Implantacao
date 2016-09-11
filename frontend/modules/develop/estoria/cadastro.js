angular.module('starterapp').controller('CadEstoriaCtrl', function($scope, $mdDialog, estoria) {
    $scope.estoria = estoria;
    
    $scope.cancel = function() {
        $mdDialog.hide();
    };
    
    $scope.save = function() {
        if ($scope.cadfrm.$valid) {
            $mdDialog.hide($scope.estoria);
        }
    };
});