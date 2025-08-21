// Type definitions for Angular JS 1.4+ (ngRoute module)
/// <reference path="angular.d.ts" />

declare module "angular-route" {
    var _: string;
    export = _;
}

///////////////////////////////////////////////////////////////////////////////
// ngRoute module (angular-route.js)
///////////////////////////////////////////////////////////////////////////////
declare namespace angular.route {

    ///////////////////////////////////////////////////////////////////////////
    // RouteService
    // see http://docs.angularjs.org/api/ngRoute/service/$route
    ///////////////////////////////////////////////////////////////////////////
    interface IRouteService {
        reload(): void;
        routes: any;

        // May not always be available. For instance, current will not be available
        // to a controller that was not initialized as a result of a route maching.
        current?: ICurrentRoute;

        // A route object that was matched and loaded. May be `null` if no route loaded.
        // Set by `$routeProvider`.
    }

    /**
     * see http://docs.angularjs.org/api/ngRoute/service/$route#current
     */
    interface ICurrentRoute extends IRoute {
        locals: {
            [index: string]: any;
            $scope: angular.IScope;
            $template: string;
        };

        params: any;
        pathParams: any;
        scope: angular.IScope;
    }

    ///////////////////////////////////////////////////////////////////////////
    // RouteProvider
    // see http://docs.angularjs.org/api/ngRoute/provider/$routeProvider
    ///////////////////////////////////////////////////////////////////////////
    interface IRouteProvider extends angular.IServiceProvider {
        when(path: string, route: IRoute): IRouteProvider;
        otherwise(params: IRoute): IRouteProvider;
    }

    // see http://docs.angularjs.org/api/ngRoute/provider/$routeProvider#when for the
    // list of available properties for the route definition object
    interface IRoute {
        controller?: string|Function;
        controllerAs?: string;
        template?: string|Function;
        templateUrl?: string|Function;
        resolve?: {[key: string]: any};
        redirectTo?: string|Function;
        [property: string]: any;
    }

    ///////////////////////////////////////////////////////////////////////////
    // RouteParamsService
    // see http://docs.angularjs.org/api/ngRoute/service/$routeParams
    ///////////////////////////////////////////////////////////////////////////
    interface IRouteParamsService {
        [key: string]: any;
    }

}

declare namespace angular {
    interface IModule {
        config(fn: (routeProvider: angular.route.IRouteProvider, ...injectables: any[]) => any): IModule;
    }
}