/**
 * Created by Jay on 9/24/2014.
 */
 'use strict';

//app.factory('loginService', function($http){
//    return{
//        login:function(user){
//            console.log("enter login service");
//            var $promise=$http.post('http://localhost:8080/api/login',JSON.stringify(user)); //send data to the api
//
//            //testing only
//            $promise.then(function(msg){
//                if(msg.data=='succes') console.log('succes login');
//                else console.log('error login');
//            });
//
//        }
//    }
//});

//app.factory('loginService', function($http){
//
//    var factory ={};
//
//    factory.login = function(user){
//        console.log("enter login service");
//        var $promise=$http.post('http://localhost:8080/api/login',JSON.stringify(user)); //send data to the api
//
//        //testing only
//        $promise.then(function(msg){
//            if(msg.data=='succes') console.log('succes login');
//            else console.log('error login');
//        });
//
//    }
//
//    return factory;
//});

app.factory('loginService', function($http, $ionicModal){

    var factory ={};

    factory.doLogin = function(user){
        console.log("enter login service");
        var $promise=$http.post('http://localhost:8080/api/login',JSON.stringify(user)); //send data to the api

        //testing only
        $promise.then(function(msg){
            if(msg.data=='succes') console.log('succes login');
            else console.log('error login');
        });

    }



    return factory;
});