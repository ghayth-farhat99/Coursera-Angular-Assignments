(function(){
  "use strict";

angular.module('public')
.controller('signUpController', signUpController);

signUpController.$inject = ['MenuService','$state'];
function signUpController(MenuService,$state) {
  var $ctrl = this;

  $ctrl.user= {};
  $ctrl.favoriteDich = {};

  $ctrl.showError = false;       // When this value is true error about the favorite dish wiil be shown
  $ctrl.showMessage = false;     // When this value is true message about successfull signup will be shown

  $ctrl.submit = function(form) {
      $ctrl.showError = false;
      $ctrl.showMessage = false;
      
      $ctrl.completed = true;
      MenuService.getFavoriteDish($ctrl.user.favoriteDish).then(function(response) {
        $ctrl.user.favoriteDishDetails = response.data;
        console.log($ctrl.favoriteDish);
        MenuService.saveUser($ctrl.user);
        $state.go('public.auth');
        $ctrl.showMessage = true;
    }, function(error) {
        console.log(error);
        $ctrl.showError = true;
    });
  };

}

})()