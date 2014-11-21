var app = angular.module('starter.controllers', []);



app.controller('AppCtrl', function($scope, $ionicModal, $timeout, loginService, accountService) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope.model = {};

        // Create the create-account modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
                $scope.loginModal = modal;
            });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.loginModal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.loginModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);
            loginService.login($scope.loginData);


            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);

        };


        // Create the create-account modal that we will use later
        $ionicModal.fromTemplateUrl('templates/join.html', {
            scope: $scope
        }).then(function(modal) {
                $scope.joinModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeJoin = function() {
            $scope.joinModal.hide();
        };

        // Open the login modal
        $scope.join = function() {
            $scope.loginModal.hide();
            $scope.joinModal.show();
        };



        this.submitted = false;
        // Perform the login action when the user submits the login form
        $scope.doJoin = function() {

            if (this.joinForm.$valid) {
                // Submit as normal
                console.log('Doing join', $scope.model);
                accountService.join($scope);



            } else {
                this.joinForm.submitted = true;
                console.log('invalid submitted ', $scope.model);
            }




        };

    });


app.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
});

app.controller('PlaylistCtrl', function($scope, $stateParams) {
});
