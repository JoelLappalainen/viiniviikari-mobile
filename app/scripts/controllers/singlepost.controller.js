(function() { 'use strict';
/**
 * @ngdoc function
 * @name viiniviikari.controller:SinglePostCtrl
 * @description
 * # SinglePostCtrl
 * Controller for a single post
 */

angular
	.module('viiniviikari')
	.controller('SinglePostCtrl', function(){
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