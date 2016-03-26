import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import AppComponent from './components/app/app';
import Components from './components/components';
import Services from './services/services';
import '../public/styles/styles.scss';

angular.module('app', [
  'ui.bootstrap',
  uiRouter,
  Services.name,
  Components.name
])
.controller('mainCtrl', function() {
})
.directive('app', AppComponent);
