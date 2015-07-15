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
	.controller('PostsCtrl', function($ionicLoading, Post){
		/* jshint validthis: true */
		var vm = this;

		showLoading();
		activate();
		/////////////////////

		function showLoading(){
	    $ionicLoading.show({
	      template: '<ion-spinner></ion-spinner>',
	    });
	  }

		function activate(){
			Post.all.$loaded().then(function(success){
				vm.allposts = success;
				$ionicLoading.hide();
			}, function(error){
				console.log(error);
			});
		}

	});



})();