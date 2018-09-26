app.controller("secure1Ctrl",function($scope,$rootScope,$http){
  $rootScope.test = 'secure1Ctrl';
  $scope.login = function() {
    if( $scope.username && $scope.password ) {
      $http({
        method : "POST",
        url : "secure1",
        data : {username:$scope.username,password:$scope.password}
      }).then(function mySuccess(response) {
        $scope.response = response.data;
      }, function myError(response) {
        $scope.response = response.statusText;
      });
    }
  };
});
