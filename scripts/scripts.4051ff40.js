"use strict";function mainCtrl(a){function b(){a.getCategories().then(m),o.randomCompany()}function c(b){a.classify(b).then(function(a){console.log(a)})}function d(a){var b=!1;return o.links&&(b=o.links.find(function(b){return b.link===a.link})),b}function e(){var b=o.results.map(function(a){return a.link});return a.getLinks(b)}function f(a){a.category=a.category>=o.categories.length-1?-1:a.category+1}function g(){a.randomCompany().then(function(a){var b=a.data[0];o.searchTerm='"'+b.proveedor_contratista+'"'})}function h(){o.saving=!0;var b=o.results.map(n);a.saveLinks(b,o.searchTerm).then(function(a){o.saving=!1})}function i(){a.search(o.searchTerm,o.perPage,o.searchEngine).then(o.setResults).then(e).then(j),o.loading=!0}function j(a){o.links=a}function k(a){o.results=a;var b=l(o.searchEngine);o.results.map(b),o.loading=!1}function l(a){var b;return b="bing"===a?bingResultMapper:"ddg"===a?ddgResultMapper:googleResultMapper}function m(a){return o.categories=a,a}function n(a){var b=a.plain();return-1===a.category?delete b.category:b.category=o.categories[a.category].tag,b}var o=this;o.changeCategory=f,o.classify=c,o.findLink=d,o.getHostname=getHostname,o.randomCompany=g,o.saveClassification=h,o.normalizeResults=n,o.search=i,o.setResults=k,o.init=b,o.loading=!1,o.saving=!1,o.perPage=10,o.searchEngine="bing",o.init()}function bingResultMapper(a,b){return a.link=a.displayUrl,a.href=a.displayUrl,a.title=a.name,a.description=a.snippet,a.pagerank=b+1,a.category=-1,a.hostname=getHostname(a.href),a}function googleResultMapper(a,b){return a.pagerank=b+1,a.category=-1,a.hostname=getHostname(a.href),a}function ddgResultMapper(a,b){return a.pagerank=b+1,a.category=-1,a.link=a.url,a.hostname=getHostname(a.href),a}function getHostname(a){var b=document.createElement("a");return b.href=a,b.hostname}function settingsCtrl(a,b,c,d){function e(){m.initTestData(),a.linkStats().then(g)}function f(){m.testStats={totalErrors:0,totalTested:0,series:["Test #","Aggregate"],labels:[],data:[[],[]]}}function g(a){m.dataStats={labels:[],data:[],total:0},a.forEach(function(a){m.dataStats.labels.push(a.category.label),m.dataStats.data.push(a.count),m.dataStats.total+=a.count})}function h(){m.initTestData();for(var b=0;b<m.testsToRun;b++)a._test().then(i)}function i(a){m.testStats.totalErrors+=a.errors,m.testStats.totalTested+=a.totalTested,m.testStats.labels.push(m.testStats.labels.length+1),m.testStats.data[0].push(a.errors/a.totalTested*100),m.testStats.data[1].push(100-m.testStats.totalErrors/m.testStats.totalTested*100)}function j(){m.isCreatingCategory=!0,a.createCategory(m.newCategory).then(function(a){m.isCreatingCategory=!1,k(null,"Categoria creada",'Se creo la categoria "'+a.label+'"'),m.newCategory={}})["catch"](function(a){m.isCreatingCategory=!1,console.log("err",a)})}function k(a,b,c){d.show(d.alert().clickOutsideToClose(!0).title(b).textContent(c).ariaLabel("Alert Dialog Demo").ok("Ok").targetEvent(a))}function l(a){return a?(a=a.trim(),a.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")):!1}var m=this;m.init=e,m.initTestData=f,m.setRadialData=g,m.createCategory=j,m.test=h,m.newCategory={},m.testsToRun=20,m.init(),c.$watch("vm.newCategory.label",function(a,b){a!==b&&(m.newCategory.tag=l(a))})}function entitiesCtrl(a,b){function c(c,d){c.searching=!0,a.saveSearch(c.id,d).then(function(a){c.searching=!1,b.path("/webSearch/"+a.id)})}function d(){a.getEntities().then(function(a){e.loading=!1,e.entities=a})}var e=this;e.crawl=c,e.init=d,e.loading=!0,e.init()}function websearchCtrl(a,b,c){function d(b,c){b.saving=!0,a.saveSearchResultCategory(b,c).then(function(a){angular.copy(a.plain(),b),console.log(b)})}function e(a){var b=i.categories.findIndex(function(b){return b.tag===a});return b>-1?"label-color"+b:void 0}function f(){i.searchId=b.searchId,a.getCategories().then(g),a.getWebSearch(i.searchId).then(h).then(a.getSearchResults).then(function(a){i.webSearch.searchResults=a})}function g(a){return i.categories=a,a}function h(a){return i.loading=!1,i.webSearch=a,i.webSearch.id}var i=this;i.changeCategory=d,i.getCategoryColor=e,i.init=f,i.loading=!0,i.init()}angular.module("companyProfilerTrainerApp",["ngAnimate","ngAria","ngCookies","ngRoute","ngSanitize","restangular","ngMaterial","chart.js"]),angular.module("companyProfilerTrainerApp").config(["RestangularProvider",function(a){a.setBaseUrl("http://localhost:1337/")}]).config(["$mdThemingProvider",function(a){a.theme("dark-grey").backgroundPalette("grey").dark(),a.theme("dark-orange").backgroundPalette("orange").dark(),a.theme("dark-purple").backgroundPalette("deep-purple").dark(),a.theme("dark-blue").backgroundPalette("blue").dark()}]),angular.module("companyProfilerTrainerApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).when("/settings",{templateUrl:"views/settings.html",controller:"SettingsCtrl",controllerAs:"vm"}).when("/entities",{templateUrl:"views/entities.html",controller:"EntitiesCtrl",controllerAs:"vm"}).when("/webSearch/:searchId",{templateUrl:"views/websearch.html",controller:"WebsearchCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]),angular.module("companyProfilerTrainerApp").service("profilerApi",["Restangular","$http",function(a,b){this.error=function(a){return[]},this.returnResults=function(a){return a},this.search=function(b,c,d){return d||(d="google"),a.all("search").getList({query:b,perPage:c,engine:d}).then(this.returnResults,this.error)},this.getCategories=function(){return a.all("category").getList()},this.getEntities=function(){return a.all("entity").getList({populate:"webSearches",limit:50})},this.getWebSearch=function(b){return a.one("webSearch",b).get()},this.getSearchResults=function(b){return a.one("webSearch",b).getList("searchResults",{limit:50,sort:"pageRank"})},this.createCategory=function(b){return a.all("category").post(b)},this.saveLinks=function(b,c){return a.all("link/saveLinks").post({query:c,links:b})},this.saveSearch=function(b,c){return a.all("entity/saveSearch").post({entityId:b,searchEngine:c})},this.saveSearchResultCategory=function(b,c){var d=c?c.tag:null;return a.one("searchResult").post(b.id,{category:d})},this.linkStats=function(){return a.all("link/stats").getList()},this._test=function(){return a.one("main/test").get()},this.getLinks=function(b){return a.all("link").getList({where:{link:b},limit:1e3})},this.classify=function(b){return a.all("classify").post({link:b.plain()})},this.randomCompany=function(){var a=253491,c=Math.floor(Math.random()*a);return b.get("https://ctbook-api.herokuapp.com/empresa/",{params:{limit:1,skip:c}})}}]),angular.module("companyProfilerTrainerApp").controller("MainCtrl",mainCtrl),mainCtrl.$inject=["profilerApi"],angular.module("companyProfilerTrainerApp").controller("SettingsCtrl",settingsCtrl),settingsCtrl.$inject=["profilerApi","$q","$scope","$mdDialog"],angular.module("companyProfilerTrainerApp").controller("EntitiesCtrl",entitiesCtrl),entitiesCtrl.$inject=["profilerApi","$location"],angular.module("companyProfilerTrainerApp").controller("WebsearchCtrl",websearchCtrl),websearchCtrl.$inject=["profilerApi","$routeParams","$scope"],angular.module("companyProfilerTrainerApp").run(["$templateCache",function(a){a.put("views/category-create-form.html",'<md-content> <md-card flex="50" class="md-padding"> <md-card-title> <md-card-title-text> <span class="md-headline">Crear categoria</span> <p ng-if="vm.isCreatingCategory">Creando categoria...</p> <form ng-if="!vm.isCreatingCategory" ng-submit="vm.createCategory()" flex layout-wrap> <md-input-container flex> <label>Label</label> <input ng-model="vm.newCategory.label" required> </md-input-container> <md-input-container flex> <label>Tag</label> <input ng-model="vm.newCategory.tag" disabled required> </md-input-container> <md-button class="md-raised md-primary" type="submit">Crear categoria</md-button> </form> </md-card-title-text> </md-card-title> </md-card> </md-content>'),a.put("views/entities.html",'<div layout="column" layout-align="center" flex> <md-toolbar> <div class="md-toolbar-tools" layout="row"> <h3 flex><a href="#!/">Web Content Classifier</a> / Entities</h3> <md-button aria-label="Back" href="#!/"> <i class="material-icons">arrow_back</i></md-button> </div> </md-toolbar> <md-content flex layout="row" layout-wrap class="md-padding"> <div class="progressContainer" ng-show="vm.loading"> <md-progress-linear md-mode="query"></md-progress-linear> <div class="bottom-block"> <span>Cargando Entidades...</span> </div> </div> <div class="list-item-cont" ng-show="!vm.loading" flex> <md-list flex> <md-list-item class="md-2-line" layout="row" ng-repeat="entity in vm.entities"> <div class="md-list-item-text" flex> <h3>{{entity.name}}</h3> <p ng-repeat="webSearch in entity.webSearches"><a ng-href="#!/webSearch/{{webSearch.id}}">{{webSearch.term}} - <span ng-class="webSearch.searchEngine">{{ webSearch.searchEngine}} </span>{{webSearch.createdAt | date : \'short\'}}</a> </p> </div> <div class="buttons"> <md-button ng-disabled="entity.searching" ng-click="vm.crawl(entity,&quot;bing&quot;)" class="md-fab bing">Bing</md-button> <md-button ng-disabled="entity.searching" ng-click="vm.crawl(entity,&quot;ddg&quot;)" class="md-fab ddg">DDG</md-button> <md-button ng-disabled="entity.searching" ng-click="vm.crawl(entity,&quot;google&quot;)" class="md-fab google">Google</md-button> </div> </md-list-item> </md-list> </div> </md-content> </div>'),a.put("views/main.html",'<div layout="column" layout-align="center" id="mainContainer" flex> <md-toolbar> <div class="md-toolbar-tools" layout="row"> <h3 flex><a href="#!/">Web Content Classifier</a></h3> <md-button aria-label="Entities" href="#!/entities"> <i class="material-icons">business</i></md-button> <md-button aria-label="Settings" href="#!/settings"> <i class="material-icons">settings</i></md-button> <md-button aria-label="Get Random" ng-click="vm.randomCompany()"> <i class="material-icons">autorenew</i></md-button> <md-button aria-label="Save" ng-click="vm.saveClassification()" ng-disabled="!vm.results"> <i class="material-icons">save</i></md-button> </div> </md-toolbar> <md-content flex> <form ng-submit="vm.search()" flex layout="row" layout-wrap> <md-input-container flex> <label>Search Term</label> <input ng-model="vm.searchTerm"> </md-input-container> <md-input-container> <label>Max Results</label> <input ng-model="vm.perPage"> </md-input-container> <label></label> <md-radio-group ng-model="vm.searchEngine" class="md-padding"> <md-radio-button value="google">Google</md-radio-button> <md-radio-button value="bing"> Bing</md-radio-button> <md-radio-button value="ddg"> DDG</md-radio-button> </md-radio-group> <md-button class="md-raised md-primary" type="submit">Search</md-button> </form> <md-list flex ng-show="!(vm.loading || !vm.results.length)"> <md-subheader class="md-no-sticky">Search Results for {{vm.searchTerm}}</md-subheader> <div layout="row" ng-repeat="(key,result) in vm.results" class="list-item-cont" ng-class="vm.findLink(result).category"> <div class="tip"> <md-button class="md-raised md-mini md-primary" aria-label="Save" ng-click="vm.classify(result)"> <i class="material-icons">class</i></md-button> </div> <md-list-item flex class="md-3-line" ng-click="vm.changeCategory(result)"> <div class="md-list-item-text" layout="row"> <div class="list-number md-padding"> {{ result.pagerank }} </div> <div flex> <h3>{{ result.title }}</h3> <h4>{{ result.link }}</h4> <p>{{ result.description }}</p> </div> <div ng-class="vm.categories[result.category].tag" class="classification label" layout-align="center center" layout="row">{{vm.categories[result.category].label}}</div> <div> </div> </div> </md-list-item> </div> </md-list> <div layout="row" layout-sm="column" layout-align="space-around" ng-show="vm.loading"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> </md-content> </div>'),a.put("views/settings.html",'<div layout="column" layout-align="center" flex> <md-toolbar> <div class="md-toolbar-tools" layout="row"> <h3 flex><a href="#!/">Web Content Classifier</a> / Settings</h3> <md-button aria-label="Back" href="#!/"> <i class="material-icons">arrow_back</i></md-button> </div> </md-toolbar> <md-content flex layout="row" layout-wrap> <md-card class="md-padding"> <md-card-title> <md-card-title-text> <span class="md-headline">Training Dataset</span> </md-card-title-text> </md-card-title> <md-card-title-media flex> <h4>{{ vm.dataStats.total }} entries</h4> <canvas class="chart chart-doughnut" chart-data="vm.dataStats.data" chart-labels="vm.dataStats.labels"> </canvas> </md-card-title-media> </md-card> <md-card flex="50" class="md-padding"> <md-card-title> <md-card-title-text> <span class="md-headline">Test</span> <form ng-submit="vm.test()" flex layout-wrap> <md-input-container flex> <label># of Tests</label> <input ng-model="vm.testsToRun"> </md-input-container> <md-button class="md-raised md-primary" type="submit">Test</md-button> <p> {{100-vm.testStats.totalErrors/vm.testStats.totalTested*100}} % </p> <p>{{vm.testStats.labels.length}}</p> </form> </md-card-title-text> </md-card-title> <md-card-title-media> <canvas class="chart chart-line" chart-data="vm.testStats.data" chart-labels="vm.testStats.labels" chart-series="vm.testStats.series"> </canvas> </md-card-title-media> </md-card> </md-content> <ng-include src="\'views/category-create-form.html\'"></ng-include> </div>'),a.put("views/websearch.html",'<div layout="column" layout-align="center" id="mainContainer" flex> <md-toolbar> <div class="md-toolbar-tools" layout="row"> <h3 flex><a href="#!/">Web Content Classifier</a></h3> <md-button aria-label="Entities" href="#!/entities"> <i class="material-icons">business</i></md-button> <md-button aria-label="Settings" href="#!/settings"> <i class="material-icons">settings</i></md-button> <md-button aria-label="Get Random" ng-click="vm.randomCompany()"> <i class="material-icons">autorenew</i></md-button> <md-button aria-label="Save" ng-click="vm.saveClassification()" ng-disabled="!vm.results"> <i class="material-icons">save</i></md-button> </div> </md-toolbar> <md-content flex> <md-list flex ng-show="!vm.loading"> <md-subheader class="md-no-sticky">Search Results for {{vm.webSearch.term}} | {{vm.webSearch.searchEngine}} </md-subheader> <div layout="row" ng-repeat="result in vm.webSearch.searchResults" class="list-item-cont"> <md-list-item flex class="md-3-line"> <div class="md-list-item-text" layout="row"> <div class="list-number md-padding"> {{ result.pageRank }} </div> <div flex> <h3>{{ result.title }}</h3> <h4>{{ result.link }} | {{result.searchEngine }}</h4> <p>{{ result.description }}</p> </div> <div layout-align="center center"> <md-progress-linear ng-show="result.saving"></md-progress-linear> <div ng-hide="result.category"> <md-button class="md-primary md-fab option-button label-color{{key}}" ng-disabled="result.saving" ng-repeat="(key,cat) in vm.categories" ng-click="vm.changeCategory(result,cat)">{{ cat.label | limitTo : 4}}</md-button> </div> <div ng-show="result.category" class="list-label" ng-class="vm.getCategoryColor(result.category)"> {{result.category}} <a ng-click="vm.changeCategory(result,null)" ng-hide="result.saving" class="remove">x</a> </div> </div> <div ng-show="result.saving"></div> <div> </div> </div> </md-list-item> </div> </md-list> <div class="progressContainer" ng-show="vm.loading"> <md-progress-linear md-mode="query"></md-progress-linear> <div class="bottom-block"> <span>Cargando Resultados...</span> </div> </div> </md-content> </div>')}]);