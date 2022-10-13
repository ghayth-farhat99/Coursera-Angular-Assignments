(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController',ShoppingListController)
    // .controller('ShoppingListController2',ShoppingListController2)
    // .controller('ShoppingListDirectivesController',ShoppingListDirectivesController)
    .factory('ShoppnigListFactory',ShoppnigListFactory)
    .directive('shoppingList', ShoppingList);

    function ShoppingList(){

        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                items: '<',
                title: '@',
                onRemove: '&'
            },            
            // controller: 'ShoppingListDirectivesController as list',
            controller: ShoppingListDirectivesController,
            controllerAs: 'list',
            bindToController: true,
            link: shoppingListDirectiveLink,
            transclude: true
        };

        return ddo;
    }

    function shoppingListDirectiveLink(scope,element,attrs,controller){
        console.log('link scope is :',scope);
        console.log('element is ', element);
        console.log('controller instance is :',controller);

        scope.$watch('list.cookiesInList()', function(newValue,oldValue){
            console.log('old value', oldValue);
            console.log('new value', newValue);

            if(newValue == true){
                displayCookieWarning();
            }
            else{
                removeCookieWarning();
            }
        });

        function displayCookieWarning(){
            // using angular jqlite 
            // var warningElem = element.find('div');
            // console.log(warningElem);
            // warningElem.css('display','block');

            //if jquery includer before anguar
            var warningElem = element.find('div.error');
            warningElem.slideDown(900);
        }
    
        function removeCookieWarning(){
            // using angular jqlite 
            // var warningElem = element.find('div');
            // warningElem.css('display','none');
            //if jquery includer before anguar
            var warningElem = element.find('div.error');
            warningElem.slideUp(900);
        }
    }


    function ShoppingListDirectivesController(){
        var list = this;

        list.cookiesInList = function(){
            for(var i = 0; i < list.items.length ; i++){
                var name = list.items[i].name;
                if(name.toLowerCase().indexOf('cookie') !== -1){
                    return true;
                }

            }
            return false;
        };
    }

    ShoppingListController.$inject=['ShoppnigListFactory'];
    function ShoppingListController(ShoppnigListFactory){
        var list = this;
        
        var shoppingList = ShoppnigListFactory();
        
        list.items = shoppingList.getItems();
        
        var origTitle = "Shopping list #1";
        list.title = origTitle + "(" + list.items.length + " items )";

        list.warning = "COOKIES DETECTED!";

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