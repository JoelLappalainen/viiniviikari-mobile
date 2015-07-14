(function() { 'use strict';
/**
 * @ngdoc function
 * @name viiniviikari.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller for home page
 */

angular
	.module('viiniviikari')
	.controller('HomeCtrl', function(){
		/* jshint validthis: true */
		var vm = this;
		vm.testi = 'moi';

		activate();
		return vm;
		/////////////////////



		function activate(){
			console.log('hae viimeisimmät postit');
		}
	});



})();