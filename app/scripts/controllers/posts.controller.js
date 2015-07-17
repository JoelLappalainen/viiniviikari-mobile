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
	.controller('PostsCtrl', function($state, $ionicLoading, Post, Tags){
		/* jshint validthis: true */
		var vm = this;

		//simulates allPosts variable
		var TEST_DATA = [
											{tags: ['yksi', 'kaksi', 'aaa']},
											{tags: ['yksi', 'kaksi', 'bbb']},
											{tags: ['yksi', 'kaksi', 'ccc']},
											{tags: ['yksi', 'kaksi', 'aaa']},
											{tags: ['yksi', 'kaksi', 'bbb']},
											{tags: ['yksi', 'ccc']},
											{tags: ['yksi', 'aaa']}
										];

		// variables
		vm.tags = [];
		vm.filteredData = TEST_DATA;
		
		// functions
		vm.loadTags = loadTags;
		vm.showDetails = showDetails;
		vm.filterData = filterData;
		
		// init
		showLoading();
		activate();
		//////////////////////////////////////////

		//filterData- function by tags
		function filterData(tag){
			console.log(tag);
			//oikeeesti testDatan tilalle tulee filteredData
			for (var i = vm.filteredData.length - 1; i >= 0; i--) {
				var filter = true;
				for(var j = vm.filteredData[i].tags.length - 1; j >= 0; j--){
					if(vm.filteredData[i].tags[j] === tag.text){
						filter = false;
					}
				}
				console.log(filter);
				if(filter){
					//console.log("moi");
					vm.filteredData.splice(i, 1);
				}
			}	
			console.log(vm.filteredData);
		}

		function showLoading(){
	    $ionicLoading.show({
	      template: '<ion-spinner></ion-spinner>',
	    });
	  }

	  function activate(){
			Post.all.$loaded().then(function(success){
				vm.allPosts = success;
				$ionicLoading.hide();
			}, function(error){
				console.log(error);
			});
		}

		function showDetails(postId){
			console.log(postId);
			$state.go('tab.post-details/:id', {id:postId});
		}

		function loadTags(){
			// console.log(Tags.all);
			return [{text : 'moi'}, {text : 'moi1'}, {text : 'moi2'}, {text : 'moi3'}];
		}

	});
})();