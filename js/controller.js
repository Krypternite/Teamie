angular.module('teamieApp.controllers', [])
	.controller('sidemenuController', function ($scope, $mdSidenav) {
		$scope.openLeftMenu = function () {
			$mdSidenav('left').toggle();
		};
	})
	.controller('homeController', function ($scope, userFactory, $timeout, $mdDialog) {
		var HMConfigData = {
			getFollowers: function () {
				$scope.HMScopeData.followersList = angular.copy(userFactory.getUsers());
			},
			DialogController: function ($scope, $mdDialog) {
				$scope.dateFilter = {
					startDate: '',
					endDate: ''
				};
				$scope.hide = function () {
					$mdDialog.hide();
				};

				$scope.cancel = function () {
					$mdDialog.cancel();
				};

				$scope.answer = function (answer) {
					$mdDialog.hide($scope.dateFilter);
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
				endDate: ''
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
			filters: [{
					'name': 'Twubric Score',
					'value': 'twubric.total'
			},
				{
					'name': 'Friends',
					'value': 'twubric.friends'
			},
				{
					'name': 'Influence',
					'value': 'twubric.influence'
			},
				{
					'name': 'Chirpiness',
					'value': 'twubric.chirpiness'
			}],
			clearFilters: function () {
				this.sortData = {
					value: '',
					ascending: true
				};
			},
			followersList: [],
			showDateSelector: function (ev) {


				$mdDialog.show({
						controller: HMConfigData.DialogController,
						templateUrl: 'templates/dateDialog.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: false,
						fullscreen: true // Only for -xs, -sm breakpoints.
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
			}


		};
		$timeout(function () {
			HMConfigData.getFollowers();
			$scope.HMScopeData.loading = false;
		}, 200);



	})
	.controller('MainCtrl', function ($scope, $http, $timeout) {
		$scope.items = [];
		$timeout(function () {
			$scope.items = angular.copy(
                    [{
						"id": 0,
						"picture": "http://placehold.it/32x32",
						"age": 31,
						"name": "Mathews Goff"
                        },
					{
						"id": 1,
						"picture": "http://placehold.it/32x32",
						"age": 36,
						"name": "Collins Alston"
                        },
					{
						"id": 2,
						"picture": "http://placehold.it/32x32",
						"age": 27,
						"name": "Jasmine Rollins"
                        },
					{
						"id": 3,
						"picture": "http://placehold.it/32x32",
						"age": 32,
						"name": "Julie Jefferson"
                        },
					{
						"id": 4,
						"picture": "http://placehold.it/32x32",
						"age": 23,
						"name": "Wilder King"
                        },
					{
						"id": 5,
						"picture": "http://placehold.it/32x32",
						"age": 23,
						"name": "Stanley Moore"
                        },
					{
						"id": 6,
						"picture": "http://placehold.it/32x32",
						"age": 36,
						"name": "Reynolds Bishop"
                        },
					{
						"id": 7,
						"picture": "http://placehold.it/32x32",
						"age": 26,
						"name": "Bryant Flowers"
                        },
					{
						"id": 8,
						"picture": "http://placehold.it/32x32",
						"age": 38,
						"name": "Jenifer Martinez"
                        },
					{
						"id": 9,
						"picture": "http://placehold.it/32x32",
						"age": 40,
						"name": "Mcguire Pittman"
                        },
					{
						"id": 10,
						"picture": "http://placehold.it/32x32",
						"age": 34,
						"name": "Valdez Hyde"
                        },
					{
						"id": 11,
						"picture": "http://placehold.it/32x32",
						"age": 34,
						"name": "Marla Mayo"
                        },
					{
						"id": 12,
						"picture": "http://placehold.it/32x32",
						"age": 30,
						"name": "Brown Ortega"
                        },
					{
						"id": 13,
						"picture": "http://placehold.it/32x32",
						"age": 32,
						"name": "Jeannette William"
                        },
					{
						"id": 14,
						"picture": "http://placehold.it/32x32",
						"age": 30,
						"name": "Bridges Ashley"
                        },
					{
						"id": 15,
						"picture": "http://placehold.it/32x32",
						"age": 33,
						"name": "Latasha Hewitt"
                        },
					{
						"id": 16,
						"picture": "http://placehold.it/32x32",
						"age": 35,
						"name": "Alma Sawyer"
                        },
					{
						"id": 17,
						"picture": "http://placehold.it/32x32",
						"age": 21,
						"name": "Liz Mcbride"
                        },
					{
						"id": 18,
						"picture": "http://placehold.it/32x32",
						"age": 26,
						"name": "Mcintosh Chandler"
                        },
					{
						"id": 19,
						"picture": "http://placehold.it/32x32",
						"age": 20,
						"name": "Alford Hartman"
                        },
					{
						"id": 20,
						"picture": "http://placehold.it/32x32",
						"age": 29,
						"name": "Tiffany Green"
                        },
					{
						"id": 21,
						"picture": "http://placehold.it/32x32",
						"age": 38,
						"name": "Stafford Riggs"
                        },
					{
						"id": 22,
						"picture": "http://placehold.it/32x32",
						"age": 40,
						"name": "Elinor Chambers"
                        },
					{
						"id": 23,
						"picture": "http://placehold.it/32x32",
						"age": 27,
						"name": "Carly Howard"
                        },
					{
						"id": 24,
						"picture": "http://placehold.it/32x32",
						"age": 27,
						"name": "Rosalind Sanchez"
                        },
					{
						"id": 25,
						"picture": "http://placehold.it/32x32",
						"age": 28,
						"name": "Jaclyn Shelton"
                        },
					{
						"id": 26,
						"picture": "http://placehold.it/32x32",
						"age": 25,
						"name": "Hughes Phelps"
                        },
					{
						"id": 27,
						"picture": "http://placehold.it/32x32",
						"age": 36,
						"name": "Rosetta Barrett"
                        },
					{
						"id": 28,
						"picture": "http://placehold.it/32x32",
						"age": 29,
						"name": "Jarvis Wong"
                        },
					{
						"id": 29,
						"picture": "http://placehold.it/32x32",
						"age": 23,
						"name": "Kerri Pennington"
                        }
                    ]);
		}, 200)
	});
