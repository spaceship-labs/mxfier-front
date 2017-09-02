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

function settingsCtrl(profilerApi, $q) {

  /* jshint validthis: true */
  var vm = this;

  vm.init = init;
  vm.initTestData = initTestData;
  vm.setRadialData = setRadialData;
  vm.test = test;

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

}
