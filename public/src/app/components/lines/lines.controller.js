angular
  .module('TransportTunApp')
  .controller('linesCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.lines = [];
    $http
      .get('http://localhost:8080/busLines')
      .then(function(result) {
        $scope.lines = result.data;
        console.log($scope.lines[0]);
      });

  }]);