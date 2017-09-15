'use strict';

/**
 * @ngdoc function
 * @name companyProfilerTrainerApp.controller:EntitiesCtrl
 * @description
 * # EntitiesCtrl
 * Controller of the companyProfilerTrainerApp
 */
angular.module('companyProfilerTrainerApp')
  .controller('EntitiesCtrl', entitiesCtrl);

function entitiesCtrl(profilerApi,$location) {
  /* jshint validthis: true */
  var vm = this;

  vm.crawl = crawl;
  vm.init = init;
  vm.loading = true;

  vm.init();

  function crawl(entity, searchEngine) {
    entity.searching = true;
    profilerApi.saveSearch(entity.id,searchEngine).then(function(webSearch){
      entity.searching = false;
      $location.path('/webSearch/'+webSearch.id);
    });
  }

  function init() {
    profilerApi
      .getEntities()
      .then(function(entities) {
        vm.loading = false;
        vm.entities = entities;
      });
  }





}
