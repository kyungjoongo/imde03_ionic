
angular.module('imde3', ['ionic', 'imde3.controllers', 'imde3.services'])

  .run(function ($ionicPlatform, AdMob) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      AdMob.init();

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.imde', {
        url: '/imde',
        views: {
          'menuContent': {
            templateUrl: 'templates/imde.html',
            controller: 'ImdeCtrl'
          }
        }
      })

      .state('app.imdeDetail', {
        url: '/imdeDetail/:pblancId',
        views: {
          'menuContent': {
            templateUrl: 'templates/imdeDetail.html',
            controller: 'ImdeDetailCtrl'
          }
        }
      })

      .state('app.imde2', {
        url: '/imde2',
        views: {
          'menuContent': {
            templateUrl: 'templates/imde2.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:title',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/imde');
  });


