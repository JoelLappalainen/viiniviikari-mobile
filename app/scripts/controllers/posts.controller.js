(function() { 'use strict';
/**
 * @ngdoc function
 * @name viiniviikari.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller for all posts
 */

angular
	.module('viiniviikariMobile')
	.controller('PostsCtrl', function(){
		/* jshint validthis: true */
		var vm = this;
		vm.allposts = [
			{
				title : 'viini 1',
				imgUrl : 'https://c1.staticflickr.com/1/458/18379325189_72aa346583_c.jpg',
				details : 
					[
						{
							label : 'Rypäle',
							content : 'Shiraz Cabernet'
						},
						{
							label : 'Vuosikerta',
							content : '1997'
						},
						{
							label : 'Maa',
							content : 'Australia'
						}

					],
				description : '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
				rating : 9.7
			},
			{
				title : 'viini 2',
				imgUrl : 'https://c1.staticflickr.com/1/458/18379325189_72aa346583_c.jpg',
				details : 
					[
						{
							label : 'Rypäle',
							content : 'Shiraz Cabernet'
						}
					],				
				description : 'ei sovi kalan kanssa',
				rating : 6.7			
			},
			{
				title : 'viini 3',
				imgUrl : 'https://c1.staticflickr.com/1/458/18379325189_72aa346583_c.jpg',
				details : 
					[
						{
							label : 'Rypäle',
							content : 'Shiraz Cabernet'
						}
					],				
				description : 'ainoa laatuaan',
				rating : 9.9			
			}
		];

		vm.getPosts = getPosts;
		activate();
		/////////////////////



		function activate(){
			console.log('hae kaikki postit');
		}
		function getPosts(){

		}
	});



})();