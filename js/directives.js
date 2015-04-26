(function () {
    var app = angular.module('gameDirectives', []);

    app.directive('additionGame', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/addition-game.html'
        };
    });

    app.directive('wordGame', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/word-game.html'
        };
    });

    app.directive('flagGame', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/flag-game.html'
        };
    });
})();
