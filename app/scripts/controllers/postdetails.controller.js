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
	.controller('PostDetailsCtrl', function($ionicLoading){
		/* jshint validthis: true */
		var vm = this;
		vm.testi = 'moi';

		showLoading();
		activate();
		return vm;
		/////////////////////

		function showLoading(){
		    $ionicLoading.show({
		      template: '<ion-spinner></ion-spinner>',
		    });
		  }
		function activate(){
			$ionicLoading.hide();
		}
	});



})();