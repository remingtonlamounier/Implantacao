describe('DevEstoriaCtrl', function() {

    beforeEach(module('starterapp'));

    var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('DevEstoriaCtrl', {$scope: scope});
    }));

    it('should ...', inject(function() {

        expect(1).toEqual(1);
        
    }));

});
