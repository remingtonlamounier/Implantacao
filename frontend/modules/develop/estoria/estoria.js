angular.module('starterapp').controller('DevEstoriaCtrl',function($scope, $stateParams, dialogs){
    var save = function(estoria) {
        if (estoria) {
            estoria.projeto = $scope.projeto.id;
            $scope.estorias.save(estoria);
            $scope.estorias.post();
        }
    };
        
    $scope.addStory = function(event) {
        dialogs.show('CadEstoriaCtrl', 'modules/develop/estoria/cadastro.html',
            event, { estoria: {} }).then(save);
    };
    
    $scope.editStory = function(event, item) {
        dialogs.show('CadEstoriaCtrl', 'modules/develop/estoria/cadastro.html',
            event, { estoria: item }).then(save);
    };
    
    $scope.delStory = function(event, item) {
        $scope.estorias.delete(item);
        $scope.estorias.post();
    };
});