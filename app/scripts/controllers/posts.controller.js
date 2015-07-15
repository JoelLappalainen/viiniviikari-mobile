(function() { 'use strict';
/**
 * @ngdoc function
 * @name viiniviikariMobile.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller for all posts
 */

angular
	.module('viiniviikariMobile')
	.controller('PostsCtrl', function(Post){
		/* jshint validthis: true */
		var vm = this;

		//vm.getPosts = getPosts;
		activate();
		/////////////////////

		function activate(){
			vm.allposts = Post.all;
		}

	});



})();