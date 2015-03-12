/**
 * Created by efi on 11/3/2015.
 */
var app = angular.module('TreasureGameApp',['gameServices','gameDirectives','ngAnimate']);

app.controller('mainCtrl',['$scope','$http',function($scope,$http){
//    $http.get('word-game-data.json').success(function(data){
//        $scope.wordGameData = data;
//    });

    var numTiles = document.getElementsByClassName('map-tile');
    $scope.disabled = new Array(numTiles.length);
    $scope.disabled[0]=false;
    $scope.disabled.fill(true,1);

    $scope.currentGame= null;

}]);

app.controller('additionCtrl',['$scope','$attrs','Path', function($scope,$attrs,Path){
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    if($attrs.firstnumber && $attrs.secondnumber){
        $scope.a = $attrs.firstnumber*1;
        $scope.b = $attrs.secondnumber*1;
    } else {
        $scope.a = getRandomInt(1, 10);
        $scope.b = getRandomInt(1, 10);
    }

    $scope.rightAnswer = $scope.a + $scope.b;
    $scope.userInput = '';

    $scope.gameId = $attrs.id*1;
    $scope.nextGameId = $scope.gameId + 1;
    $scope.buttonElem = document.getElementById('btn-'+$scope.gameId);
    $scope.nextButtonElem = document.getElementById('btn-'+$scope.nextGameId);

    $scope.checkAnswer = function(){
        return $scope.rightAnswer == $scope.userInput;
    };

    $scope.unlockPath = function(){
        Path.unlock($scope);
    };

}]);


app.controller('wordCtrl',['$scope','$attrs','Path','$http','Data', function($scope,$attrs,Path,$http,Data){

//    $scope.$parent.$watch('wordGameData', function(newVal){
//        $scope.url =newVal[$attrs.word].url;
//        $scope.rightAnswer =newVal[$attrs.word].answer;
//    });
    $scope.gameId = $attrs.id*1;
    $scope.nextGameId = $scope.gameId + 1;
    $scope.buttonElem = document.getElementById('btn-'+$scope.gameId);
    $scope.nextButtonElem = document.getElementById('btn-'+$scope.nextGameId);
    $scope.userInput = '';

    $scope.$watchGroup([Data.getWordGameData, Data.getWordGameKeys()], function(){
        $scope.gameData = Data.getWordGameData();
        $scope.gameKeys = Data.getWordGameKeys();

        //If the "word" attribute is set, then it selects the corresponding object's url and rightAnswer
        //Else, it accesses the data using the shuffled-keys array
        if($attrs.word){
            $scope.url = $scope.gameData[$attrs.word].url;
            $scope.rightAnswer = $scope.gameData[$attrs.word].answer;
        } else {
            $scope.url = $scope.gameData[$scope.gameKeys[$scope.gameId]].url;
            $scope.rightAnswer = $scope.gameData[$scope.gameKeys[$scope.gameId]].answer;
        }
    });

    $scope.checkAnswer = function(){
        return $scope.rightAnswer == $scope.userInput;
    };

    $scope.unlockPath = function(){
        Path.unlock($scope);
    };

}]);