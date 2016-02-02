'use strict';

angular
  .module('TransportTunApp')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/views/layout.html'
      })
      .state('app.index', {
        url: '/',
        templateUrl: 'app/index/index.view.html',
        controller: 'indexCtrl',
        resolve:{
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('app/index/index.controller.js');
          }]
        }
      })
  }]);