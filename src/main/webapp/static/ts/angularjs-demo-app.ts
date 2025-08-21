/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
/// <reference path="angularjs-demo-controller.ts" />
/// <reference path="angularjs-demo-service.ts" />
/// <reference path="about-controller.ts" />
/// <reference path="contact-controller.ts" />
/// <reference path="users-controller.ts" />
/// <reference path="datasource-controller.ts" />
/// <reference path="datasource-service.ts" />

var demoApp = angular.module('demo', ['ngRoute']);

demoApp.config(['$routeProvider', function($routeProvider: angular.route.IRouteProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'demo.DemoController'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'demo.AboutController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'demo.ContactController'
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'demo.UsersController'
    })
    .when('/datasource', {
      templateUrl: 'views/datasource.html',
      controller: 'demo.DatasourceController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

demoApp.controller('demo.DemoController', demo.DemoController);
demoApp.controller('demo.AboutController', demo.AboutController);
demoApp.controller('demo.ContactController', demo.ContactController);
demoApp.controller('demo.UsersController', demo.UsersController);
demoApp.controller('demo.DatasourceController', demo.DatasourceController);

demoApp.service('demo.DemoService', demo.DemoService);
demoApp.service('demo.DatasourceService', demo.DatasourceService);
