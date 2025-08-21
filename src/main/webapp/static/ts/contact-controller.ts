/// <reference path="../typings/angularjs/angular.d.ts" />

module demo {
  interface IContactScope extends ng.IScope {
    contact: any;
    submitForm: () => void;
    message: string;
  }
  
  export class ContactController {
    static $inject = ['$scope'];
    private scope: IContactScope;

    constructor($scope: IContactScope) {
      this.scope = $scope;
      this.scope.contact = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      this.scope.submitForm = () => this.submitForm();
      this.scope.message = '';
    }

    submitForm(): void {
      if (this.scope.contact.name && this.scope.contact.email && this.scope.contact.message) {
        this.scope.message = 'Thank you for your message! We will get back to you soon.';
        this.scope.contact = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      } else {
        this.scope.message = 'Please fill in all required fields.';
      }
    }
  }
}