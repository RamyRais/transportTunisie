'use strict';

angular
  .module('TransportTunApp', [
    'ui.router',
    'oc.lazyLoad',
    'uiGmapgoogle-maps'
  ])
  .config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDQ5BpdrvFaRM1NN29LcJ71QNnOljeF8Eo',
      //client: 'gme-569030830990-idlbueecdrg9aq7efgphe9odnpr0o348.apps.googleusercontent.com'
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'drawing,geometry'
    });
  }])
  .controller('AppCtrl', function () {
  });