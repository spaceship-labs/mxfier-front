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
      return Restangular.all('search').getList({ query: term, perPage: perPage, engine : engine }).then(this.returnResults, this.error);
    };

    this.getCategories = function() {
      return Restangular.all('category').getList();
    };

    this.saveLinks = function(links, query) {
      return Restangular.all('link/saveLinks').post({
        query: query,
        links: links
      });
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
