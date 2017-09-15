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

function websearchCtrl(profilerApi, $routeParams) {
  /* jshint validthis: true */
  var vm = this;
  
  vm.init = init;

  vm.loading = true;

  vm.init();



  function init() {
    vm.searchId = $routeParams.searchId;
    profilerApi.getWebSearch(vm.searchId).then(function(webSearch) {
      vm.loading = false;
      vm.webSearch = webSearch;
    });
  }

}
