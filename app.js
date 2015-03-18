(function() {

    var app = angular.module('githubbattle', []);

    var MainController = function($scope, $http) {

        $scope.player1input = "DannyNunez";
        $scope.player2input = "JeremyMorgan";

        var getPlayer1Stats = function(response) {
            // response data (JSON)
            $scope.player1 = response.data;

        }

        var getPlayer2Stats = function(response) {
            // response data (JSON)
            $scope.player2 = response.data;

        }

        var onError = function(reason) {
            $scope.error = "Could not fetch user";
        }

        $scope.search = function(player1, player2) {

            $http.get("https://api.github.com/users/" + player1)
                .then(getPlayer1Stats, onError);

            $http.get("https://api.github.com/users/" + player2)
                .then(getPlayer2Stats, onError);

        };


    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());