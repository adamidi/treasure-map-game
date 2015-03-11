/**
 * Created by efi on 11/3/2015.
 */
var app = angular.module('TreasureGameApp',['gameServices','gameDirectives','ngAnimate']);

app.controller('mainCtrl',['$scope',function($scope){
    var numTiles = document.getElementsByClassName('map-tile');
    $scope.disabled=[false];
    for(var i=1;i<numTiles.length;i++){
        $scope.disabled.push(true);
    }
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
        Path.unlock($scope.checkAnswer,$scope.gameId,$scope.nextGameId,$scope.buttonElem,$scope.nextButtonElem,$scope.$parent.disabled);
    };

}]);


app.controller('wordCtrl',['$scope','$attrs','Path','$http', function($scope,$attrs,Path,$http){
    $http.get('word-game-data.json').success(function(data){
        $scope.url = data[$attrs.word].url;
        $scope.rightAnswer = data[$attrs.word].answer;
    });

    $scope.userInput = '';

    $scope.gameId = $attrs.id*1;
    $scope.nextGameId = $scope.gameId + 1;
    $scope.buttonElem = document.getElementById('btn-'+$scope.gameId);
    $scope.nextButtonElem = document.getElementById('btn-'+$scope.nextGameId);

    $scope.checkAnswer = function(){
        return $scope.rightAnswer == $scope.userInput;
    };

    $scope.unlockPath = function(){
        Path.unlock($scope.checkAnswer,$scope.gameId,$scope.nextGameId,$scope.buttonElem,$scope.nextButtonElem,$scope.$parent.disabled);
    };

}]);