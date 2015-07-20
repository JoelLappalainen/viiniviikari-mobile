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
		vm.tags = [];

		
		// functions

		vm.loadTags = loadTags;
		vm.showDetails = showDetails;
		vm.filterData = filterData;
		vm.filterDataLess = filterDataLess;
		
		// init
		showLoading();
		activate();
		//////////////////////////////////////////

		//filterData- function by tags
		function filterData(tag){
			console.log(vm.filteredData);
			for (var i = vm.filteredData.length - 1; i >= 0; i--) {
				var filter = true;
				for(var j = vm.filteredData[i].tags.length - 1; j >= 0; j--){
					if(vm.filteredData[i].tags[j].toLowerCase() === tag.text.toLowerCase()){
						filter = false;
					}
				}
				if(filter){
					vm.filteredData.splice(i, 1);
				}
			}	
			console.log(vm.filteredData);
		}
		//filterData- function when removing a tag
		function filterDataLess(){

			vm.filteredData = [];
			if(vm.tags.length){
				for(var j = vm.allposts.length - 1; j >= 0; j--){
					for(var k = vm.allposts[j].tags.length - 1; k >=0; k--){
						var filter = true;
						for(var i = vm.tags.length - 1; i >= 0; i--){
							if( vm.allposts[j].tags.indexOf(vm.tags[i]) ){
								filter = false;
							}	
						}
						if(!filter){
							vm.filteredData.push(vm.allposts[j]);
						}
					}
				}
			}
			else{
				angular.forEach(vm.allposts, function(post){
					vm.filteredData.push(post);
				});
			}
		}
			
		

		function showLoading(){
	    $ionicLoading.show({
	      template: '<ion-spinner></ion-spinner>',
	    });
	  }

	  function activate(){
			Post.all.$loaded().then(function(success){
				vm.allposts = success;
				vm.filteredData = success;

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
			return [{text : 'moi'}, {text : 'moi1'}, {text : 'moi2'}, {text : 'moi3'}];
		}

	});
})();