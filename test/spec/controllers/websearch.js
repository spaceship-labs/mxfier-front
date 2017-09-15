'use strict';

describe('Controller: WebsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('companyProfilerTrainerApp'));

  var WebsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebsearchCtrl = $controller('WebsearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebsearchCtrl.awesomeThings.length).toBe(3);
  });
});
