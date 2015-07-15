'use strict';

angular.module('viiniviikariMobile')
	.directive('colorFocus', function(){
	    return {
	    	restrict : 'A',
		    link : function(scope, element) {
		        element.bind('click', function(){
		        	element.parent().find('.colorfocus').removeClass('colorfocus');
		        	element.addClass('colorfocus');
		        });
		        // .bind('blur', function(){
		        // 	element.parent().removeClass('colorfocus');
		        // });
		    }
		};
	});