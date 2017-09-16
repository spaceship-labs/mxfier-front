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

function entitiesCtrl(profilerApi, $location, $routeParams) {
  /* jshint validthis: true */
  var vm = this;

  vm.addEntity = addEntity;
  vm.autocomplete = autocomplete;
  vm.crawl = crawl;
  vm.init = init;
  vm.loading = true;

  vm.init();

  function addEntity(company) {
    if (company) {
      vm.creatingEntity = true;
      return profilerApi
        .createEntity({ name: company['proveedor_contratista'], ctbookId: company.id, })
        .then(function(entity) {
          vm.creatingEntity = false;
          $location.path('/entities/');
        })
        .catch(function(error){
          vm.creatingEntity = false;
          vm.entitySearch = '';
        });
    }
  }

  function autocomplete(text) {
    var params = {
      where: { 'proveedor_contratista': { contains: text } },
      limit: 20
    };
    return profilerApi.getCompanies(params);
  }

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
    profilerApi.getEntities(vm.page).then(setEntities);
    profilerApi.getEntitiesCount().then(setPagination);
  }

  function setPagination(count) {
    vm.pagination = {
      current: vm.page + 1,
      total: Math.ceil(count.count / 40)
    };
    vm.pagination.prev = vm.page > 0 ? vm.page : null;
    vm.pagination.next = vm.page < vm.pagination.total ? vm.page + 2 : null;
  }

  function setEntities(entities) {
    vm.loading = false;
    vm.entities = entities;
    return vm.entities;
  }




}
