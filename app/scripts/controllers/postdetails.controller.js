(function() { 'use strict';
/**
 * @ngdoc function
 * @name viiniviikariMobile.controller:PostDetailsCtrl
 * @description
 * # PostDetailsCtrl
 * Controller for a single post (details)
 */

angular
	.module('viiniviikariMobile')
	.controller('PostDetailsCtrl', function(Post, $stateParams){
		/* jshint validthis: true */
		var vm = this;

		activate();
		return vm;
		/////////////////////

		function activate(){
			var postId = $stateParams.id;
			Post.get(postId).$loaded().then(function(success){
				vm.post = success;
			}, function(error){
				console.log(error);
			});
		}
	});



})();