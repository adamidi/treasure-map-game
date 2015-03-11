/**
 * Created by efi on 10/3/2015.
 */
(function(){
    var app = angular.module('gameServices',[]);

    app.service('Path',function(){
        this.unlock = function(func,gameId,nextGameId,btn,nextBtn,disabled){
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

//    app.factory('Path', function() {
//        return {
//            unlock: function(func,gameId,nextGameId,btn,nextBtn,disabled) {
//                if(func()){
//                    if(gameId==disabled.length-1){
//                        btn.classList.remove('animate-shadow');
//                        alert("Congratulations !");
//                    } else {
//                        disabled[$scope.nextGameId]=false;
//                        nextBtn.classList.add('animate-shadow');
//                        btn.classList.remove('animate-shadow');
//
//                    }
//                }
//            }
//        };
//    });

})();