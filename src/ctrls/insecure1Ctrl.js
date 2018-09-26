app.controller("insecure1Ctrl",function($scope,$rootScope,$http){
  $rootScope.test = 'insecure1Ctrl';
  $scope.login = function() {
    if( $scope.username && $scope.password ) {
      $http({
        method : "POST",
        url : "insecure1",
        data : {username:$scope.username,password:$scope.password}
      }).then(function mySuccess(response) {
        $scope.response = response.data;
      }, function myError(response) {
        $scope.response = response.statusText;
      });
    }
  };
});
