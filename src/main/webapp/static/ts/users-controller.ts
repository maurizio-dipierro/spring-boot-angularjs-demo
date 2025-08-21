/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="angularjs-demo-service.ts" />

module demo {
  interface IUsersScope extends ng.IScope {
    users: IPerson[];
    newUser: IPerson;
    addUser: () => void;
    deleteUser: (index: number) => void;
    loadSampleUsers: () => void;
  }
  
  export class UsersController {
    static $inject = ['$scope', 'demo.DemoService'];
    private scope: IUsersScope;
    private demoService: DemoService;

    constructor($scope: IUsersScope, demoService: DemoService) {
      this.scope = $scope;
      this.demoService = demoService;
      this.scope.users = [];
      this.scope.newUser = { firstName: '', lastName: '' };
      this.scope.addUser = () => this.addUser();
      this.scope.deleteUser = (index: number) => this.deleteUser(index);
      this.scope.loadSampleUsers = () => this.loadSampleUsers();
      
      this.loadSampleUsers();
    }

    addUser(): void {
      if (this.scope.newUser.firstName && this.scope.newUser.lastName) {
        this.scope.users.push({
          firstName: this.scope.newUser.firstName,
          lastName: this.scope.newUser.lastName
        });
        this.scope.newUser = { firstName: '', lastName: '' };
      }
    }

    deleteUser(index: number): void {
      this.scope.users.splice(index, 1);
    }

    loadSampleUsers(): void {
      this.scope.users = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
        { firstName: 'Bob', lastName: 'Johnson' },
        { firstName: 'Alice', lastName: 'Williams' }
      ];
    }
  }
}