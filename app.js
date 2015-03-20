(function() {

    var app = angular.module('githubbattle', []);

    var MainController = function($scope, $http) {

        $scope.player1input = "DannyNunez";
        $scope.player2input = "JeremyMorgan";

        $scope.player1 = null;
        $scope.player2 = null;


        var getPlayer1Stats = function(response) {
            // get response data (JSON)
            $scope.player1 = response.data;
        };

        var getPlayer2Stats = function(response) {
            // get response data (JSON)
            $scope.player2 = response.data;
        };


        var onError = function(reason) {
            $scope.error = "Could not fetch user";
        };


        var scrapeGitHub = function (player1input, player2input){

            $http.get("https://api.github.com/users/" + player1input)
                .then(getPlayer1Stats, onError);

            $http.get("https://api.github.com/users/" + player2input)
                .then(getPlayer2Stats, onError);
        };


        var compareResults = function(metric){

        switch(metric){

            case 'publicrepos':

                //console.log("We got here - public repos");

                var p1metric = $scope.player1.public_repos;
                var p2metric = $scope.player2.public_repos;

                var p1display = $scope.publicrepos1;
                var p2display = $scope.publicrepos2;

                break;

            case 'publicgists':

                //console.log("We got here - public gists");

                var p1metric = $scope.player1.public_gists;
                var p2metric = $scope.player2.public_gists;
                var p1display = $scope.publicgists1;
                var p2display = $scope.publicgists2;

                break;
            case 'followers':

                //console.log("We got here - followers");

                var p1metric = $scope.player1.followers;
                var p2metric = $scope.player2.followers;
                var p1display = $scope.followers1;
                var p2display = $scope.followers2;

                break;

        }

        //console.log("Output: " + metric);

        // highlight the higher number in green, lower in red

            if(p1metric == p2metric){

                p1display = "bg-warning";
                p2display = "bg-warning";

            }else {
                if(p1metric > p2metric){
                    p1display = "bg-success";
                    p2display = "bg-danger";

                    }else {
                        p1display = "bg-danger";
                        p2display = "bg-success";
                    }
            }

        };

        $scope.search = function(player1input, player2input) {



            scrapeGitHub(player1input,player2input);

            compareResults("publicrepos");
            compareResults("publicgists");
            compareResults("followers");

            //$scope.publicrepos2 = "bg-success";

        };


    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());