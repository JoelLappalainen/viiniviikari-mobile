(function(){

angular
	.module('viiniviikari')
	.controller('addPostCtrl', function(Post){
		/* jshint validthis: true */
		var vm = this;
		vm.postTypes = ['Viini', 'Ruoka'];
		vm.post = {
			title : '',
			imgUrl : '',
			details : [],
			description : '',
			rating : 0
		};

		vm.submitPost = submitPost;
		vm.validatePostData = validatePostData;
		return vm;
		///////////////////////////

		function submitPost(){
			Post.save(vm.post);
			// tyhjennä post variable
			vm.post = {
				title : '',
				imgUrl : '',
				details : [],
				description : '',
				rating : 0
			};
		}

		function validatePostData(){
			// validaatiot tähän...
			var valid = true;

			if(valid)
				vm.submitPost();
			else
				console.log("invalid data");
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