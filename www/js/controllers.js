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


app.controller('EventIdeaCtrl', function($scope  ,$ionicModal, dateInfoService, $cordovaToast) {

    // data for the Event Idea modal
    $scope.model.selectedIdeas = {};
    $scope.model.selectedLocations = {};
    $scope.model.selectedDate = {};
    $scope.data = { showDelete: false};
    $scope.origEditKey = {};
    $scope.newEditKey = {};
    $scope.model.dateOptions = {};
    $scope.model.str_today = {};
    $scope.model.str_nextYear = {};
    $scope.model.fromDate = {};
    $scope.model.toDate = {};


    var $promise  = dateInfoService.getDateOptions("...");
    $promise.then(function(data){
         $scope.model.dateOptions = data;
         $scope.model.selectedDate = data[2].from;
         $scope.model.str_today = dateInfoService.getTodayStr();
         $scope.model.str_nextYear = dateInfoService.getNextYearStr();
         $scope.model.fromDate = dateInfoService.getTodayStr();
         $scope.model.toDate = dateInfoService.getTodayStr();
    });

    $scope.model.timeOptions  = dateInfoService.getTimeOptions("...");
    $scope.model.selectedTime = $scope.model.timeOptions[0].from;

//[MODAL]
    // Create the edit idea item's modal
    $ionicModal.fromTemplateUrl('templates/eventIdea/editIdeaItemModal.html', {
        scope: $scope
    }).then(function(modal) {
            $scope.editIdeaItemModal = modal;
    });
    // Triggered in the modal to close it
    $scope.closeEditIdeaItemModal = function() {
        $scope.editIdeaItemModal.hide();
    };
    // Open the Edit Idea Item modal
    $scope.openEditIdeaItemModal = function(key) {
        $scope.origEditKey = { origEditKey:key};
        $scope.newEditKey = { newEditKey:key};
        $scope.editIdeaItemModal.show();
    };
    // Save the edited idea item
    $scope.saveEditIdeaItem = function(){
        if(!angular.equals( $scope.origEditKey.origEditKey, $scope.newEditKey.newEditKey) ){
            //remove origEditKey
            $scope.doDeleteIdea($scope.origEditKey.origEditKey);
            //add a new item
            $scope.doAddIdea($scope.newEditKey.newEditKey);
            $scope.closeEditIdeaItemModal();
        }
    }


    // add idea item to the list
    $scope.doAddIdea = function(selectedIdea) {

        // JUST SAVING THOSE FOR EXAMPLE LATER
        // console.log('adding the new idea', shareMapService.get('newIdea'));
        //$scope.ideas.push({name: shareMapService.get('newIdea')});
        if( $scope.getSize( $scope.model.selectedIdeas) >=5){
            return;
        }
        var origObj = (angular.isString(selectedIdea)) ? selectedIdea : selectedIdea.originalObject;
        var ideaName = (angular.isString(origObj)) ?  origObj :   origObj.name;

        if(ideaName in $scope.model.selectedIdeas){
            $cordovaToast.showLongBottom(ideaName + ' is already added ');
        }else{
            $scope.model.selectedIdeas[ideaName] = (angular.isString(origObj)) ? "undefined": origObj.code  ;
            console.log('adding the new idea', origObj);

            if( $scope.getSize( $scope.model.selectedIdeas) >= 5){
                $cordovaToast.showLongBottom('Reached the maximum 5 ideas ');
            }
        }
    };

    $scope.doDeleteIdea = function (key){
        console.log("deleting: " +key);
        delete $scope.model.selectedIdeas[key];
    };


    $scope.isEmpty = function(obj){
        return _.size(angular.copy( obj))==0;
    }

    $scope.getSize = function(obj){
        return _.size(angular.copy( obj));
    }




    //Location
    $scope.doAddLocation = function(selectedLocation) {

        if( $scope.getSize( $scope.model.selectedLocations) >=5){
            return;
        }

        console.log(selectedLocation);

        var formattedResult = format(selectedLocation);

        if(formattedResult.name in $scope.model.selectedLocations){
            $cordovaToast.showLongBottom(formattedResult.name + ' is already added ');
        }else{
            $scope.model.selectedLocations[formattedResult.name] = formattedResult.address  ;
            console.log('adding the new address', formattedResult);

            if( $scope.getSize( $scope.model.selectedLocations) >= 5){
                $cordovaToast.showLongBottom('Reached the maximum 5 addresses ');
            }
        }

    };

    $scope.doDeleteLocation = function (key){
        console.log("deleting: " +key);
        delete $scope.model.selectedLocations[key];
    };

    var format = function(selectedLocation) {
        var viewValue = {
                    name: "",
                    address: null
        };

        if (angular.isString(selectedLocation)) {
            viewValue.name = selectedLocation;
        } else if (angular.isObject(selectedLocation)) {
            viewValue.address = selectedLocation.formatted_address;
            viewValue.name = selectedLocation.name ;
            console.log("Selected name ane add: "+viewValue.name + " " +viewValue.address);
        }
        return viewValue;
    };


    $scope.reset = function(){
        $scope.model.selectedLocations={};
        $scope.model.selectedIdeas={};
        $scope.model.selectedDate
        $scope.model.selectedDate = $scope.model.dateOptions[2].from;
        $scope.model.selectedStartTime = null;
        $scope.model.fromDate = dateInfoService.getTodayStr();
        $scope.model.toDate = dateInfoService.getTodayStr();
        $scope.model.selectedTime = $scope.model.timeOptions[0].from;
    }


    //Date functions
    $scope.changeToDate = function(date){
        $scope.model.toDate = date;
    };


    //doCreateEventIdea
    $scope.doCreateEventIdea = function(model){

        console.log(model);

    }

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



app.controller('IdeaTypeaheadCtrl', function($scope, $http, ideaTypeaheadService, shareMapService){

    var $promise  = ideaTypeaheadService.getIdeas("...");


    $promise.then(function(data){
        $scope.ideas = data;
    });

    $scope.selectedIdeaFunc = function(selected) {
      window.alert('You have selected ' + selected.title);
       shareMapService.set("newIdea",selected);

       $scope.selectedIdeaObj = selected;
       selected = {};
    };

    $scope.saveSelectedIdea = function(selected) {
        window.alert('You have clearing ' + $scope.selectedIdeaObj);
        $scope.selectedIdeaObj = {};
    };

});
