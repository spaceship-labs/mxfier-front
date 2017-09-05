'use strict';

/**
 * @ngdoc function
 * @name companyProfilerTrainerApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the companyProfilerTrainerApp
 */
angular.module('companyProfilerTrainerApp')
  .controller('SettingsCtrl', settingsCtrl);

function settingsCtrl(profilerApi, $q, $scope, $mdDialog) {

  /* jshint validthis: true */
  var vm = this;

  vm.init = init;
  vm.initTestData = initTestData;
  vm.setRadialData = setRadialData;
  vm.createCategory = createCategory;
  vm.test = test;
  vm.newCategory = {};

  vm.testsToRun = 20;

  vm.init();

  function init() {
    vm.initTestData();
    profilerApi
      .linkStats()
      .then(setRadialData);
  }

  function initTestData(){
    vm.testStats = {
      totalErrors : 0,
      totalTested : 0,
      series: ['Test #', 'Aggregate'],
      labels: [],
      data: [
        [],
        []
      ]
    };
  }

  function setRadialData(stats) {
    vm.dataStats = {
      labels: [],
      data: [],
      total: 0
    };

    stats.forEach(function(stat) {
      vm.dataStats.labels.push(stat.category.label);
      vm.dataStats.data.push(stat.count);
      vm.dataStats.total += stat.count;
    });

  }

  function test() {
    vm.initTestData();
    var tasks = [];
    for (var i = 0; i < vm.testsToRun; i++) {
      profilerApi._test().then(aggregateTestResult);
    }
    
  }

  function aggregateTestResult(result) {
    vm.testStats.totalErrors += result.errors;
    vm.testStats.totalTested += result.totalTested;
    vm.testStats.labels.push(vm.testStats.labels.length+1);
    vm.testStats.data[0].push(result.errors/result.totalTested*100);
    vm.testStats.data[1].push(100-vm.testStats.totalErrors/vm.testStats.totalTested*100);
  }

  function createCategory(){
    vm.isCreatingCategory = true;
    profilerApi.createCategory(vm.newCategory)
      .then(function(createdCategory){
        vm.isCreatingCategory = false;
        showOkAlert(null, 'Categoria creada', 'Se creo la categoria "'+ createdCategory.label+'"');
        vm.newCategory = {};
      })
      .catch(function(err){
        vm.isCreatingCategory = false;
        console.log('err',err);
      });
  }

  function showOkAlert(ev, title, text) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title(title)
        .textContent(text)
        .ariaLabel('Alert Dialog Demo')
        .ok('Ok')
        .targetEvent(ev)
    );
  };

  $scope.$watch('vm.newCategory.label',function(newVal, oldVal){
    if(newVal !== oldVal){
      vm.newCategory.tag = slugify(newVal);
    }
  })

  function slugify(text){
    if(!text){
      return false;
    }

    text = text.trim();
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

}
