(function () {
    var app = angular.module('gameServices', []);

    app.service('Path',['$timeout', function ($timeout) {
        //check conditions to unlock next tile of the path
        this.unlock = function ($scope) {
            var func = $scope.checkAnswer,
                numTiles = $scope.$parent.mapTiles.length;

            if (func()) {
                //successful answer
                if ($scope.$parent.progressPointer == numTiles - 1) {
                    //at the last tile
                    $scope.$parent.currentGame = null; //close mini-game modal
                    $scope.$parent.reachTreasure = true; // show final animation
                } else {
                    //NOT at the last tile
                    $scope.$parent.progressPointer = $scope.$parent.currentGame + 1; //point to next game
                    $scope.$parent.success = true; //show "success" animation

                    //after 500ms, close mini-game modal and "success" animation
                    $timeout(function(){
                        $scope.$parent.success = false;
                        $scope.$parent.currentGame = null;
                    }, 500);
                }
            } else {
                $scope.$parent.mistake = true; //show "mistake" animation
                //after 500ms, close "mistake" animation
                $timeout(function(){
                    $scope.$parent.mistake = false;
                }, 500);
            }
        };
    }]);

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
