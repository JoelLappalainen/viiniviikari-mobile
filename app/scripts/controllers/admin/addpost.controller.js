(function(){ 'use strict';
/**
 * @ngdoc function
 * @name viiniviikariMobile.controller:AddPostCtrl
 * @description
 * # AddPostCtrl
 * Controller for adding new posts
 */

angular
	.module('viiniviikariMobile')
	.controller('AddPostCtrl', function(Post, $log, $q, $state, $cordovaToast, $ionicLoading, $cordovaCamera){
		/* jshint validthis: true */
		var vm = this;
		vm.currentYear = new Date().getFullYear();
		vm.foodOptions = ['Nauta', 'Porsas', 'Lammas', 'Kana', 'Riista', 'Rasvainen kala', 'Vähärasvainen kala', 'Äyriäiset', 'Pasta', 'Salaatti'];
		vm.categoryOptions = ['Arkiviini', 'Fine Dining', 'Expert'];
		vm.tagsList = [];
		vm.allPosts = Post.all;

		//https://farm1.staticflickr.com/458/18379325189_72aa346583_q.jpg
		vm.post = {
			title : '',
			image : '',
			category : '',
			description : '',
			foodOptions : [],
			rating : 0,
			tags : [],
			details :
			{
				grapes : {label:'Rypäleet', content: []},
				year : {label:'Vuosi', content: ''},
				producer : {label:'Tuottaja', content: ''},
				type : {label:'Tyyppi', content: ''},
				country : {label:'Maa', content: ''},
				location : {label:'Alue', content: ''},
				plot : {label:'Palsta', content: ''},
				litres : {label:'Litramäärä', content: ''},
				prize : {label:'Hintaluokka', content: ''}
			}
		};

		// vm.submitPost = submitPost;
		vm.toggleFoodSelection = toggleFoodSelection;
		vm.validatePostData = validatePostData;
		vm.loadAutocompleteTags = loadAutocompleteTags;
		vm.takePicture = takePicture;
		vm.givePrice = givePrice;

		//generateRandomPosts();

		return vm;
		//////////////////////////////////////////


		function generateRandomPosts(){
			var randPost, randCat, randPrize, randFood, randTags;
			for (var i = 30 - 1; i >= 0; i--) {
				randCat = i%2 ? 'Arkiviini' : 'Fine Dining';
				randPrize = i%2 ? 'Kallis' : 'Halpa';
				randFood = i%2 ? ['Nauta', 'Porsas', 'Lammas'] : ['Rasvainen kala', 'Äyriäiset'];
				randTags = i%2 ? ['meta1', 'meta2', 'meta3', randCat, randPrize] : ['meta4', 'meta5', randCat, randPrize];
				randTags = randTags.concat(randFood);
				if(i >= 25){
					randTags = randTags.concat('spessu');
				}
				randPost = {
					title : 'Otsikko'+i.toString(),
					image : '',
					details : 
					{
						grapes : {label:'Rypäleet', content: [
							{text:'Rybäle'+(i%2).toString()}, 
							{text:'Ryphäle'+i.toString()},
							{text:'Ryyppäle'+(i%3).toString()}
						]},
						year : {label:'Vuosi', content: (i*100).toString()},
						producer : {label:'Tuottaja', content: 'Tuottaja'+i.toString()},
						type : {label:'Tyyppi', content: 'Tyyppi'+i.toString()},
						country : {label:'Maa', content: 'Maa'+i.toString()},
						location : {label:'Alue', content: 'Sijainti'+i.toString()},
						plot : {label:'Palsta', content: 'Palsta'+i.toString()},
						litres : {label:'Litramäärä', content: '1'},
						prize : {label:'Hintaluokka', content: randPrize}
					},
					category : randCat,
					description : 'Totally awesome!',
					foodOptions : randFood,
					rating : (i%2)+2,
					tags : randTags
				};
				//console.log(randPost);
				Post.create(randPost);

			}
		}

		function showLoading(){
		  $ionicLoading.show({
		    template: '<ion-spinner></ion-spinner>',
		  });
		}

		function hideLoading(){
			$ionicLoading.hide();
		}

		function validatePostData(){
			// validaatiot tähän...
			window.alert('from validatePostData');
			submitPost();
		}

		function givePrice(price){
			console.log('dafaga');
			vm.post.details.prize.content = price;
		}


		function submitPost(){
			showLoading();
			generateTags().then(function(tags){

				vm.post.tags = tags;
				Post.create(vm.post).then(function(){
					// käytä tätä kun devaat koneella //////////
					//clearPostForm();
			    //$state.go('tab.home');
			    ////////////////////////////////////////////

			    // ja tätä kun laitat appsin puhelimelle////
					$cordovaToast
		        .show('Arvostelu lisätty!', 'short', 'center')
		        .then(function(success) {
		          console.log('success: '+success);
		          // empty fields
		          clearPostForm();
		          hideLoading();
		          $state.go('tab.account');
		        }, function (error) {
		          window.alert('error --> '+error);
		        });
		      /////////////////////////////////////////////
				});
			});
		}

		function clearPostForm(){
			vm.post = {
				title : '',
				image : '',
				details : 
				{
					grapes : {label:'Rypäleet', content: []},
					year : {label:'Vuosi', content: ''},
					producer : {label:'Tuottaja', content: ''},
					type : {label:'Tyyppi', content: ''},
					country : {label:'Maa', content: ''},
					location : {label:'Alue', content: ''},
					plot : {label:'Palsta', content: ''},
					litres : {label:'Litramäärä', content: ''},
					prize : {label:'Hintaluokka', content: ''}
				},
				category : '',
				description : '',
				foodOptions : [],
				rating : 0,
				tags : []
			};
		}

		function takePicture(){
			var options = {
          quality : 60,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 500,
          targetHeight: 500,
          correctOrientation: true,
          saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        // bind to post image
        vm.post.image = imageData;
        $cordovaCamera.cleanup();
      }, function(error) {
        console.error(error);
      });
		}

		function loadAutocompleteTags(query){
			var suggestions = [];
			var added = [];
			for (var i = vm.allPosts.length - 1; i >= 0; i--) {
				if (vm.allPosts[i].details.grapes.content){
					for (var j = vm.allPosts[i].details.grapes.content.length - 1; j >= 0; j--) {
						// muuta ehdotus lower case ja tarkista löytyykö query siitä
						if( vm.allPosts[i].details.grapes.content[j].text.toLowerCase().indexOf( query.toLowerCase() ) >= 0 && added.indexOf(vm.allPosts[i].details.grapes.content[j].text) === -1){
							// lisätään myös toiseen listaan josta on helpompi tarkistaa onko jotain rypälettä jo lisätty
							added.push(vm.allPosts[i].details.grapes.content[j].text);
							// jos löytyy --> lisää ehdotuksiin
							suggestions.push({text : vm.allPosts[i].details.grapes.content[j].text});
						}
					}
				}
			}
			$log.info(suggestions);
			return suggestions;
		}

		function toggleFoodSelection(food){
			var idx = vm.post.foodOptions.indexOf(food);
		     // is currently selected
		     if (idx > -1) {
		       vm.post.foodOptions.splice(idx, 1);
		     }
		     // is newly selected
		     else {
		       vm.post.foodOptions.push(food);
		     }
		}

		
		function generateTags(){
			return $q(function(resolve, reject){
				if (vm.post.title) {
					var tags = [];
					// add title and category
					if (vm.post.title && vm.post.category){
						tags.push(vm.post.title, vm.post.category);
					}
					// add some of the details
					if (vm.post.details.producer && vm.post.details.type){
						tags.push(vm.post.details.producer.content, vm.post.details.type.content, vm.post.details.country.content, vm.post.details.location.content);
					}
					// add grapes
					if (vm.post.details.grapes.content.length){
						angular.forEach(vm.post.details.grapes.content, function(grape){
							tags.push(grape.text);
						});
					}
					// add food options
					if (vm.post.foodOptions.length){
						tags = tags.concat(vm.foodOptions);
					}
					// meta tags
					if (vm.tagsList){
						angular.forEach(vm.tagsList, function(tag){
							tags.push(tag.text);
						});
					}
					resolve(tags);
				}
				else{
					reject('Post data not valid!');
				}
			});
		}

	});
})();
