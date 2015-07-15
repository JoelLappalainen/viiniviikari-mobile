'use strict';

angular.module('viiniviikariMobile')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'views/tab-home.html',
        controller: 'HomeCtrl as vm'
      }
    }
  })

  .state('tab.posts', {
    url: '/posts',
    views: {
      'tab-posts': {
        templateUrl: 'views/tab-posts.html',
        controller: 'PostsCtrl as vm'
      }
    }
  })
  // -->
    .state('tab.post-details', {
      url: '/post-details/:id',
      views: {
        'tab-posts': {
          templateUrl: 'views/post-details.html',
          controller: 'PostDetailsCtrl as vm'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'views/tab-account.html',
        controller: 'AccountCtrl as vm'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});