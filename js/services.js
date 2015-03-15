(function () {
    var app = angular.module('gameServices', []);

    app.service('Path', function () {
        this.unlock = function ($scope) {
            var func = $scope.checkAnswer,
                numTiles = $scope.$parent.mapTiles.length;

            if (func()) {
                if ($scope.$parent.progressPointer == numTiles - 1) {
                    $scope.$parent.currentGame = null;

                    alert("Congratulations !");
                } else {
                    $scope.$parent.progressPointer = $scope.$parent.currentGame + 1;
                    $scope.$parent.currentGame = null;
                }
            }
        };
    });

    app.factory('Data', ['$http', function ($http) {
        var wordGameData, randomWordGameKeys, flagGameData;
        var wordGameKey = 0;

        $http.get('word-game-data.json').success(function (data) {
            wordGameData = data;
            randomWordGameKeys = shuffle(Object.keys(data));
        });

        $http.get('flag-game-data.json').success(function (data) {
            flagGameData = data;
        });

        var shuffle = function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        };

        var getWordGameData = function () {
            return wordGameData;
        };

        var getWordGameKeys = function () {
            return randomWordGameKeys;
        };

        var getFlagGameData = function () {
            return flagGameData;
        };

        var assignWordGameKey = function () {
            return wordGameKey++;
        };

        return {
            getWordGameData: getWordGameData,
            getWordGameKeys: getWordGameKeys,
            getFlagGameData: getFlagGameData,
            assignWordGameKey: assignWordGameKey
        };

    }]);

})();
