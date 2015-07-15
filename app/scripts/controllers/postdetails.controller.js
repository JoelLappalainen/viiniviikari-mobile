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
	.controller('PostDetailsCtrl', function(){
		/* jshint validthis: true */
		var vm = this;
		vm.testi = 'moi';

		activate();
		return vm;
		/////////////////////



		function activate(){
			console.log('hae yksi post');
		}
	});



})();