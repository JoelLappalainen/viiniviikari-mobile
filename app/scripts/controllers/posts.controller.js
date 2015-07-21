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
	.controller('PostsCtrl', function($state, $ionicLoading, _, Post){
		/* jshint validthis: true */
		var vm = this;

		// variables
		vm.tags = [];
		vm.sort = 'rating';
		
		// functions

		vm.loadTags = loadTags;
		vm.showDetails = showDetails;
		vm.filterData = filterData;
		vm.filterDataLess = filterDataLess;
		// vm.sort = sort;
		
		// init
		showLoading();
		activate();
		//////////////////////////////////////////

		//filterData- function by tags
		function filterData(tag){
			// console.log(vm.filteredData);
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
		}
		//filterData- function when removing a tag
		function filterDataLess(){

			if (vm.tags.length){
				vm.filteredData = [];
				var tmpFilterTagsList = _.map(vm.tags, function(tag){ return tag.text.toLowerCase(); });
				var count;

				angular.forEach(vm.allposts, function(post){
					count = 0;
					angular.forEach(post.tags, function(tag){
						if ( _.contains(tmpFilterTagsList, tag.toLowerCase()) ){ count++; }
					});
					if (count === vm.tags.length){
						vm.filteredData.push(post);
					}
				});
			}
			else{
				vm.filteredData = [];
				angular.forEach(vm.allposts, function(post){
					vm.filteredData.push(post);
				});	
			}
		}
		// function sort(predicate){
		// 		// vm.reverse = (predicate === nuorin) ? !vm.reverse : false;
		// 	vm.predicate = predicate;
		// }
		
		function showLoading(){
	    $ionicLoading.show({
	      template: '<ion-spinner></ion-spinner>',
	    });
	  }

	  function activate(){
			Post.all.$loaded().then(function(success){
				vm.allposts = success;
				vm.filteredData = [];
				angular.forEach(success, function(post){
					vm.filteredData.push(post);
				});
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