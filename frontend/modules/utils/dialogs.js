angular.module('starterapp').factory('dialogs',function($mdMedia, $mdDialog) {
    return {
        show: function(controllerName, templateUrl, event, locals) {
            var useFullScreen = $mdMedia('sm') || $mdMedia('xs');

            return $mdDialog.show({
                controller: controllerName,
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                targetEvent: event,
                fullscreen: useFullScreen,
                locals: locals
            });
        },
        
        alert: function(text) {
            var alert = $mdDialog.alert({
                    title: 'Atenção',
                    textContent: text,
                    theme: 'default',
                    ok: 'Fechar'
                });
            
            $mdDialog
                .show( alert )
                .finally(function() {
                    alert = undefined;
                });
        }
    };
});