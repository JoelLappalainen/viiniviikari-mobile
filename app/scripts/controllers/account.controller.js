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
	.controller('AccountCtrl', function(){
		/* jshint validthis: true */
		var vm = this;

		activate();
		return vm;
		//////////////////////////////////////////

		function activate(){
			console.log('tee jotain');
		}
	});



})();