'use strict';

/**
 * @ngdoc overview
 * @name companyProfilerTrainerApp
 * @description
 * # companyProfilerTrainerApp
 *
 * Main module of the application.
 */
angular
  .module('companyProfilerTrainerApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
