(function(){ 'use strict';

angular
	.module('viiniviikariMobile')

	//////////////////////////////
	// A service for posts (CRUD)
	//////////////////////////////
	.factory('Post', function ($firebaseObject, $firebaseArray, FIREBASE_URL) {
	 	var _ref = new Firebase(FIREBASE_URL+'posts');
  	var posts = $firebaseArray(_ref);

		var Post = {
			all : posts,
			latest : $firebaseArray(_ref.orderByChild('timestamp').limitToLast(15)),
			create : function(post){
				return posts.$add(post);
			},
			get : function(postId){
				return $firebaseObject(_ref.child(postId));
			},
			delete : function(post){
				return posts.$remove(post);
			}
		};
		return Post;
	})

	///////////////////////////////////////////////////
	// A service to take a picture with a mobile device
	///////////////////////////////////////////////////
	.factory('Camera', function ($q) {
		//console.log(navigator.camera);
		return {
			getPicture: function(options) {
				var q = $q.defer();

				navigator.camera.getPicture(function(result) {
					// Do any magic you need
					q.resolve(result);
				}, function(err) {
					q.reject(err);
				}, options);

				return q.promise;
			}
		};
	})

	/////////////////////////////////////////////////////
	// A service for handling tags associated with posts
	/////////////////////////////////////////////////////
	.factory('Tags', function ($firebaseArray, FIREBASE_URL, _) {
		var _ref = new Firebase(FIREBASE_URL+'tags');
		var tags = $firebaseArray( _ref );

		var Tags = {
			all : tags,
			add : function(taglist){
		    _.forEach(taglist, function(tag){
		      tags.$add(tag);
		    });
		    return -1;
			}
		};
		return Tags;
	});


})();


