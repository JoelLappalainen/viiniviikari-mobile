(function(){ 'use strict';

angular
	.module('viiniviikariMobile')
	.factory('Post', function ($resource) {
	  return $resource('https://FIREBASE-URL.firebaseIO.com/posts/:id.json');
	});

})();


