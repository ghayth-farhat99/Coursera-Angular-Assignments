(function() {
    'use strict';

    var shoppingList = [
        {
            name: "milk",
            quantity: "2" 
        },
        {
            name: "cookies",
            quantity: "500" 
        },
        {
            name: "chocolate",
            quantity: "10"
        },
        {
            name: "banana",
            quantity: "3" 
        },
        {
            name: "sparkling water",
            quantity: "2" 
        }
    ];
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService )

    ToBuyController.$inject=['ShoppingListCheckOffService', '$scope'];
    function ToBuyController(ShoppingListCheckOffService , $scope ){
        var toBuyList = this ;

        $scope.shoppingList = shoppingList ;

        toBuyList.items = ShoppingListCheckOffService.getItems();

        toBuyList.removeItem = function(itemIndex){
            ShoppingListCheckOffService.removeItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService ){
        var AlreadyBoughtList = this;

        AlreadyBoughtList.items = ShoppingListCheckOffService.getItems();
        
    }

    function ShoppingListCheckOffService (){
        var service = this;

        var items = [];

        
        service.removeItem = function(itemIndex){
            var item = {
                name : shoppingList[itemIndex].name,
                quantity: shoppingList[itemIndex].quantity
            };
            items.push(item);
            shoppingList.splice(itemIndex , 1);
            
        };

        service.getItems = function(){
            return items;
        };
    }
})();