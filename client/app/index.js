import angular from 'angular';
import ngRedux from 'ng-redux';
import createLogger from 'redux-logger';
import ngReduxRouter from 'redux-ui-router';
import thunk from 'redux-thunk';

import AppComponent from './components/app/app';
import Components from './components/components';
import Services from './services/services';
import reducers from './reducers';
import productsActions from './actions/products-actions.js';

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
.config(['$ngReduxProvider', '$locationProvider', ($ngReduxProvider, $locationProvder) => {
  $ngReduxProvider.createStoreWith(reducers, [thunk, createLogger(), 'ngUiRouterMiddleware']);
  $locationProvder.html5Mode(true);
}])
.directive('app', AppComponent)
.service('productsActions', productsActions);
