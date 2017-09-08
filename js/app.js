/*APP CONFIG*/


var app = angular.module('teamieApp', ['ngMaterial', "ui.router", 'teamieApp.controllers', 'teamieApp.services'])
app.run(function ($rootScope, $state, $rootScope) {

	/**BROADCAST CATCHER TO HANDLE INIT PROBLEMS*/
	/* $rootScope.$on('INIT', function (event, initType) {
     if (initType.type === 'reinit')
         $state.go("app.init", {
             type: 're'
         });
     else
         $state.go("app.init");
 })*/
	/*CODE RUN TO INIT THE DB WHENEVER FIRST RUN*/
	/* try {
	     issueFactory.openDatabase().then(function () {
	         issueFactory.setupIndexedDb(setupJSON).then(function (data) {
	             console.log("SETUP", data);
	             appRun = true;
	             $state.go('app.issues')
	         }, function (error) {
	             console.log(error);
	         })
	     }, function (err) {
	         console.log(err);
	     });
	 } catch (exception) {
	     alert("The Database could not be initialized.");
	 }*/
});
/**DIRECTIVE TO CATCH ENTER BUTTON PRESS*/
app.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});
app.directive("masonry", function () {
	var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';
	return {
		compile: function (element, attrs) {
			// auto add animation to brick element
			var animation = attrs.ngAnimate || "'masonry'";
			var $brick = element.children();
			$brick.attr("ng-animate", animation);

			// generate item selector (exclude leaving items)
			var type = $brick.prop('tagName');
			var itemSelector = type + ":not([class$='-leave-active'])";

			return function (scope, element, attrs) {
				var options = angular.extend({
					itemSelector: itemSelector
				}, scope.$eval(attrs.masonry));

				// try to infer model from ngRepeat
				if (!options.model) {
					var ngRepeatMatch = element.html().match(NGREPEAT_SOURCE_RE);
					if (ngRepeatMatch) {
						options.model = ngRepeatMatch[4];
					}
				}

				// initial animation
				element.addClass('masonry');

				// Wait inside directives to render
				setTimeout(function () {
					element.masonry(options);

					element.on("$destroy", function () {
						element.masonry('destroy')
					});

					if (options.model) {
						scope.$apply(function () {
							scope.$watchCollection(options.model, function (_new, _old) {
								if (_new == _old) return;

								// Wait inside directives to render
								setTimeout(function () {
									element.masonry("reload");
								});
							});
						});
					}
				});
			};
		}
	};
})
app.config(function ($stateProvider, $urlRouterProvider) {
	/**APP STATES*/
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true
		})
		.state('app.home', {
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: 'homeController'
		})
	/*.state('app.init', {
	    url: '/Init/:type',
	    templateUrl: "templates/init.html",
	    controller: 'initCtrl'

	})
	.state('app.issues', {
	    url: '/Issues',
	    templateUrl: "templates/issue-list.html",
	    controller: 'issueListCtrl'

	})
	.state('app.newIssue', {
	    url: '/NewIssue',
	    templateUrl: "templates/issue-new.html",
	    controller: 'newIssueCtrl'


	}).state('app.issueDetails', {
	    url: '/IssueDetails/:SR',
	    templateUrl: "templates/issue-detail.html",
	    controller: 'issueDetailCtrl'

	})*/
	$urlRouterProvider.otherwise('app/home');

	/*$routeProvider
	.state("/", {
	    templateUrl: "templates/issue-list.html",
	    controller: 'issueListCtrl'
	})
	.state("/newIssue", {
	    templateUrl: "templates/issue-new.html",
	    controller: 'newIssueCtrl'
	})
	.state("/issueDetail:SR", {
	    templateUrl: "templates/issue-detail.html",
	    controller: 'issueDetailCtrl'
	})
	.otherwise({
	    templateUrl: "templates/issue-list.html",
	    controller: 'issueListCtrl'
	});*/
});
app.filter("joinDateFilter", function () {
	return function (items, from, to) {
		var df = Date.parse(from);

		var dt = Date.parse(to);
		if (from !== "" && to !== "") {

			var arrayToReturn = [];
			for (var i = 0; i < items.length; i++) {
				var jd = new Date(items[i].join_date * 1000);
				if (jd > df && jd < dt) {
					arrayToReturn.push(items[i]);
				}
			}

			return arrayToReturn;
		} else {
			return items;
		}
	};
});
