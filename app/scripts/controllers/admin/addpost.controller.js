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
	.controller('AddPostCtrl', function(Post, $log){
		/* jshint validthis: true */
		var vm = this;
		vm.foodOptions = ['Nauta', 'Porsas', 'Lammas', 'Kana', 'Riista', 'Rasvainen kala', 'Vähärasvainen kala', 'Äyriäiset', 'Pasta', 'Salaatti'];
		vm.categoryOptions = ['Arkiviini', 'Fine Dining', 'Expert'];
		vm.tagsList = [];
		vm.allPosts = Post.all;

		vm.post = {
			title : '',
			imgUrl : '',
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
			rating : 0
		};

		vm.submitPost = submitPost;
		vm.validatePostData = validatePostData;
		vm.loadAutocompleteTags = loadAutocompleteTags;
		vm.currentYear = new Date().getFullYear();

		return vm;
		///////////////////////////

		function loadAutocompleteTags(query){
			var suggestions = [];
			var added = [];
			for (var i = vm.allPosts.length - 1; i >= 0; i--) {
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
			$log.info(suggestions);
			return suggestions;
		}

		function submitPost(){
			Post.create(vm.post).then(function(e){
				// tyhjennä post variable
				console.log(e);
				clearPostForm();
			});
		}

		function validatePostData(){
			// validaatiot tähän...
			console.log(vm.post);
			vm.submitPost();
			// var valid = true;

			// if(valid)
			// 	vm.submitPost();
			// else
			// 	console.log('invalid data');
		}
		function clearPostForm(){
			vm.post = {
				title : '',
				imgUrl : '',
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
					prize : {label:'Hintaluokka', content: 0}
				},
				category : '',
				description : '',
				foodOptions : [],
				rating : 0
			};
		}

	});


})();




// info : 
// 	[
// 		{
// 			label : "",
// 			content : ""
// 		}
//		...
// 	]