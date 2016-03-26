import angular from 'angular';
import ngRedux from 'ng-redux';
import createLogger from 'redux-logger';
import ngReduxRouter from 'redux-ui-router';
import thunk from 'redux-thunk';

import AppComponent from './components/app/app';
import Components from './components/components';
import Services from './services/services';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap';
import '../public/styles/styles.scss';

angular.module('app', [
  'ui.bootstrap',
  Services.name,
  Components.name,
  ngRedux,
  ngReduxRouter
])
.config(($ngReduxProvider) => {
  $ngReduxProvider.createStoreWith(reducers, [thunk, createLogger(), 'ngUiRouterMiddleware']);
})
.controller('mainCtrl', function() {
})
.directive('app', AppComponent);
