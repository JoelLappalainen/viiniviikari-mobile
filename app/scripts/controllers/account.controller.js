(function() { 'use strict';
/**
 * @ngdoc function
 * @name viiniviikariMobile.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller for users account page
 */

angular
	.module('viiniviikariMobile')
	.controller('AccountCtrl', function($state){
		/* jshint validthis: true */
		var vm = this;

		vm.addNewPost = addNewPost;

		// activate();
		return vm;
		//////////////////////////////////////////

		// function activate(){
		// 	console.log('tee jotain');
		// }
		function addNewPost(){
			$state.go('tab.addpost');
		}
	});



})();