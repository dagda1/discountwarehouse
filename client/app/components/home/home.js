import angular from 'angular';
import template from './home.html';
import uiRouter from 'angular-ui-router';

const controller = class HomeController {
  constructor($ngRedux, $scope, productsActions) {
    const options = ['id', 'price', 'size'];

    const unsubscribe = $ngRedux.connect(this.mapStateToThis, productsActions)(this);

    $scope.$on('$destroy', unsubscribe);

    this.options = ['id', 'price', 'size'];
  }

  mapStateToThis(state) {
    const {
      isFetching,
      products,
      sort,
      page,
      pageSize
    } = state.page;

    return {
      isFetching,
      sort,
      page,
      pageSize,
      products
    };
  }

  $onInit() {
    this.fetchNewPageIfNeeded();
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
