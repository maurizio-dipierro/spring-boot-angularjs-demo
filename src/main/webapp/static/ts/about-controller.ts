/// <reference path="../typings/angularjs/angular.d.ts" />

module demo {
  interface IAboutScope extends angular.IScope {
    appInfo: any;
  }
  
  export class AboutController {
    static $inject = ['$scope'];
    private scope: IAboutScope;

    constructor($scope: IAboutScope) {
      this.scope = $scope;
      this.scope.appInfo = {
        name: 'Spring Boot + AngularJS Demo',
        version: '1.0.0',
        description: 'A demo application showcasing integration between Spring Boot backend and AngularJS frontend',
        technologies: ['Spring Boot', 'AngularJS', 'TypeScript', 'Maven', 'Grunt']
      };
    }
  }
}