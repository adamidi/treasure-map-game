/**
 * Created by efi on 10/3/2015.
 */
(function(){
    var app = angular.module('gameServices',[]);

    app.service('Path',function(){
        this.unlock = function($scope){
            var func= $scope.checkAnswer,
                gameId= $scope.gameId,
                nextGameId= $scope.nextGameId,
                btn= $scope.buttonElem,
                nextBtn = $scope.nextButtonElem,
                disabled=$scope.$parent.disabled;

            if(func()){
                if(gameId==disabled.length-1){
                    btn.classList.remove('highlight-button');
                    alert("Congratulations !");
                } else {
                    disabled[nextGameId]=false;
                    nextBtn.classList.add('highlight-button');
                    btn.classList.remove('highlight-button');
                }
            }
        };
    });

    app.factory('Data',['$http',function($http){
        var wordGameData, randomWordGameKeys ;
        $http.get('word-game-data.json').success(function(data){
            wordGameData = data;
            randomWordGameKeys = shuffle(Object.keys(data));
        });

        var shuffle = function(array){
            var currentIndex = array.length, temporaryValue, randomIndex ;

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

        var getWordGameData = function(){
            return wordGameData
        };

        var getWordGameKeys = function(){
            return randomWordGameKeys
        };

        return {
            getWordGameData:getWordGameData,
            getWordGameKeys:getWordGameKeys
        };

    }]);

})();