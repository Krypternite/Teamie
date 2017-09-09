angular.module('teamieApp.components', []);
angular.module('teamieApp')
	.component('leftSide', {
		templateUrl: 'templates/leftSideMenu.html',
		bindings: {
			user: '=',
			creator: '='
		},
		controller: function ($mdMedia, $scope) {
			console.log($mdMedia);
		}
	})
	.component('mainToolbar', {
		templateUrl: 'templates/mainToolbar.html',
		controller: function ($mdSidenav, $scope) {
			$scope.openLeftMenu = function () {
				$mdSidenav('left').toggle();
			};
		}
	})
