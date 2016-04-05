import angular from 'angular';
import template from './end-of-catalogue.html';

const controller = class EndOfCatalogueController {
};

const endOfCatalogueComponent = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    finished: '<'
  }
};

export default angular.module('endOfCatalogue', [])
.component('endOfCatalogue', endOfCatalogueComponent);
