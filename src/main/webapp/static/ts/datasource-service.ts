/// <reference path="../typings/angularjs/angular.d.ts" />

module demo {
  export interface IDatasource {
    id: number;
    sourceName: string;
    appName: string;
    property: string;
    application: string;
  }
  
  export interface IDatasourceListResponse {
    items: IDatasource[];
    page: number;
    pageSize: number;
    total: number;
  }
  
  export interface ITestResult {
    ok: boolean;
    error?: string;
  }
  
  export class DatasourceService {
    static $inject = ['$http'];
    private httpService: ng.IHttpService;

    constructor($http: ng.IHttpService) {
      this.httpService = $http;
    }

    getDatasources(page: number = 1, pageSize: number = 25, query: string = ''): ng.IPromise<IDatasourceListResponse> {
      let url = `api/datasources?page=${page}&pageSize=${pageSize}`;
      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }
      
      return this.httpService.get<IDatasourceListResponse>(url).then((response) => {
        return response.data;
      });
    }
    
    createDatasource(datasource: IDatasource): ng.IPromise<IDatasource> {
      return this.httpService.post<IDatasource>('api/datasources', datasource).then((response) => {
        return response.data;
      });
    }
    
    updateDatasource(datasource: IDatasource): ng.IPromise<IDatasource> {
      return this.httpService.put<IDatasource>(`api/datasources/${datasource.id}`, datasource).then((response) => {
        return response.data;
      });
    }
    
    deleteDatasource(datasourceId: number): ng.IPromise<void> {
      return this.httpService.delete<void>(`api/datasources/${datasourceId}`).then(() => {
        return;
      });
    }
    
    testConnection(datasource: IDatasource): ng.IPromise<ITestResult> {
      return this.httpService.post<ITestResult>('api/datasources/test', datasource).then((response) => {
        return response.data;
      });
    }
    
    getPropertyOptions(): ng.IPromise<string[]> {
      return this.httpService.get<string[]>('api/datasources/properties').then((response) => {
        return response.data;
      });
    }
    
    getApplicationOptions(): ng.IPromise<string[]> {
      return this.httpService.get<string[]>('api/datasources/applications').then((response) => {
        return response.data;
      });
    }
  }
}
