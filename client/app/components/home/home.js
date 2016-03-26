import angular from 'angular';
import template from './home.html';
import uiRouter from 'angular-ui-router';

const controller = class HomeController {
  constructor($ngRedux, $scope, productsActions) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, productsActions)(this);

    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    const {
      isFetching,
      products
    } = state;

    return {
      isFetching,
      products
    };
  }

  $onInit() {
    this.fetchProductsIfNeeded();
  }
};

const homeComponent = {
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true
};

const homeModule = angular.module('home', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    });
})
.component('home', homeComponent);

export default homeModule;
