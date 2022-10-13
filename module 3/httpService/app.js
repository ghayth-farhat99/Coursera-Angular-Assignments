(function() {
    'use strict';
 
 angular.module('MenuCategoriesApp', [])
 .controller('MenuCategoriesController', MenuCategoriesController)
 .service('MenuCategoriesService', MenuCategoriesService)
 .constant('ApiBasePath',"http://davids-restaurant.herokuapp.com");

 MenuCategoriesController.$inject = ['MenuCategoriesService'];
 function MenuCategoriesController(MenuCategoriesService){
    var menu = this;

    var promise = MenuCategoriesService.getMenuCategories();

    promise.then(function (response){
        menu.Categories = response.data;
    })
    .catch(function (error){
        console.log("Something went terribly wrong.");
    });

    menu.logMenuItems = function (shortName){
        var promise = MenuCategoriesService.getMenuForCategories(shortName);

        promise.then(function (response){
            console.log(response.data);
        })
        .catch(function (error){
            console.log(error);
        })
    };
 }

 MenuCategoriesService.$inject = ['$http','ApiBasePath']
 function MenuCategoriesService($http , ApiBasePath){
    var service = this;

    service.getMenuCategories = function (){
        var response = $http({
            method: "GET",
            url:(ApiBasePath + "/categories.json")
        });
        console.log(response);
        return response ;
    };

    service.getMenuForCategories = function (shortName){
        var response = $http({
            method: "GET",
            url:(ApiBasePath + "/menu_items.json"),
            params:{
                category: shortName
            }
        });
        return response;
    };
 }
})();