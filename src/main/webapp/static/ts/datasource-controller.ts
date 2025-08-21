/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="datasource-service.ts" />

module demo {
  interface IDatasourceScope extends ng.IScope {
    datasources: IDatasource[];
    searchQuery: string;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    isLoading: boolean;
    showModal: boolean;
    modalMode: string;
    currentDatasource: IDatasource;
    
    // Actions
    openCreateModal: () => void;
    openEditModal: (datasource: IDatasource) => void;
    closeModal: () => void;
    saveDatasource: () => void;
    testConnection: () => void;
    deleteDatasource: (datasource: IDatasource) => void;
    confirmDelete: (datasource: IDatasource) => void;
    searchDatasources: () => void;
    loadDatasources: () => void;
    
    // Modal state
    testResult: any;
    showTestDialog: boolean;
    showDeleteConfirm: boolean;
    datasourceToDelete: IDatasource;
    message: string;
    messageType: string;
  }
  
  export class DatasourceController {
    static $inject = ['$scope', 'demo.DatasourceService'];
    private scope: IDatasourceScope;
    private datasourceService: DatasourceService;

    constructor($scope: IDatasourceScope, datasourceService: DatasourceService) {
      this.scope = $scope;
      this.datasourceService = datasourceService;
      
      // Initialize scope variables
      this.scope.datasources = [];
      this.scope.searchQuery = '';
      this.scope.currentPage = 1;
      this.scope.pageSize = 25;
      this.scope.totalItems = 0;
      this.scope.isLoading = false;
      this.scope.showModal = false;
      this.scope.modalMode = 'create';
      this.scope.currentDatasource = this.getEmptyDatasource();
      this.scope.testResult = null;
      this.scope.showTestDialog = false;
      this.scope.showDeleteConfirm = false;
      this.scope.datasourceToDelete = null;
      this.scope.message = '';
      this.scope.messageType = '';
      
      // Bind methods
      this.scope.openCreateModal = () => this.openCreateModal();
      this.scope.openEditModal = (datasource) => this.openEditModal(datasource);
      this.scope.closeModal = () => this.closeModal();
      this.scope.saveDatasource = () => this.saveDatasource();
      this.scope.testConnection = () => this.testConnection();
      this.scope.deleteDatasource = (datasource) => this.deleteDatasource(datasource);
      this.scope.confirmDelete = (datasource) => this.confirmDelete(datasource);
      this.scope.searchDatasources = () => this.searchDatasources();
      this.scope.loadDatasources = () => this.loadDatasources();
      
      // Load initial data
      this.loadDatasources();
    }

    private getEmptyDatasource(): IDatasource {
      return {
        id: null,
        sourceName: '',
        appName: '',
        property: '',
        application: ''
      };
    }

    openCreateModal(): void {
      this.scope.modalMode = 'create';
      this.scope.currentDatasource = this.getEmptyDatasource();
      this.scope.showModal = true;
      this.scope.message = '';
    }

    openEditModal(datasource: IDatasource): void {
      this.scope.modalMode = 'edit';
      this.scope.currentDatasource = angular.copy(datasource);
      this.scope.showModal = true;
      this.scope.message = '';
    }

    closeModal(): void {
      this.scope.showModal = false;
      this.scope.showTestDialog = false;
      this.scope.testResult = null;
      this.scope.message = '';
    }

    saveDatasource(): void {
      if (!this.isFormValid()) {
        this.scope.message = 'Compilare tutti i campi obbligatori';
        this.scope.messageType = 'error';
        return;
      }

      this.scope.isLoading = true;
      const promise = this.scope.modalMode === 'create' 
        ? this.datasourceService.createDatasource(this.scope.currentDatasource)
        : this.datasourceService.updateDatasource(this.scope.currentDatasource);

      promise.then(() => {
        this.scope.isLoading = false;
        this.closeModal();
        this.loadDatasources();
        this.showMessage('Datasource salvato con successo', 'success');
      }).catch((error) => {
        this.scope.isLoading = false;
        this.scope.message = error.data?.message || 'Errore durante il salvataggio';
        this.scope.messageType = 'error';
      });
    }

    testConnection(): void {
      if (!this.isFormValid()) {
        this.scope.message = 'Compilare tutti i campi per testare la connessione';
        this.scope.messageType = 'error';
        return;
      }

      this.scope.isLoading = true;
      this.datasourceService.testConnection(this.scope.currentDatasource).then((result) => {
        this.scope.isLoading = false;
        this.scope.testResult = result;
        this.scope.showTestDialog = true;
      }).catch((error) => {
        this.scope.isLoading = false;
        this.scope.testResult = { ok: false, error: error.data?.message || 'Test connessione fallito' };
        this.scope.showTestDialog = true;
      });
    }

    confirmDelete(datasource: IDatasource): void {
      this.scope.datasourceToDelete = datasource;
      this.scope.showDeleteConfirm = true;
    }

    deleteDatasource(datasource: IDatasource): void {
      this.scope.showDeleteConfirm = false;
      this.scope.isLoading = true;
      
      this.datasourceService.deleteDatasource(datasource.id).then(() => {
        this.scope.isLoading = false;
        this.loadDatasources();
        this.showMessage('Datasource eliminato con successo', 'success');
      }).catch((error) => {
        this.scope.isLoading = false;
        this.showMessage(error.data?.message || 'Errore durante l\'eliminazione', 'error');
      });
    }

    searchDatasources(): void {
      this.scope.currentPage = 1;
      this.loadDatasources();
    }

    loadDatasources(): void {
      this.scope.isLoading = true;
      this.datasourceService.getDatasources(this.scope.currentPage, this.scope.pageSize, this.scope.searchQuery)
        .then((response) => {
          this.scope.isLoading = false;
          this.scope.datasources = response.items;
          this.scope.totalItems = response.total;
        }).catch((error) => {
          this.scope.isLoading = false;
          this.showMessage('Errore durante il caricamento dei datasource', 'error');
        });
    }

    private isFormValid(): boolean {
      const ds = this.scope.currentDatasource;
      return !!(ds.sourceName && ds.appName && ds.property && ds.application);
    }

    private showMessage(message: string, type: string): void {
      this.scope.message = message;
      this.scope.messageType = type;
      setTimeout(() => {
        this.scope.message = '';
        this.scope.$apply();
      }, 3000);
    }
  }
}