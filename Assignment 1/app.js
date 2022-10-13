(function(){
    'use strict';
    angular.module('CalculatriceApp',[])

    .controller('CalculatriceController',CalculatriceController);
    CalculatriceController.$inject = ['$scope'];
    function CalculatriceController ($scope){
       $scope.text1="";
       $scope.result="";
      
       $scope.test = function(){
        $scope.words = $scope.text1.split(',');
        
        var x = $scope.words.length;
        if( $scope.text1=="" ){
            $scope.result ="Please enter data first"
        }
        
        else{
            if( x < 4){
                $scope.result ="Enjoy!"
            }
            else{
            $scope.result ="Too much!"}
            }
         
        
       };
    };
})();