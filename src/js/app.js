var app = angular.module("iMeanNG", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "../views/welcome.html",
    controller  : "mainCtrl"
  })
  .when("/insecure1", {
    templateUrl : "../views/insecure1.html",
    controller  : "insecure1Ctrl"
  })
  .when("/insecure2", {
    templateUrl : "../views/insecure2.html",
    controller  : "insecure2Ctrl"
  })
  .when("/insecure3", {
    templateUrl : "../views/insecure3.html",
    controller  : "insecure3Ctrl"
  })
  .when("/secure1", {
    templateUrl : "../views/secure1.html",
    controller  : "secure1Ctrl"
  })
  .when("/secure2", {
    templateUrl : "../views/secure2.html",
    controller  : "secure2Ctrl"
  })
  .when("/secure3", {
    templateUrl : "../views/secure3.html",
    controller  : "secure3Ctrl"
  })
  .when("/register", {
    templateUrl : "../views/register.html",
    controller  : "registerCtrl"
  })
});
