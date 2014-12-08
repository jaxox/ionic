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


app.controller('EventIdeaCtrl', function($scope  ,$ionicModal, shareMapService, $cordovaToast) {

    // data for the Event Idea modal
    $scope.selectedIdeas = {};
    $scope.data = { showDelete: false};
    $scope.origEditKey = {};
    $scope.newEditKey = {};


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

    $scope.saveEditIdeaItem = function(){

        if(!angular.equals( $scope.origEditKey.origEditKey, $scope.newEditKey.newEditKey) ){
            //remove origEditKey
            $scope.doDeleteIdea($scope.origEditKey.origEditKey);
            //add a new item
            $scope.doAddIdea($scope.newEditKey.newEditKey);
            $scope.closeEditIdeaItemModal();

        }
    }



    // Perform the login action when the user submits the login form
    $scope.doAddIdea = function(selectedIdea) {

        // JUST SAVING THOSE FOR EXAMPLE LATER
        // console.log('adding the new idea', shareMapService.get('newIdea'));
        //$scope.ideas.push({name: shareMapService.get('newIdea')});

        var origObj = (angular.isString(selectedIdea)) ? selectedIdea : selectedIdea.originalObject;
        var ideaName = (angular.isString(origObj)) ?  origObj :   origObj.name;

        if(ideaName in $scope.selectedIdeas){
            $cordovaToast.showLongBottom(ideaName + ' is already added ');
        }else{
            $scope.selectedIdeas[ideaName] = (angular.isString(origObj)) ? "undefined": origObj.code  ;
            console.log('adding the new idea', origObj);
        }
    };

    $scope.doDeleteIdea = function (key){
        console.log("deleting: " +key);
        delete $scope.selectedIdeas[key];
    };


    $scope.isEmpty = function(obj){
        return _.size(angular.copy( obj))==0;
    }


});




app.controller('DateUtilCtrl', function($scope) {



     $scope.today = new Date();
//     var day = $scope.today.getDay();
//
//
//
//     $scope.tomorrow = new Date().setDate($scope.today.getDate() + 1);

     $scope.nextYear = new Date().setFullYear( $scope.today.getFullYear()+1, $scope.today.getMonth(), $scope.today.getDate());

//
//    console.log("today",$scope.today);
//    console.log("tomorrow",$scope.tomorrow);
//
//
//    console.log("today",$scope.today);
//    console.log("today",$scope.today);
//    console.log("today",$scope.today);
//    console.log("today",$scope.today);
//    console.log("today",$scope.today);
//



    //TODO: show your friend's birthday witin 30 days
    //TODO: show holiday within next 30 days


    $scope.dateOptions = [
      {name:"Today", from:$scope.today, to:""},
      {name:"Tomorrow", from:"light1" , to:""},
      {name:"This Sat", from:"dark2" , to:""},
      {name:"This Sun", from:"dark3" , to:""},
      {name:"This Weekend", from:"dark4" , to:""},
      {name:"Next Sat", from:"dark5" , to:""},
      {name:"Next Sun", from:"dark6" , to:""},
      {name:"Next Weekend", from:"dark7" , to:""},
      {name:"Pick A Date", from:"light8" , to:""}
    ];

//        $scope.dateOptions = [
//          {name:'Today',        from:'' },
//          {name:'Tomorrow',     from:'light'},
//          {name:'This Sat',     from:'dark' },
//          {name:'This Sun',     from:'dark' },
//          {name:'This Weekend', from:'dark'},
//          {name:'Next Sat',     from:'dark' },
//          {name:'Next Sun',     from:'dark' },
//          {name:'Next Weekend', from:'dark'},
//          {name:'Pick A Date',  from:'light' }
//        ];

    $scope.data = { selected : $scope.dateOptions[1] };
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


//app.controller('IdeaTypeaheadCtrl', function($scope , ideaTypeaheadService, shareMapService){
//
//    $scope.newIdea = "";
//
//    $scope.ideas = ideaTypeaheadService.getIdeas("...");
//    $scope.ideas.then(function(data){
//        $scope.ideas = data;
//    });
//
//    $scope.getIdeas = function(){
//        return $scope.ideas;
//    };
//
//    $scope.doSomething = function(typedthings){
//        console.log("Do something like reload data with this: " + typedthings );
//
//        shareMapService.set("newIdea",typedthings);
//
//        $scope.newIdeas = ideaTypeaheadService.getIdeas(typedthings);
//        $scope.newIdeas.then(function(data){
//            $scope.ideas = data;
//        });
//    };
//
//    $scope.doSomethingElse = function(suggestion){
//        console.log("Suggestion selected: " + suggestion );
//    };
//
//});

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

app.controller('IdeaTypeaheadCtrl2', function($scope, $http, ideaTypeaheadService, shareMapService){

    $scope.remoteUrlRequestFn = function(str) {
      return {q: str};
    };

    $scope.countrySelected = function(selected) {
      window.alert('You have selected ' + selected.title);
    };

    $scope.people = [
      {firstName: "Daryl", surname: "Rowland", twitter: "@darylrowland", pic: "img/daryl.jpeg"},
      {firstName: "Alan", surname: "Partridge", twitter: "@alangpartridge", pic: "img/alanp.jpg"},
      {firstName: "Annie", surname: "Rowland", twitter: "@anklesannie", pic: "img/annie.jpg"}
    ];

    $scope.countries = [
      {name: 'Afghanistan', code: 'AF'},
      {name: 'Aland Islands', code: 'AX'},
      {name: 'Albania', code: 'AL'},
      {name: 'Algeria', code: 'DZ'},
      {name: 'American Samoa', code: 'AS'},
      {name: 'AndorrA', code: 'AD'},
      {name: 'Angola', code: 'AO'},
      {name: 'Anguilla', code: 'AI'},
      {name: 'Antarctica', code: 'AQ'},
      {name: 'Antigua and Barbuda', code: 'AG'},
      {name: 'Argentina', code: 'AR'},
      {name: 'Armenia', code: 'AM'},
      {name: 'Aruba', code: 'AW'},
      {name: 'Australia', code: 'AU'},
      {name: 'Austria', code: 'AT'},
      {name: 'Azerbaijan', code: 'AZ'},
      {name: 'Bahamas', code: 'BS'},
      {name: 'Bahrain', code: 'BH'},
      {name: 'Bangladesh', code: 'BD'},
      {name: 'Barbados', code: 'BB'},
      {name: 'Belarus', code: 'BY'},
      {name: 'Belgium', code: 'BE'},
      {name: 'Belize', code: 'BZ'},
      {name: 'Benin', code: 'BJ'},
      {name: 'Bermuda', code: 'BM'},
      {name: 'Bhutan', code: 'BT'},
      {name: 'Bolivia', code: 'BO'},
      {name: 'Bosnia and Herzegovina', code: 'BA'},
      {name: 'Botswana', code: 'BW'},
      {name: 'Bouvet Island', code: 'BV'},
      {name: 'Brazil', code: 'BR'},
      {name: 'British Indian Ocean Territory', code: 'IO'},
      {name: 'Brunei Darussalam', code: 'BN'},
      {name: 'Bulgaria', code: 'BG'},
      {name: 'Burkina Faso', code: 'BF'},
      {name: 'Burundi', code: 'BI'},
      {name: 'Cambodia', code: 'KH'},
      {name: 'Cameroon', code: 'CM'},
      {name: 'Canada', code: 'CA'},
      {name: 'Cape Verde', code: 'CV'},
      {name: 'Cayman Islands', code: 'KY'},
      {name: 'Central African Republic', code: 'CF'},
      {name: 'Chad', code: 'TD'},
      {name: 'Chile', code: 'CL'},
      {name: 'China', code: 'CN'},
      {name: 'Christmas Island', code: 'CX'},
      {name: 'Cocos (Keeling) Islands', code: 'CC'},
      {name: 'Colombia', code: 'CO'},
      {name: 'Comoros', code: 'KM'},
      {name: 'Congo', code: 'CG'},
      {name: 'Congo, The Democratic Republic of the', code: 'CD'},
      {name: 'Cook Islands', code: 'CK'},
      {name: 'Costa Rica', code: 'CR'},
      {name: 'Cote D\'Ivoire', code: 'CI'},
      {name: 'Croatia', code: 'HR'},
      {name: 'Cuba', code: 'CU'},
      {name: 'Cyprus', code: 'CY'},
      {name: 'Czech Republic', code: 'CZ'},
      {name: 'Denmark', code: 'DK'},
      {name: 'Djibouti', code: 'DJ'},
      {name: 'Dominica', code: 'DM'},
      {name: 'Dominican Republic', code: 'DO'},
      {name: 'Ecuador', code: 'EC'},
      {name: 'Egypt', code: 'EG'},
      {name: 'El Salvador', code: 'SV'},
      {name: 'Equatorial Guinea', code: 'GQ'},
      {name: 'Eritrea', code: 'ER'},
      {name: 'Estonia', code: 'EE'},
      {name: 'Ethiopia', code: 'ET'},
      {name: 'Falkland Islands (Malvinas)', code: 'FK'},
      {name: 'Faroe Islands', code: 'FO'},
      {name: 'Fiji', code: 'FJ'},
      {name: 'Finland', code: 'FI'},
      {name: 'France', code: 'FR'},
      {name: 'French Guiana', code: 'GF'},
      {name: 'French Polynesia', code: 'PF'},
      {name: 'French Southern Territories', code: 'TF'},
      {name: 'Gabon', code: 'GA'},
      {name: 'Gambia', code: 'GM'},
      {name: 'Georgia', code: 'GE'},
      {name: 'Germany', code: 'DE'},
      {name: 'Ghana', code: 'GH'},
      {name: 'Gibraltar', code: 'GI'},
      {name: 'Greece', code: 'GR'},
      {name: 'Greenland', code: 'GL'},
      {name: 'Grenada', code: 'GD'},
      {name: 'Guadeloupe', code: 'GP'},
      {name: 'Guam', code: 'GU'},
      {name: 'Guatemala', code: 'GT'},
      {name: 'Guernsey', code: 'GG'},
      {name: 'Guinea', code: 'GN'},
      {name: 'Guinea-Bissau', code: 'GW'},
      {name: 'Guyana', code: 'GY'},
      {name: 'Haiti', code: 'HT'},
      {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
      {name: 'Holy See (Vatican City State)', code: 'VA'},
      {name: 'Honduras', code: 'HN'},
      {name: 'Hong Kong', code: 'HK'},
      {name: 'Hungary', code: 'HU'},
      {name: 'Iceland', code: 'IS'},
      {name: 'India', code: 'IN'},
      {name: 'Indonesia', code: 'ID'},
      {name: 'Iran, Islamic Republic Of', code: 'IR'},
      {name: 'Iraq', code: 'IQ'},
      {name: 'Ireland', code: 'IE'},
      {name: 'Isle of Man', code: 'IM'},
      {name: 'Israel', code: 'IL'},
      {name: 'Italy', code: 'IT'},
      {name: 'Jamaica', code: 'JM'},
      {name: 'Japan', code: 'JP'},
      {name: 'Jersey', code: 'JE'},
      {name: 'Jordan', code: 'JO'},
      {name: 'Kazakhstan', code: 'KZ'},
      {name: 'Kenya', code: 'KE'},
      {name: 'Kiribati', code: 'KI'},
      {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
      {name: 'Korea, Republic of', code: 'KR'},
      {name: 'Kuwait', code: 'KW'},
      {name: 'Kyrgyzstan', code: 'KG'},
      {name: 'Lao People\'S Democratic Republic', code: 'LA'},
      {name: 'Latvia', code: 'LV'},
      {name: 'Lebanon', code: 'LB'},
      {name: 'Lesotho', code: 'LS'},
      {name: 'Liberia', code: 'LR'},
      {name: 'Libyan Arab Jamahiriya', code: 'LY'},
      {name: 'Liechtenstein', code: 'LI'},
      {name: 'Lithuania', code: 'LT'},
      {name: 'Luxembourg', code: 'LU'},
      {name: 'Macao', code: 'MO'},
      {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
      {name: 'Madagascar', code: 'MG'},
      {name: 'Malawi', code: 'MW'},
      {name: 'Malaysia', code: 'MY'},
      {name: 'Maldives', code: 'MV'},
      {name: 'Mali', code: 'ML'},
      {name: 'Malta', code: 'MT'},
      {name: 'Marshall Islands', code: 'MH'},
      {name: 'Martinique', code: 'MQ'},
      {name: 'Mauritania', code: 'MR'},
      {name: 'Mauritius', code: 'MU'},
      {name: 'Mayotte', code: 'YT'},
      {name: 'Mexico', code: 'MX'},
      {name: 'Micronesia, Federated States of', code: 'FM'},
      {name: 'Moldova, Republic of', code: 'MD'},
      {name: 'Monaco', code: 'MC'},
      {name: 'Mongolia', code: 'MN'},
      {name: 'Montserrat', code: 'MS'},
      {name: 'Morocco', code: 'MA'},
      {name: 'Mozambique', code: 'MZ'},
      {name: 'Myanmar', code: 'MM'},
      {name: 'Namibia', code: 'NA'},
      {name: 'Nauru', code: 'NR'},
      {name: 'Nepal', code: 'NP'},
      {name: 'Netherlands', code: 'NL'},
      {name: 'Netherlands Antilles', code: 'AN'},
      {name: 'New Caledonia', code: 'NC'},
      {name: 'New Zealand', code: 'NZ'},
      {name: 'Nicaragua', code: 'NI'},
      {name: 'Niger', code: 'NE'},
      {name: 'Nigeria', code: 'NG'},
      {name: 'Niue', code: 'NU'},
      {name: 'Norfolk Island', code: 'NF'},
      {name: 'Northern Mariana Islands', code: 'MP'},
      {name: 'Norway', code: 'NO'},
      {name: 'Oman', code: 'OM'},
      {name: 'Pakistan', code: 'PK'},
      {name: 'Palau', code: 'PW'},
      {name: 'Palestinian Territory, Occupied', code: 'PS'},
      {name: 'Panama', code: 'PA'},
      {name: 'Papua New Guinea', code: 'PG'},
      {name: 'Paraguay', code: 'PY'},
      {name: 'Peru', code: 'PE'},
      {name: 'Philippines', code: 'PH'},
      {name: 'Pitcairn', code: 'PN'},
      {name: 'Poland', code: 'PL'},
      {name: 'Portugal', code: 'PT'},
      {name: 'Puerto Rico', code: 'PR'},
      {name: 'Qatar', code: 'QA'},
      {name: 'Reunion', code: 'RE'},
      {name: 'Romania', code: 'RO'},
      {name: 'Russian Federation', code: 'RU'},
      {name: 'RWANDA', code: 'RW'},
      {name: 'Saint Helena', code: 'SH'},
      {name: 'Saint Kitts and Nevis', code: 'KN'},
      {name: 'Saint Lucia', code: 'LC'},
      {name: 'Saint Pierre and Miquelon', code: 'PM'},
      {name: 'Saint Vincent and the Grenadines', code: 'VC'},
      {name: 'Samoa', code: 'WS'},
      {name: 'San Marino', code: 'SM'},
      {name: 'Sao Tome and Principe', code: 'ST'},
      {name: 'Saudi Arabia', code: 'SA'},
      {name: 'Senegal', code: 'SN'},
      {name: 'Serbia and Montenegro', code: 'CS'},
      {name: 'Seychelles', code: 'SC'},
      {name: 'Sierra Leone', code: 'SL'},
      {name: 'Singapore', code: 'SG'},
      {name: 'Slovakia', code: 'SK'},
      {name: 'Slovenia', code: 'SI'},
      {name: 'Solomon Islands', code: 'SB'},
      {name: 'Somalia', code: 'SO'},
      {name: 'South Africa', code: 'ZA'},
      {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
      {name: 'Spain', code: 'ES'},
      {name: 'Sri Lanka', code: 'LK'},
      {name: 'Sudan', code: 'SD'},
      {name: 'Suriname', code: 'SR'},
      {name: 'Svalbard and Jan Mayen', code: 'SJ'},
      {name: 'Swaziland', code: 'SZ'},
      {name: 'Sweden', code: 'SE'},
      {name: 'Switzerland', code: 'CH'},
      {name: 'Syrian Arab Republic', code: 'SY'},
      {name: 'Taiwan, Province of China', code: 'TW'},
      {name: 'Tajikistan', code: 'TJ'},
      {name: 'Tanzania, United Republic of', code: 'TZ'},
      {name: 'Thailand', code: 'TH'},
      {name: 'Timor-Leste', code: 'TL'},
      {name: 'Togo', code: 'TG'},
      {name: 'Tokelau', code: 'TK'},
      {name: 'Tonga', code: 'TO'},
      {name: 'Trinidad and Tobago', code: 'TT'},
      {name: 'Tunisia', code: 'TN'},
      {name: 'Turkey', code: 'TR'},
      {name: 'Turkmenistan', code: 'TM'},
      {name: 'Turks and Caicos Islands', code: 'TC'},
      {name: 'Tuvalu', code: 'TV'},
      {name: 'Uganda', code: 'UG'},
      {name: 'Ukraine', code: 'UA'},
      {name: 'United Arab Emirates', code: 'AE'},
      {name: 'United Kingdom', code: 'GB'},
      {name: 'United States', code: 'US'},
      {name: 'United States Minor Outlying Islands', code: 'UM'},
      {name: 'Uruguay', code: 'UY'},
      {name: 'Uzbekistan', code: 'UZ'},
      {name: 'Vanuatu', code: 'VU'},
      {name: 'Venezuela', code: 'VE'},
      {name: 'Vietnam', code: 'VN'},
      {name: 'Virgin Islands, British', code: 'VG'},
      {name: 'Virgin Islands, U.S.', code: 'VI'},
      {name: 'Wallis and Futuna', code: 'WF'},
      {name: 'Western Sahara', code: 'EH'},
      {name: 'Yemen', code: 'YE'},
      {name: 'Zambia', code: 'ZM'},
      {name: 'Zimbabwe', code: 'ZW'}
    ];

    $scope.countrySelected9 = {title: 'Chile'};

    $scope.inputChanged = function(str) {
      $scope.console10 = str;
    }

    $scope.focusState = 'None';
    $scope.focusIn = function() {
      var focusInputElem = document.getElementById('ex12_value');
      $scope.focusState = 'In';
      focusInputElem.classList.remove('small-input');
    }
    $scope.focusOut = function() {
      var focusInputElem = document.getElementById('ex12_value');
      $scope.focusState = 'Out';
      focusInputElem.classList.add('small-input');
    }

    $scope.disableInput = true;


});