var app = angular.module('TreasureGameApp', ['gameServices', 'gameDirectives', 'ngAnimate']);

app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.mapTiles = document.getElementsByClassName('map-tile');
    $scope.currentGame = null;
    $scope.progressPointer = 0;
}]);

app.controller('additionCtrl', ['$scope', '$attrs', 'Path', function ($scope, $attrs, Path) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    if ($attrs.firstnumber && $attrs.secondnumber) {
        $scope.a = $attrs.firstnumber * 1;
        $scope.b = $attrs.secondnumber * 1;
    } else {
        $scope.a = getRandomInt(1, 10);
        $scope.b = getRandomInt(1, 10);
    }

    $scope.rightAnswer = $scope.a + $scope.b;
    $scope.userInput = '';

    $scope.checkAnswer = function () {
        return $scope.rightAnswer == $scope.userInput;
    };

    $scope.unlockPath = function () {
        Path.unlock($scope);
    };
}]);


app.controller('wordCtrl', ['$scope', '$attrs', 'Path', 'Data', function ($scope, $attrs, Path, Data) {
    $scope.userInput = '';

    $scope.$watchGroup([Data.getWordGameData, Data.getWordGameKeys], function () {
        if (typeof(Data.getWordGameKeys()) === 'undefined') return;
        if (typeof(Data.getWordGameData()) === 'undefined') return;

        $scope.gameData = Data.getWordGameData();
        $scope.gameKeys = Data.getWordGameKeys();

        //If the "word" attribute is set, then it selects the corresponding object's url and rightAnswer
        //Else, it accesses the data using the shuffled-keys array
        if ($attrs.word) {
            $scope.url = $scope.gameData[$attrs.word].url;
            $scope.rightAnswer = $scope.gameData[$attrs.word].answer;
        } else {
            var key = $scope.gameKeys[Data.assignWordGameKey()];
            $scope.url = $scope.gameData[key].url;
            $scope.rightAnswer = $scope.gameData[key].answer;
        }
    });

    $scope.checkAnswer = function () {
        return $scope.rightAnswer == $scope.userInput;
    };

    $scope.unlockPath = function () {
        Path.unlock($scope);
    };
}]);

app.controller('flagCtrl', ['$scope', '$attrs', 'Path', 'Data', function ($scope, $attrs, Path, Data) {
    var rightAnswer;

    $scope.$watch(Data.getFlagGameData, function () {
        if (typeof(Data.getFlagGameData()) === 'undefined') return;

        $scope.gameData = Data.getFlagGameData();
        $scope.flagType = $scope.gameData[$attrs.flag].type;
        rightAnswer = $scope.gameData[$attrs.flag].rightAnswer;
    });

    $scope.userInput = [];
    $scope.currentColor = null;

    $scope.checkAnswer = function () {
        return JSON.stringify($scope.userInput) == JSON.stringify(rightAnswer);
    };

    $scope.unlockPath = function () {
        Path.unlock($scope);
    };
}]);