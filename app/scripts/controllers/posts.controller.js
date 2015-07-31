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
		vm.sort = '-rating';
		var autocompleteOpen = false;
		
		// functions
		vm.loadTags = loadTags;
		vm.showDetails = showDetails;
		vm.filterData = filterData;
		vm.filterDataLess = filterDataLess;
		vm.hideAutocomplete = hideAutocomplete;
		vm.showAutocomplete = showAutocomplete;
		vm.calcTagWidth = calcTagWidth;
		// vm.sort = sort;
		
		// init
		showLoading();
		activate();
		//////////////////////////////////////////

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


		// Navigate to Post details view
		function showDetails(postId){
			$state.go('tab.post-details/:id', {id:postId});
		}


		// Filter data when tag is inputed
		function filterData(tag){
			autocompleteOpen = true;

			for (var i = vm.filteredData.length - 1; i >= 0; i--) {
				var filter = true;
				for(var j = vm.filteredData[i].tags.length - 1; j >= 0; j--){
					
					var searchTag = tag.text.toLowerCase();
					var postTag = vm.filteredData[i].tags[j].toLowerCase();

					if(postTag.indexOf(searchTag) > -1){
						filter = false;
					}
				}
				if(filter){
					vm.filteredData.splice(i, 1);
				}
			}

			// Piilota inputin placeholder --> tageja ei voi enää syöttää (max 4)
			if(vm.tags.length === 4 || vm.filteredData.length === 1){
				angular.element(document.querySelectorAll('tags-input input.input')[0]).addClass('hide');
			}
			calcTagWidth();
		}


		// Show correct posts when tag is removed
		function filterDataLess(){
			autocompleteOpen = true;

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
			// Näytä placeholder
			angular.element(document.querySelectorAll('tags-input input.input')[0]).removeClass('hide');
		}


		function hideAutocomplete(){
			if ( autocompleteOpen ){
				var autocomplete = document.querySelectorAll('tags-input .autocomplete')[0];
				if ( autocomplete ){
					autocomplete.style.display = 'none';
					autocompleteOpen = false;
				}
			}
		}

		function showAutocomplete(){
			if ( !autocompleteOpen ){
				var autocomplete = document.querySelectorAll('tags-input .autocomplete')[0];
				if ( autocomplete ){
					autocomplete.style.display = 'block';
				}
			}
		}

		function calcTagWidth(){
			var tags = document.querySelectorAll('tags-input .tag-list li');
			console.log(tags);
			var correctW = document.querySelectorAll('tags-input .host')[0].offsetWidth;
			console.log('moi: '+correctW/4+'px');
			angular.forEach(tags, function(tag){
				console.log(tag);
				tag.style.width = Math.floor(correctW/4+'px');
			});
		}


		// Tags input autocorrect
		function loadTags(query){
			var suggestionList = [];

			// ei ole järkeä näyttää tagsei jos näytillä on vain yksi post
			if ( vm.filteredData.length > 1 && vm.tags.length < 4){
				for (var i = vm.filteredData.length - 1; i >= 0; i--) {
					for(var j = vm.filteredData[i].tags.length - 1; j >= 0; j--){
						
						var postTag = vm.filteredData[i].tags[j].toLowerCase();

						// jos käyttäjä on kirjoittanut queryn --> vertaa postien tageihin
						if(query.length && postTag.indexOf(query) > -1){
							if( !_.contains(suggestionList, postTag)){
								suggestionList.push(postTag);
							}
						}

						// jos ei ole querya --> palauta kaikki filteredDatan tagit (poista duplikaatit)
						else if(!query.length){
							if( !_.contains(suggestionList, postTag)){
								suggestionList.push(postTag);
							}
						}
					}
				}
				var suggestionListObjects = _.map(suggestionList, function(suggestion){ return {text:suggestion}; });
				return query.length ? suggestionListObjects : _.sample(suggestionListObjects, 15);
			}
			else{
				return [];
			}
		}

	});
})();