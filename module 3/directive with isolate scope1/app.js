(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController1',ShoppingListController1)
    .controller('ShoppingListController2',ShoppingListController2)
    .factory('ShoppnigListFactory',ShoppnigListFactory)
    .directive('shoppingList', ShoppingList);

    function ShoppingList(){

        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                list: '=myList',
                title: '@title'
            }
        };

        return ddo;
    }

    ShoppingListController1.$inject=['ShoppnigListFactory'];
    function ShoppingListController1(ShoppnigListFactory){
        var list = this;
        
        var shoppingList = ShoppnigListFactory();
        
        list.items = shoppingList.getItems();
        
        var origTitle = "Shopping list #1";
        list.title = origTitle + "(" + list.items.length + " items )";

        list.itemName = "";
        list.itemQuantity ="";

        list.addItem = function (){
        shoppingList.addItem(list.itemName,list.itemQuantity);
        list.title = origTitle + "(" + list.items.length + " items )";

        }
        list.removeItem = function (itemIndex){
        shoppingList.removeItem(itemIndex);
        list.title = origTitle + "(" + list.items.length + " items )";
        };
    }

    //LIST #2 - CONTROLLER
    ShoppingListController2.$inject['ShoppnigListFactory'];
    function ShoppingListController2(ShoppnigListFactory){
        var list = this;
        var shoppingList = ShoppnigListFactory(3);
        list.items = shoppingList.getItems();

        list.itemName = "";
        list.itemQuantity ="";

        list.addItem = function(){
            try{
                shoppingList.addItem(list.itemName, list.itemQuantity);
            }catch(error){
                list.errorMessage = error.message;
            }
        }

        list.removeItem = function(itemIndex){
            shoppingList.removeItem(itemIndex);
        };
    }

    function ShoppingListService(maxItems){
        var service = this;

        var items = [];

        service.addItem = function (itemName , quantity){
            if((maxItems === undefined) || (maxItems !== undefined)&&(items.length < maxItems)){
                var item = {
                    name : itemName,
                    quantity: quantity
                };
                items.push(item);
            }
            else{
                throw new Error("Max items (" + maxItems + ") reached.");
            }
            
        };

        service.getItems = function(){
            return items;
        };

        service.removeItem = function(itemIndex){
            items.splice(itemIndex , 1);
        };
    }

    function ShoppnigListFactory(){
        var factory = function (maxItems){
            return new ShoppingListService(maxItems);
        };
        return factory;
    }
})();