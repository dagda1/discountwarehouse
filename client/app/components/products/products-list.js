import angular from 'angular';
import template from './products-list.html';

const controller = class ProductsController {
};

const productsListComponent = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    products: '<'
  }
};

export default angular.module('productsList', [])
.component('productsList', productsListComponent);
