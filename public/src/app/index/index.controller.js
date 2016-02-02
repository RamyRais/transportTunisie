angular
  .module('TransportTunApp')
  .controller('indexCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', function ($scope, $http, uiGmapGoogleMapApi) {
    $http
      .get('app/data/Bus_19C.json')
      .then(function(data) {
        $scope.line = data.data;
      });

    uiGmapGoogleMapApi.then(function(){
      $scope.path = null;
      $scope.map = { center: { latitude: 36.7876658, longitude: 10.1996684 }, zoom: 11,control : {} };
      $scope.dirDisplay = new google.maps.DirectionsRenderer;
      $scope.dirService = new google.maps.DirectionsService();
      $scope.markers = [];
      $scope.points= [];
      for (var i=0; i<$scope.line.stations.length-1; i=i+7){
        var dep = $scope.line.stations[i];
        var des;
        var end;
        if(i+7>=$scope.line.stations.length){
          des = $scope.line.stations[$scope.line.stations.length-1];
          end = $scope.line.stations.length-1;
        } else {
          des = $scope.line.stations[i+7];
          end = i+7;
        }
        if($scope.line.stations[i].stopover){
          $scope.markers.push({
            id: i,
            coords: {
              latitude: $scope.line.stations[i].lat,
              longitude: $scope.line.stations[i].lng
            }
          })
        }
        var waypoints = [];
        for(var j=i;j<end;j++){
          var place = $scope.line.stations[j];
          waypoints.push({
            location: new google.maps.LatLng(place.lat, place.lng),
            stopover: place.stopover
          });
          if($scope.line.stations[j].stopover){
            $scope.markers.push({
              id: j,
              coords: {
                latitude: $scope.line.stations[j].lat,
                longitude: $scope.line.stations[j].lng
              }
            })
          }
        }
        $scope.dirService.route({
          origin: new google.maps.LatLng(dep.lat, dep.lng), //get from geolocation
          destination: new google.maps.LatLng(des.lat, des.lng),
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          waypoints: waypoints
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            $scope.dirDisplay.setDirections(response);
            //$scope.dirDisplay.setMap($scope.map.control.getGMap());
            //console.log($scope.dirDisplay.directions.routes[0].overview_path);
            $scope.points.push($scope.dirDisplay.directions.routes[0].overview_path);
          } else {
            alert('Directions request failed due to ' + status);
          }
        });
      }


    })
  }]);