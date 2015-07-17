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
	.controller('PostsCtrl', function($state, $ionicLoading, Post){
		/* jshint validthis: true */
		var vm = this;

		// variables
		vm.showDetails = showDetails;
		vm.tags = [];

		// functions
		vm.loadTags = loadTags;
		
		// init
		showLoading();
		activate();
		//////////////////////////////////////////

		function showLoading(){
	    $ionicLoading.show({
	      template: '<ion-spinner></ion-spinner>',
	    });
	  }

	  function activate(){
	  	window.alert('Starting to load posts...');
			Post.all.$loaded().then(function(success){
				window.alert('Posts loaded!');
				vm.allposts = success;
				$ionicLoading.hide();
			}, function(error){
				window.alert(error);
			});
		}

		function showDetails(postId){
			console.log(postId);
			$state.go('tab.post-details/:id', {id:postId});
		}

		function loadTags(){
			//console.log(Tags.all);
			return [{text : 'moi'}, {text : 'moi1'}, {text : 'moi2'}, {text : 'moi3'}];
		}

	});
})();