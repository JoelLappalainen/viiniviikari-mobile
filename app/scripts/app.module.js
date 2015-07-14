/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name viiniviikari
 * @description
 * # viiniviikari application
 *
 * Main module of the application.
 */
angular.module('viiniviikari', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'firebase'
])
.constant('FIREBASE_URL', 'https://shining-inferno-4229.firebaseio.com/');
