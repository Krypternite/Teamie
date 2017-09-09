angular.module('teamieApp.controllers', [])
	.controller('sidemenuController', function ($scope, $mdSidenav, userFactory) {

		var sideMenuConfig = {};
		$scope.sideMenuScope = {
			dateFilter: {
				startDate: '',
				endDate: '',
				state: false
			},
			filters: userFactory.getFilters(),
			sortData: {
				value: '',
				ascending: true
			},
			sortCards: function (value) {
				if (this.sortData.value === value) {
					this.sortData.value = "-" + value;
					this.sortData.ascending = false;
				} else {
					this.sortData.ascending = true;
					this.sortData.value = value;
				}
			},
			clearDateFilter: function () {
				this.dateFilter = {
					startDate: '',
					endDate: '',
					state: false
				};
			},
			clearFilters: function () {

				$timeout(function () {

					$scope.HMScopeData.sortData = {
						value: '',
						ascending: true
					};
					$scope.HMScopeData.clearDateFilter();
					$scope.HMScopeData.loading = false;
				}, 500);


			},

		};


		$scope.openLeftMenu = function () {
			$mdSidenav('left').toggle();
		};
	})
	.controller('homeController', function ($scope, userFactory, $timeout, $mdDialog, $mdBottomSheet, $mdSidenav, $mdToast) {
		var HMConfigData = {
			getFollowers: function () {
				$scope.HMScopeData.followersList = angular.copy(userFactory.getUsers());
			},
			DialogController: function ($scope, $mdDialog, dateFilter) {
				$scope.dateFilter = {
					startDate: '',
					endDate: '',
					validation: false,
					validationMessage: ''
				};
				if (dateFilter.state) {
					$scope.dateFilter.endDate = angular.copy(dateFilter.endDate);
					$scope.dateFilter.startDate = angular.copy(dateFilter.startDate);
				}
				$scope.hide = function () {
					$mdDialog.hide();
				};

				$scope.cancel = function () {
					$mdDialog.cancel();
				};

				$scope.checkDate = function () {
					if ($scope.dateFilter.startDate > $scope.dateFilter.endDate) {
						$scope.dateFilter.validation = true;
						$scope.dateFilter.validationMessage = "Start date must be less than end date";



					} else {
						$scope.dateFilter.validation = false;
						$scope.dateFilter.validationMessage = "";


					}

				}

				$scope.answer = function (answer) {
					if ($scope.dateFilter.validation === false)
						$mdDialog.hide($scope.dateFilter);
				};
			},
			BottomSheetController: function ($scope, $mdBottomSheet) {
				$scope.items = [
					{
						icon: 'accessible',
						class: 'md-primary md-hue-2'
			},
					{
						icon: 'face',
						class: 'md-warn md-hue-2'
			},
					{
						icon: 'favorite',
						class: 'md-primary'
			},
					{
						icon: 'delete',
						class: 'md-primary'
			}
          ];
				$scope.listItemClick = function ($index) {
					var clickedItem = $scope.items[$index];
					$mdBottomSheet.hide(clickedItem);
				};
			}
		};


		$scope.HMScopeData = {

			loading: true,
			sortData: {
				value: '',
				ascending: true
			},
			dateFilter: {
				startDate: '',
				endDate: '',
				state: false
			},
			sortCards: function (filter) {
				if (this.sortData.value === filter.value) {
					this.sortData.value = "-" + filter.value;
					this.sortData.ascending = false;
				} else {
					this.sortData.ascending = true;
					this.sortData.value = filter.value;
				}

				$mdToast.show(
					$mdToast.simple()
					.textContent("Filter set as  : " + filter.name + " " + ($scope.HMScopeData.sortData.ascending === true ? 'Ascending' : 'Descending')).position('top right').toastClass('md-primary').capsule('true')
					.hideDelay(2000)
				);

			},
			filters: userFactory.getFilters(),
			clearDateFilter: function () {
				this.dateFilter = {
					startDate: '',
					endDate: '',
					state: false
				};
			},
			clearFilters: function () {

				this.loading = true;
				$timeout(function () {

					$scope.HMScopeData.sortData = {
						value: '',
						ascending: true
					};
					$scope.HMScopeData.clearDateFilter();
					$scope.HMScopeData.loading = false;
				}, 500);


			},
			followersList: [],
			showDateSelector: function (ev) {


				$mdDialog.show({
						controller: HMConfigData.DialogController,
						templateUrl: 'templates/dateDialog.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: false,
						fullscreen: true,
						resolve: {
							dateFilter: function () {
								return $scope.HMScopeData.dateFilter
							}
						} // Only for -xs, -sm breakpoints.,

					})
					.then(function (dateFilter) {
						//						scope.HMScopeData.loading = true;
						if (!angular.isUndefined(dateFilter.startDate) && !angular.isUndefined(dateFilter.endDate)) {
							var sD = Date.parse(dateFilter.startDate);
							var eD = Date.parse(dateFilter.endDate);

							/*for (var i = 0; i < $scope.HMScopeData.followersList.length; i++) {
								var join_date = $scope.HMScopeData.followersList[i].join_date;

								if (sDate < join_date && join_date < eDate) {
									newFilteredUsers.push(users[i]);
								}
							}
							
							
*/

							$scope.HMScopeData.dateFilter = angular.copy(dateFilter);
							$scope.HMScopeData.dateFilter.state = true;
							$scope.HMScopeData.sortData.value = 'twubric.join_date';
							$scope.HMScopeData.sortData.ascending = 'true';
							/*$scope.HMScopeData.loading = true;
							$timeout(function () {
								$scope.HMScopeData.dateFilter = angular.copy(dateFilter);
								$scope.HMScopeData.dateFilter.state = true;
								$scope.HMScopeData.sortData.value = 'twubric.join_date';
								$scope.HMScopeData.sortData.ascending = 'true';
								$scope.HMScopeData.loading = false;
							}, 200);*/


						}
					}, function () {
						$scope.status = 'You cancelled the dialog.';
					});


			},
			closeDateSelector: function () {
				$mdDialog.cancel();
			},
			removerUser: function (uid) {
				console.log(uid);
				/*this.followersList.splice(index, 1);
				$timeout(function () {
					var a = this.followersList;

					this.followersList = [];
					this.followersList = angular.copy(a);
				}, 0);*/

				this.followersList = this.followersList.filter(function (obj) {
					return obj.uid !== uid;
				});
			},
			toggleRightMenu: function () {
				$mdSidenav('right').toggle();
			}


		};
		$timeout(function () {
			HMConfigData.getFollowers();
			$scope.HMScopeData.loading = false;
		}, 200);




		$scope.showListBottomSheet = function ($event) {
			$mdBottomSheet.show({
				templateUrl: 'templates/bottomSheet.html',
				controller: HMConfigData.BottomSheetController,
				targetEvent: $event
			}).then(function (clickedItem) {
				//$scope.alert = clickedItem.name + ' clicked!';
			});
		};

		$scope.isOpen = false;
		$scope.tooltipVisible = $scope.isOpen;
	})

	.controller('RightMenuController', function () {})
