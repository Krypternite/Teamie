/*APP CONFIG*/


var app = angular.module('teamieApp', ['ngMaterial', 
                                        "ui.router", 
                                        "cfp.hotkeys", 
                                        'teamieApp.controllers',
                                        'teamieApp.services', 
                                        'teamieApp.components',])

/*APP RUN FUNCTION*/
app.run(function ($rootScope, $state, $rootScope) {});
/**DIRECTIVE FOR MASONRY BRICKS ANIMATIONS BUTTON PRESS*/
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
								if (_new === _old) return;

								// Wait inside directives to render
								setTimeout(function () {
									element.masonry("reload");
								}, 20);
							});
						});
					}
				});
			};
		}
	};
});
/*CONFIG*/
app.config(function ($stateProvider, $urlRouterProvider, hotkeysProvider) {
	hotkeysProvider.includeCheatSheet = true;
	/**APP STATES*/
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true
		})
		.state('app.home', {
			url: '/home',
			templateUrl: 'templates/home.html'
		})
	$urlRouterProvider.otherwise('app/home');
});
/*CUSTOM FILTER FOR FILTERING FOLLOWERS ON JOINING DATES*/
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
		} else if (isNaN(df) || isNan(dt)) {
			return items;
		} else {
			return items;
		}
	};
});
