'use strict';

angular.module('viiniviikari')

.config(function ($routeProvider) {
	$routeProvider
	  .when('/', {
	    templateUrl: 'views/home.html',
	    controller: 'HomeCtrl'
	  })
	  .when('/posts', {
	    templateUrl: 'views/posts.html',
	    controller: 'PostsCtrl as vm'
	  })
	  .when('/admin/addpost', {
	    templateUrl: 'views/admin/addpost.html',
	    controller: 'addPostCtrl as vm'
	  })
	  .otherwise({
	    redirectTo: '/'
	  });
	});