'use strict';
angular
  .module('companyProfilerTrainerApp')

  .config(function(RestangularProvider) {
    //RestangularProvider.setBaseUrl('http://ctbook-api.herokuapp.com/');
    RestangularProvider.setBaseUrl('http://localhost:1337/');
  });
