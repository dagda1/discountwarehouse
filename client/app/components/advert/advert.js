import angular from 'angular';
import template from './advert.html';

const controller = class AdvertController {
};

const advertComponent = {
  template,
  controller,
  controllerAs : 'vm',
  bindings: {
    advert: '<'
  }
};

export default angular.module('advert', [])
.component('advert', advertComponent);
