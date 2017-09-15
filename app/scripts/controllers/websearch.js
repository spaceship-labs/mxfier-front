'use strict';

/**
 * @ngdoc function
 * @name companyProfilerTrainerApp.controller:WebsearchCtrl
 * @description
 * # WebsearchCtrl
 * Controller of the companyProfilerTrainerApp
 */
angular.module('companyProfilerTrainerApp')
  .controller('WebsearchCtrl', websearchCtrl);

function websearchCtrl(profilerApi, $routeParams, $scope) {
  /* jshint validthis: true */
  var vm = this;

  vm.changeCategory = changeCategory;
  vm.getCategoryColor = getCategoryColor;
  vm.init = init;

  vm.loading = true;

  vm.init();

  function changeCategory(searchResult,category){
    searchResult.saving = true;
    profilerApi.saveSearchResultCategory(searchResult,category)
    .then(function(_searchResult){
      //searchResult.saving = false;
      angular.copy(_searchResult.plain(),searchResult);
      console.log(searchResult);
    });
  }

  function getCategoryColor(category){
    var index = vm.categories.findIndex(function(cat){
      //console.log(cat.label);
      return cat.tag === category;
    });
    if(index > -1){
      return 'label-color'+index;
    }
  }

  function init() {
    vm.searchId = $routeParams.searchId;

    profilerApi
      .getCategories()
      .then(setCategories);

    profilerApi
      .getWebSearch(vm.searchId)
      .then(setWebSearch)
      .then(profilerApi.getSearchResults)
      .then(function(results){
        vm.webSearch.searchResults = results;
      });
  }

  function setCategories(categories) {
    vm.categories = categories;
    return categories;
  }

  function setWebSearch(webSearch) {
    vm.loading = false;
    vm.webSearch = webSearch;
    return vm.webSearch.id;
  }





}
