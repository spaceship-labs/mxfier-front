'use strict';
angular
  .module('companyProfilerTrainerApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'vm'
      })
      .when('/entities', {
        templateUrl: 'views/entities.html',
        controller: 'EntitiesCtrl',
        controllerAs: 'vm'
      })
      .when('/webSearch/:searchId', {
        templateUrl: 'views/websearch.html',
        controller: 'WebsearchCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
