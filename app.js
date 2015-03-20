(function() {

    var app = angular.module('githubbattle', []);

    var MainController = function($scope, $http, $q) {

        $scope.player1 = {
            data: null,
            input: "DannyNunez"
        };

        $scope.player2 = {
            data: null,
            input: "JeremyMorgan"
        };

        var getPlayer1Stats = function(response) {
            // get response data (JSON)
            $scope.player1.data = response.data;
        };

        var getPlayer2Stats = function(response) {
            // get response data (JSON)
            $scope.player2.data = response.data;
        };


        var setPlayerStats = function(response, player) {
            // get response data (JSON)
            player.data = response.data;
        };


        var onError = function(reason) {
            $scope.error = "Could not fetch user";
        };


        var scrapeGitHub = function (player){

            var deferred = $q.defer();

            $http.get("https://api.github.com/users/" + player.input)
                .then(function(response) {
                   setPlayerStats(response, player);
                   deferred.resolve(response); 
                }, onError);


            return deferred.promise;    
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

        $scope.search = function() {
            $q.all([scrapeGitHub($scope.player1),scrapeGitHub($scope.player2)])
                .then(function() {
                    compareResults("publicrepos");
                    compareResults("publicgists");
                    compareResults("followers");
                })
                .then(function() {
                    console.log('done')
                });
        };
    };

    app.controller("MainController", ["$scope", "$http", '$q', MainController]);

}());