'use strict';

/**
 * @ngdoc function
 * @name companyProfilerTrainerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the companyProfilerTrainerApp
 */
angular.module('companyProfilerTrainerApp')
  .controller('MainCtrl', mainCtrl);

function mainCtrl(profilerApi) {
  /* jshint validthis: true */
  var vm = this;

  vm.changeCategory = changeCategory;
  vm.classify = classify;
  vm.findLink = findLink;
  vm.getHostname = getHostname;
  vm.randomCompany = randomCompany;
  vm.saveClassification = saveClassification;
  vm.normalizeResults = normalizeResults;
  vm.search = search;
  vm.setResults = setResults;
  vm.init = init;

  vm.loading = false;
  vm.saving = false;
  vm.perPage = 10;
  vm.searchEngine = 'bing';

  vm.init();

  function init() {
    profilerApi
      .getCategories()
      .then(setCategories);

    vm.randomCompany();
  }

  function classify(link) {
    profilerApi.classify(link).then(function(res) {
      console.log(res);
    });
  }

  function findLink(link) {
    var result = false;
    if (vm.links) {
      result = vm.links.find(function(_link) {
        return _link.link === link.link;
      });
    }
    return result;
  }

  function getLinks() {
    var links = vm.results.map(function(result) {
      return result.link;
    });
    return profilerApi.getLinks(links);
  }

  function changeCategory(result) {
    result.category = result.category >= vm.categories.length - 1 ? -1 : result.category + 1;
  }

  function randomCompany() {
    profilerApi.randomCompany().then(function(response){
      var company = response.data[0];
      vm.searchTerm = '"' + company['proveedor_contratista'] + '"';
    });
  }

  function saveClassification() {
    vm.saving = true;
    var results = vm.results.map(normalizeResults);
    profilerApi.saveLinks(results, vm.searchTerm).then(function(response) {
      vm.saving = false;
    });
  }

  function search() {
    profilerApi
      .search(vm.searchTerm, vm.perPage, vm.searchEngine)
      .then(vm.setResults)
      .then(getLinks)
      .then(setLinks);
    vm.loading = true;
  }

  function setLinks(links) {
    vm.links = links;
  }

  function setResults(results) {
    vm.results = results;
    var mapper = getMapperBySearchEngine(vm.searchEngine);
    vm.results.map(mapper);
    vm.loading = false;
  }

  function getMapperBySearchEngine(searchEngine){
    var mapper;
    if(searchEngine === 'bing'){
      mapper = bingResultMapper;
    }
    if(searchEngine === 'ddg'){
      mapper = ddgResultMapper;
    }
    else{
      mapper = googleResultMapper;
    }
    return mapper;
  }

  function setCategories(categories) {
    vm.categories = categories;
    return categories;
  }

  function normalizeResults(result) {
    var copy = result.plain();
    if (result.category === -1) {
      delete copy.category;
    } else {
      copy.category = vm.categories[result.category].tag;
    }
    return copy;
  }

}

function bingResultMapper(result, key) {
  //var result = result.plain();
  result.link = result.url;
  result.href = result.displayUrl;
  result.title = result.name;
  result.description = result.snippet;
  result.pagerank = key + 1;
  result.category = -1;
  result.hostname = getHostname(result.href);
  return result;
}

function googleResultMapper(result, key) {
  //var result = result.plain();
  result.pagerank = key + 1;
  result.category = -1;
  result.hostname = getHostname(result.href);
  return result;
}

function ddgResultMapper(result, key) {
  //var result = result.plain();
  result.pagerank = key + 1;
  result.category = -1;
  result.link = result.url;
  result.hostname = getHostname(result.href);
  return result;
}

function getHostname(data) {
  var a = document.createElement('a');
  a.href = data;
  return a.hostname;
}
