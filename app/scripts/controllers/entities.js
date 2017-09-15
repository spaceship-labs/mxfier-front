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

function entitiesCtrl(profilerApi, $location,$routeParams) {
  /* jshint validthis: true */
  var vm = this;

  vm.crawl = crawl;
  vm.init = init;
  vm.loading = true;

  vm.init();

  function crawl(entity, searchEngine) {
    entity.searching = true;
    profilerApi
      .saveSearch(entity.id, searchEngine)
      .then(function(webSearch) {
        entity.searching = false;
        $location.path('/webSearch/' + webSearch.id);
      });
  }

  function init() {
    vm.page = $routeParams.page ? $routeParams.page - 1 : 0;
    profilerApi
      .getEntities(vm.page)
      .then(setEntities);

    profilerApi.getEntitiesCount().then(setPagination);

  }

  function setPagination(count){
    vm.pagination = {
      current : vm.page + 1,
      total : Math.ceil(count.count/30)
    };
    vm.pagination.prev = vm.page > 0 ? vm.page : null;
    vm.pagination.next = vm.page < vm.pagination.total ?  vm.page + 2 : null;
    console.log(vm.pagination);
    //console.log(count.count);
  }

  function setEntities(entities) {
    vm.loading = false;
    vm.entities = entities;
    return vm.entities;
  }




}
