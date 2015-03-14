/**
 * Created by efi on 11/3/2015.
 */
var app = angular.module('TreasureGameApp',['gameServices','gameDirectives','ngAnimate']);

app.controller('mainCtrl',['$scope','$http',function($scope,$http){
//    $http.get('word-game-data.json').success(function(data){
//        $scope.wordGameData = data;
//    });
//    $scope.gameIds = [];
//    $scope.gamesNumber=10;
//    for(var i=0;i<$scope.gamesNumber;i++){
//        $scope.gameIds[i] = i;
//    }

    var numTiles = document.getElementsByClassName('map-tile');
    $scope.disabled = new Array(numTiles.length);
//    $scope.disabled = new Array($scope.gamesNumber);
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

    $scope.$watchGroup([Data.getWordGameKeys,Data.getWordGameKeys], function(){
        if(typeof(Data.getWordGameKeys()) === 'undefined') return;
        if(typeof(Data.getWordGameData()) === 'undefined') return;

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

app.controller('flagCtrl',['$scope','$attrs','Path',function($scope,$attrs,Path){

    $scope.gameId = $attrs.id*1;
    $scope.nextGameId = $scope.gameId + 1;
    $scope.buttonElem = document.getElementById('btn-'+$scope.gameId);
    $scope.nextButtonElem = document.getElementById('btn-'+$scope.nextGameId);

    $scope.currentColor=null;
    $scope.country=$attrs.flag;
    $scope.color = [];

    var rightAnswer=[];
    $scope.$parent.$watch('currentGame',function(newVal){
        if(newVal == $scope.gameId){
            var flagParts = document.getElementsByClassName('flag-part '+$scope.country);
            for(var i=0;i<flagParts.length;i++){
                rightAnswer[i]=false;
            }
        }
    });

//    $scope.countryDirective = '<flag-'+$attrs.flag+'></flag-'+$attrs.flag+'>';

    $scope.setColor = function(e,rightColor){
        var elem= e.currentTarget;
        var partId = elem.getAttribute('part-id');

        elem.style.backgroundColor = $scope.currentColor;

        if($scope.currentColor==rightColor){
            rightAnswer[partId]=true;
        } else {
            rightAnswer[partId]=false;
        }
    };

    $scope.checkAnswer = function(){
        return rightAnswer.every(elem => elem===true);
    };

    $scope.unlockPath = function(){
        Path.unlock($scope);
        console.log(rightAnswer)
    };



}]);