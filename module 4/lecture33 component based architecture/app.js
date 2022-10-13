(function() {
    'use strict';

    angular.module('ShoppingListComponentApp', [])
    .controller('ShoppingListController',ShoppingListController)
    // .controller('ShoppingListController2',ShoppingListController2)
    // .controller('ShoppingListDirectivesController',ShoppingListDirectivesController)
    .factory('ShoppnigListFactory',ShoppnigListFactory)
    .component('shoppingList', {
        templateUrl: 'shoppingList.html',
        controller: ShoppingListComponentController,
        bindings:{
            items: '<',
            title: '@',
            onRemove: '&'
        } 
    });

    ShoppingListComponentController.$inject=['$scope','$element']
    function ShoppingListComponentController($scope,$element){
        var $ctrl = this;
        var totalItems ;

        $ctrl.cookiesInList = function(){
            for(var i = 0; i < $ctrl.items.length ; i++){
                var name = $ctrl.items[i].name;
                if(name.toLowerCase().indexOf('cookie') !== -1){
                    return true;
                }

            }
            return false;
        };

        $ctrl.Remove = function(myIndex) {
            $ctrl.onRemove({index : myIndex});
        };

        $ctrl.$onInit = function (){
            console.log("we are in $onInit()");
            totalItems = 0 ;
        };

        $ctrl.$onChanges = function (changeObj){
            console.log("chages : ", changeObj);
        };

        $ctrl.$doCheck = function (){
            if($ctrl.items.length !== totalItems){
                console.log("# of items change. checking for cookies! ")
                totalItems = $ctrl.items.length ;
                if($ctrl.cookiesInList()){
                    console.log("oh! NO! cookies!!!! ")
                    var warningElem = $element.find('div.error');
                    warningElem.slideDown(900);
                }
                else{
                    console.log("no cookies :) here")
                    var warningElem = $element.find('div.error');
                    warningElem.slideUp(900);
                }
            };
        };
    }

    ShoppingListController.$inject=['ShoppnigListFactory'];
    function ShoppingListController(ShoppnigListFactory){
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
        console.log('this is :' ,this);
        this.lastRemoved = "last item removed was " + this.items[itemIndex].name;
        shoppingList.removeItem(itemIndex);
        list.title = origTitle + "(" + list.items.length + " items )";
        };
    }

    // //LIST #2 - CONTROLLER
    // ShoppingListController2.$inject['ShoppnigListFactory'];
    // function ShoppingListController2(ShoppnigListFactory){
    //     var list = this;
    //     var shoppingList = ShoppnigListFactory(3);
    //     list.items = shoppingList.getItems();

    //     list.itemName = "";
    //     list.itemQuantity ="";

    //     list.addItem = function(){
    //         try{
    //             shoppingList.addItem(list.itemName, list.itemQuantity);
    //         }catch(error){
    //             list.errorMessage = error.message;
    //         }
    //     }

    //     list.removeItem = function(itemIndex){
    //         shoppingList.removeItem(itemIndex);
    //     };
    // }

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