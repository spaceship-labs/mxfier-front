'use strict';
/**
 * @ngdoc service
 * @name companyProfilerTrainerApp.profilerApi
 * @description
 * # profilerApi
 * Service in the companyProfilerTrainerAp = function(){};
 */
angular.module('companyProfilerTrainerApp')
  .service('profilerApi', function(Restangular, $http) {

    this.error = function(error) {
      return [];
    };

    this.returnResults = function(results) {
      return results;
    };

    this.search = function(term, perPage, engine) {
      if (!engine) {
        engine = 'google';
      }
      return Restangular.all('search')
        .getList({ query: term, perPage: perPage, engine: engine })
        .then(this.returnResults, this.error);
    };

    this.createEntity = function(entity) {
      return Restangular.all('entity').post(entity);
    };

    this.classifyWebSearch = function(webSearchId){
      return Restangular.all('webSearch/classify').getList({webSearchId:webSearchId});
    };

    this.getCategories = function() {
      return Restangular.all('category').getList();
    };

    this.getCompanies = function(params) {
      return $http.get('https://ctbook-api.herokuapp.com/empresa/', { params: params })
        .then(function(res) {
          return res.data;
        });
    };

    this.getEntities = function(page) {
      page = page ? page : 0;
      var skip = page * 40;
      return Restangular.all('entity')
        .getList({ populate: 'webSearches', limit: 40, skip: skip, sort: 'createdAt DESC' });
    };

    this.getEntitiesCount = function() {
      return Restangular.one('entity/count').get();
    };

    this.getWebSearch = function(searchId) {
      return Restangular.one('webSearch', searchId).get();
    };

    this.getSearchResults = function(searchId) {
      return Restangular.one('webSearch', searchId).getList('searchResults', { limit: 50, sort: 'pageRank' });
    };

    this.createCategory = function(category) {
      return Restangular.all('category').post(category);
    };

    this.saveLinks = function(links, query) {
      return Restangular.all('link/saveLinks').post({
        query: query,
        links: links
      });
    };

    this.saveSearch = function(entityId, searchEngine) {
      return Restangular.all('entity/saveSearch').post({
        entityId: entityId,
        searchEngine: searchEngine
      });
    };

    this.saveSearchResultCategory = function(searchResult, category) {
      var tag = category ? category.tag : null;
      return Restangular.one('searchResult').post(searchResult.id, { category: tag });
    };

    this.linkStats = function() {
      return Restangular.all('link/stats').getList();
    };

    this._test = function() {
      return Restangular.one('main/test').get();
    };

    this.getLinks = function(links) {
      return Restangular.all('link').getList({ where: { link: links }, limit: 1000 });
    };

    this.classify = function(link) {
      return Restangular.all('classify').post({ link: link.plain() });
    };

    this.randomCompany = function() {
      var count = 253491;
      var skip = Math.floor(Math.random() * count);
      return $http.get('https://ctbook-api.herokuapp.com/empresa/', { params: { limit: 1, skip: skip } });
    };

  });
