angular
  .module('TransportTunApp')
  .controller('linesCtrl', ['$scope', '$http','BASE_URL', function ($scope, $http, BASE_URL) {
    $scope.lines = [];
    $http
      .get(BASE_URL + 'busLines')
      .then(function(result) {
        $scope.lines = result.data;
        console.log($scope.lines[0]);
      });

  }]);