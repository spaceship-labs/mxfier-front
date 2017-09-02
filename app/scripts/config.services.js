'use strict';
angular
  .module('companyProfilerTrainerApp')

  .config(function(RestangularProvider) {
    //RestangularProvider.setBaseUrl('http://ctbook-api.herokuapp.com/');
    RestangularProvider.setBaseUrl('http://localhost:1337/');
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });
