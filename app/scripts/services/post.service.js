(function(){ 'use strict';


angular
	.module('viiniviikari')
	.factory('Post', function ($resource) {
	  return $resource('https://FIREBASE-URL.firebaseIO.com/posts/:id.json');
	});



})();


