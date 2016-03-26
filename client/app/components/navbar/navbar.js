import angular from 'angular';
import ngReduxRouter from 'redux-ui-router';
import template from './navbar.html';

const navbarComponent = {
  template
};

export default angular.module('navbar', [
  ngReduxRouter
]).component('navbar', navbarComponent);
