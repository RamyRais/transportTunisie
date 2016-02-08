angular
  .module('TransportTunApp')
  .controller('suggestCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapIsReady',
    function ($scope, uiGmapGoogleMapApi, uiGmapIsReady) {

    $scope.stations = [];

    $scope.generateRoute = function () {

    };
    uiGmapGoogleMapApi.then(function () {
      $scope.map = { center: { latitude: 36.7876658, longitude: 10.1996684 }, zoom: 11, control : {} };
      uiGmapIsReady.promise(1).then(function (instance) {
        console.log(instance);
        $scope.addStation = function () {
          var lat = instance[0].map.center.G;
          var lng = instance[0].map.center.K;
          $scope.stations.push({
            id: $scope.stations.length +1,
            coords: {
              latitude: lat,
              longitude: lng
            },
            options: {
              draggable: true
            }
          });
          console.log('hmm add ',$scope.stations);
        };
      })
    })
  }]);