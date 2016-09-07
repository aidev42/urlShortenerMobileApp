// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// angular.module('starter', ['ionic', 'ngStorage', 'ngCordova'])
angular.module('starter', ['ionic', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("list", {
      "url": "/list",
      "templateUrl": "templates/list.html",
      "controller": "MainController",
      "cache": false
    })
    .state("create", {
      "url": "/create",
      "templateUrl": "templates/create.html",
      "controller": "MainController",
      "cache": false
    });

  $urlRouterProvider.otherwise("list");
})


// .controller("MainController", function($scope, $http, $localStorage, $cordovaToast){

.controller("MainController", function($scope, $http, $ionicHistory, $localStorage, $state){

  // Scope let's this be available to view
  // example: $scope.listItems = ["M", "B", "J"];
  // $scope.ObjectItems = {}

  // $scope.ObjectItems["a"] = "Matt"
  // $scope.ObjectItems["b"] = "Brett"



  // Example API request
  // $scope.makeRequest = function (){
  //   $http(
  //   {
  //     url: "https://httpbin.org/get",
  //     method: "GET"
  //   }).then(function(result){
  //     console.log(JSON.stringify(result));
  //   }, function(error) {
  //     console.log(JSON.stringify(error))
  //   });
  // }

  //Native HTML5 local storage method w/o ngStorage
  // window.localStorage.setItem("test","Raboy");
  // console.log(window.localStorage.getItem("test"));

  // ngStorage method for saving to local and session
  // $localStorage.test = {
  //   "firstname": "Matt",
  //   "lastname": "O'Connor"
  // }

  //Toast - since this is a native plugin (plugins using native device code) it can not be tested in web browser
  // $scope.showToast = function() {
  //   $cordovaToast.show('Hello', 'long','center');
  // }

  //THIS IS FOR THE LINK SHORTENING

  $scope.init = function() {
    $scope.URLs = $localStorage.tiny;
  }

  $scope.back = function() {
    //prebuilt from ionicHistory plugin
    $ionicHistory.goBack();
  }

  $scope.delete = function(URL) {
    delete $localStorage.tiny[URL];
  }

  $scope.shorten = function(longURL) {
    $http(
    {
      method: "GET",
      url: "http://tinyurl.com/api-create.php",
      params: {
        url: longURL
      }
    })
    .success(function(result) {
      if(typeof $localStorage.tiny == "undefined"){
        $localStorage.tiny = {}
      }
      $localStorage.tiny[longURL] = {
        longURL: longURL,
        shortURL: result
      }
      $state.go("list");
    })
    .error(function(error){
      console.log(JSON.stringify(error));
    });
  }

  //Makes use of the cordova inappbrowser function
  $scope.open = function(URL){
    var URLCheck = new RegExp("^(http|https)://")
    if(URLCheck.test(URL)){
      window.open(URL, "_system", "location=yes");
    } else{
      window.open("http://" + URL, "_system", "location=yes");
    }
  }
});