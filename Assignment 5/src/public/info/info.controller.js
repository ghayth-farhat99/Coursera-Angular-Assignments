(function() {
    'use strict';
    angular.module('public').controller('InfoController', infoController);

    infoController.$inject = ['MenuService', 'ApiPath'];
    function infoController (MenuService, ApiPath) {
        var $ctrl = this;
        $ctrl.apiPath = ApiPath;

        $ctrl.signedUp = false;

        $ctrl.user = MenuService.getUser();
        console.log('User is', $ctrl.user);
        if (angular.equals($ctrl.user, {})) {
            $ctrl.signedUp = false;
        } else {
            $ctrl.signedUp = true;
        }
    };

})();