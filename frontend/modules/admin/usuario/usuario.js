angular.module('starterapp').controller('UsuarioCtrl', function($scope, dialogs) {
    $scope.editUser = function(usuario) {
        dialogs.show('EditUserCtrl', 'modules/admin/usuario/cadastro.html',
            event, { usuario: usuario })
        .then(function(usuario) {
            if (usuario) {
                $scope.usuarios.save(usuario);
                $scope.usuarios.post();
            }
        });
    };
});