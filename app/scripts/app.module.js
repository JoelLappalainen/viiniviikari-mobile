/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name viiniviikariMobile
 * @description
 * # A mobile application for viiniviikari
 *
 * Main module of the application.
 */
angular.module('viiniviikariMobile', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ionic',
  'firebase',
  'ngCordova',
  'ngTagsInput'
])

// Firebase url constant
.constant('FIREBASE_URL', 'https://shining-inferno-4229.firebaseio.com/')
// underscore constant
.constant('_', window._)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
});
