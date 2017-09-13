angular.module('teamieApp.components', [])
//angular.module('teamieApp')
	.component('leftSide', {
		templateUrl: 'templates/leftSideMenu.html',
		bindings: {
			user: '=',
			creator: '='
		},
		controller: function ($mdMedia, $scope) {

		}
	})
	.component('headerBar', {
		templateUrl: 'templates/headerBar.html',
		controller: function ($mdSidenav, $scope) {
			$scope.openLeftMenu = function () {
				$mdSidenav('left').toggle();
			};
		}
	})
	.component('followerGrid', {
		templateUrl: 'templates/masonry-cards.html',
		controller: function ($scope, userFactory, $timeout, $mdDialog, $mdSidenav, $mdToast, hotkeys) {
			let HMConfigData = {
				//fn - to get the list of followers
				getFollowers: function () {
					$scope.HMScopeData.followersList = angular.copy(userFactory.getUsers());
				},
				//date selection popup controller
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
				//fn - to add hotkeys
				addHotKeys: function () {
					hotkeys.add({
						combo: 'space+t',
						description: 'For sorting the cards based on Total Score',
						callback: function () {
							$scope.HMScopeData.sortCards({
								name: 'Total Score',
								value: 'twubric.total'
							})
						}
					});

					hotkeys.add({
						combo: 'space+i',
						description: 'For sorting the cards based on Influence',
						callback: function () {
							$scope.HMScopeData.sortCards({
								name: 'Influence',
								value: 'twubric.influence'
							})
						}
					});

					hotkeys.add({
						combo: 'space+f',
						description: 'For sorting the cards based on Friends',
						callback: function () {
							$scope.HMScopeData.sortCards({
								name: 'Friends',
								value: 'twubric.friends'
							})
						}
					});

					hotkeys.add({
						combo: 'space+c',
						description: 'For sorting the cards based on Chirpiness',
						callback: function () {
							$scope.HMScopeData.sortCards({
								name: 'Chirpiness',
								value: 'twubric.chirpiness'
							})
						}
					});


					hotkeys.add({
						combo: 'space+j',
						description: 'For opening the date selector popup',
						callback: function () {
							$scope.HMScopeData.showDateSelector();
						}
					});



					hotkeys.add({
						combo: 'space+r',
						description: 'For Re-setting the filters',
						callback: function () {
							$scope.HMScopeData.clearFilters();
						}
					});


					hotkeys.add({
						combo: 'space+d',
						description: 'For Re-setting the filters',
						callback: function () {
							$('#btn_del').focus().val();
						}
					});



				}

			};

			/*SCOPE OBJECT*/
			$scope.HMScopeData = {
				//flag for FAB toolbar open state
				isFABOpen : false,
				//flag for loading state
				loading: true,
				//array to hold the list of followers
				followersList: [],
				//object to hold sort values
				sortData: {
					value: '',
					ascending: true
				},
				//object that holds date filter
				dateFilter: {
					startDate: '',
					endDate: '',
					state: false
				},
				//fn - to sort cards based on various valuess
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
				// array of filter names and their values
				filters: userFactory.getFilters(),
				//fn - to clear the selected date range
				clearDateFilter: function () {
					this.dateFilter = {
						startDate: '',
						endDate: '',
						state: false
					};
				},
				//fn - to clear the applied filters
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
				//fn - that shows the selection popup
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
									let sD = Date.parse(dateFilter.startDate);
									let eD = Date.parse(dateFilter.endDate);

									$scope.HMScopeData.dateFilter = angular.copy(dateFilter);
									$scope.HMScopeData.dateFilter.state = true;
									$scope.HMScopeData.sortData.value = 'twubric.join_date';
									$scope.HMScopeData.sortData.ascending = 'true';



								}
							}, function () {
								$scope.status = 'You cancelled the dialog.';
							});


				},
				//fn - that closes the selection popup
				closeDateSelector: function () {
					$mdDialog.cancel();
				},
				//fn - to delete users from followersList
				removerUser: function (uid) {
					this.followersList = this.followersList.filter(function (obj) {
						return obj.uid !== uid;
					});
				},
				//fn - to toggle the side menu open and close
				toggleRightMenu: function () {
					$mdSidenav('right').toggle();
				}


			};
			
			$timeout(function () {
				HMConfigData.getFollowers();
				HMConfigData.addHotKeys();
				$scope.HMScopeData.loading = false;

			}, 2000);

			$scope.HMScopeData.tooltipVisible = $scope.HMScopeData.isOpen;


		}
	})