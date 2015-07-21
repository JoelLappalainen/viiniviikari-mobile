(function() { 'use strict';
/**
 * @ngdoc function
 * @name viiniviikariMobile.controller:PostDetailsCtrl
 * @description
 * # PostDetailsCtrl
 * Controller for a single post (details)
 */

angular
	.module('viiniviikariMobile')
	.controller('PostDetailsCtrl', function($stateParams, $ionicLoading, $ionicModal, $scope, Post){
		/* jshint validthis: true */
		var vm = this;

		//variabels
		vm.hidden = true;

		// functions
		vm.openModal = openModal;
		vm.toggleDetails = toggleDetails;

		showLoading();
		activate();
		
		return vm;
		//////////////////////////////////////////

		function showLoading(){
		    $ionicLoading.show({
		      template: '<ion-spinner></ion-spinner>',
		    });
		}

		function activate(){
			Post.get($stateParams.id).$loaded().then(function(success){
				vm.post = success;
				$ionicLoading.hide();
			}, function(error){
				console.log(error);
			});
			// modalin takia joutuu käyttämään $scopea...
			$ionicModal.fromTemplateUrl('views/modals/post-image-modal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
			$scope.closeModal = function() {
				$scope.modal.hide();
			};
			//Cleanup the modal when we're done with it!
			$scope.$on('$destroy', function() {
				$scope.modal.remove();
			}); 

		}
		function toggleDetails(){
			vm.hidden = !vm.hidden;
		}

		function openModal() {
			console.log('open modal');
			$scope.modal.show();
		}
		
	});
})();