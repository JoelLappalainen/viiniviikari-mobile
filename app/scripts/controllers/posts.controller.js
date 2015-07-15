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
	.controller('PostsCtrl', function($state, Post){
		/* jshint validthis: true */
		var vm = this;
		vm.showDetails = showDetails;
		//vm.getPosts = getPosts;
		activate();
		/////////////////////
		function showDetails(postId){
			console.log(postId);
			$state.go('tab.post-details/:id', {id:postId});
		}
		function activate(){
			vm.allposts = Post.all;
		}

	});



})();