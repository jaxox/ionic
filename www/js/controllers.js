var app = angular.module('starter.controllers', []);



app.controller('AppCtrl', function($scope, $ionicModal, $timeout, loginService, accountService,$ionicLoading, Restangular,$cordovaToast) {
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
            $scope.loadingShow();

            console.log('Doing login', $scope.loginData);
            var loginUserPromise = loginService.login($scope.loginData,Restangular);

              loginUserPromise.then(function(loginUser) {
                console.log("success login" , loginUser.id);
                //After success login, clean the form data
                $scope.loginData = {};
                $scope.loadingHide();
                $scope.closeLogin();
                $scope.loginUser = loginUser;
                $cordovaToast.showLongBottom('login successfully.')
              }, function(response) {
                console.log("Error with status code", response.status);
                $scope.loadingHide();
                $scope.errorMessage = response.data.message;
                $cordovaToast.showLongBottom('login fail :' + response.data.message)

              });

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


         $scope.loadingShow = function() {
            $ionicLoading.show({
              template: 'Loading...'
            });
         };
         $scope.loadingHide = function(){
            $ionicLoading.hide();
          };

    });


app.controller('EventIdeaCtrl', function($scope  ,$ionicModal, shareMapService) {

    // Form data for the login modal
    $scope.ideas = [{}];


    // Create the create-account modal that we will use later
    $ionicModal.fromTemplateUrl('templates/eventIdea/addIdeaModal.html', {
        scope: $scope
    }).then(function(modal) {
            $scope.addIdeaModal = modal;
    });


    // Triggered in the login modal to close it
    $scope.closeAddIdeaModal = function() {
        $scope.addIdeaModal.hide();
    };

    // Open the login modal
    $scope.openAddIdeaModal = function() {
        $scope.addIdeaModal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doAddIdea = function() {

        // save the idea to the list
        console.log('adding the new idea', shareMapService.get('newIdea'));

        // TODO: should check for duplicate before saving
        $scope.ideas.push({name: shareMapService.get('newIdea')});

        $scope.closeAddIdeaModal();



//        var loginUserPromise = loginService.login($scope.loginData,Restangular);
//
//        loginUserPromise.then(function(loginUser) {
//            console.log("success login" , loginUser.id);
//            //After success login, clean the form data
//            $scope.loginData = {};
//            $scope.loadingHide();
//            $scope.closeLogin();
//            $scope.loginUser = loginUser;
//            $cordovaToast.showLongBottom('login successfully.')
//        }, function(response) {
//            console.log("Error with status code", response.status);
//            $scope.loadingHide();
//            $scope.errorMessage = response.data.message;
//            $cordovaToast.showLongBottom('login fail :' + response.data.message)
//
//        });

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

app.controller("ToastController", function($scope, $cordovaToast) {

    $scope.showToast = function(message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown "+ message);
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }

});


app.controller('IdeaTypeaheadCtrl', function($scope , ideaTypeaheadService, shareMapService){

    $scope.newIdea = "";

    $scope.ideas = ideaTypeaheadService.getIdeas("...");
    $scope.ideas.then(function(data){
        $scope.ideas = data;
    });

    $scope.getIdeas = function(){
        return $scope.ideas;
    };

    $scope.doSomething = function(typedthings){
        console.log("Do something like reload data with this: " + typedthings );

        shareMapService.set("newIdea",typedthings);

        $scope.newIdeas = ideaTypeaheadService.getIdeas(typedthings);
        $scope.newIdeas.then(function(data){
            $scope.ideas = data;
        });
    };

    $scope.doSomethingElse = function(suggestion){
        console.log("Suggestion selected: " + suggestion );
    };

});