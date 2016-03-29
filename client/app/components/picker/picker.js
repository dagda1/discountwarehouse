import angular from 'angular';
import template from './picker.html';
import uiBootstrap from "angular-ui-bootstrap";

const controller = class PickerController {
};

const pickerComponent = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    label: '@',
    options: '<'
  }
};

export default angular.module('picker', [uiBootstrap])
.component('picker', pickerComponent);
