// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngMessages', 'ngCordova' , 'restangular', 'angucomplete-alt', 'google.places' ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

  //RestangularProvider.setBaseUrl('http://jaxox.ddns.net:8080/api/');
  RestangularProvider.setBaseUrl('http://localhost:8080/api/');



  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.eventIdea', {
        url: "/eventIdea",
        views: {
            'menuContent' :{
                templateUrl: "templates/eventIdea/eventIdea.html",
                controller: 'EventIdeaCtrl'
            }
        }
    })

//    .state('app.search', {
//      url: "/search",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/search.html"
//        }
//      }
//    })

    .state('app.whoIsFree', {
      url: "/whoIsFree",
      views: {
        'menuContent' :{
          templateUrl: "templates/whoIsFree/whoIsFree.html"
        }
      }
    })
//    .state('app.playlists', {
//      url: "/playlists",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/playlists.html",
//          controller: 'PlaylistsCtrl'
//        }
//      }
//    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/whoIsFree');
});


app.
    config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//        $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
        $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.useXDomain = true;

    }]);

