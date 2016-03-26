import angular from 'angular';
import template from './product.html';

const controller = class ProductController {
};

const productComponent = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    product: '<'
  }
};

export default angular.module('product', [])
.component('product', productComponent);
