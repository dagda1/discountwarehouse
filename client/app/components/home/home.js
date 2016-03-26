import angular from 'angular';
import template from './home.html';
import uiRouter from 'angular-ui-router';

const controller = class HomeController {
  constructor(productService) {
    this.productService = productService;
  }

  $onInit() {

  }
};

const homeComponent = {
  template,
  controller
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
