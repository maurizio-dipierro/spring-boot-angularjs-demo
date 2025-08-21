/// <reference path="../typings/angularjs/angular.d.ts" />

module demo {
  export interface IPerson {
    firstName: string;
    lastName: string;
    id?: number;
    email?: string;
  }
  
  export interface IUser extends IPerson {
    id: number;
    email: string;
    createdDate?: Date;
  }
  
  export class DemoService {
    static $inject = ['$http'];
    private httpService: ng.IHttpService;

    constructor($http: ng.IHttpService) {
      this.httpService = $http;
    }

    getPerson(): ng.IPromise<IPerson> {
      return this.httpService.get<IPerson>('api/person').then((response) => {
        return response.data;
      });
    }
    
    getUsers(): ng.IPromise<IUser[]> {
      return this.httpService.get<IUser[]>('api/users').then((response) => {
        return response.data;
      });
    }
    
    addUser(user: IPerson): ng.IPromise<IUser> {
      return this.httpService.post<IUser>('api/users', user).then((response) => {
        return response.data;
      });
    }
    
    deleteUser(userId: number): ng.IPromise<void> {
      return this.httpService.delete<void>('api/users/' + userId).then(() => {
        return;
      });
    }
    
    getRandomPeople(): ng.IPromise<IPerson[]> {
      return this.httpService.get<IPerson[]>('api/people/random').then((response) => {
        return response.data;
      });
    }
  }
}
