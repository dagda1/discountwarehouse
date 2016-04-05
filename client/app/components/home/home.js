import angular from 'angular';
import template from './home.html';
import uiRouter from 'angular-ui-router';

const controller = class HomeController {
  constructor($ngRedux, $scope, productsActions) {
    const options = ['id', 'price', 'size'];

    this.unsubscribe = $ngRedux.connect(this.mapStateToThis, productsActions)(this);

    this.options = ['id', 'price', 'size'];
  }

  mapStateToThis(state) {
    const {
      isFetching,
      products,
      sort,
      page,
      pageSize,
      endOfCatalogue
    } = state.page;

    return {
      isFetching,
      sort,
      page,
      pageSize,
      products,
      endOfCatalogue
    };
  }

  $onInit() {
    this.fetchNewPageIfNeeded();
  }

  $onDestroy() {
    this.unsubscribe();
  }
};

const homeComponent = {
  template,
  controller,
  controllerAs: 'vm'
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
