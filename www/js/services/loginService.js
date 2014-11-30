/**
 * Created by Jay on 9/24/2014.
 */
 'use strict';

app.factory('loginService', function($http){

    var factory ={};

    factory.login = function(userReqObj,Restangular ){
        console.log("enter login service");
        return Restangular.all('login').post(JSON.stringify(userReqObj));
    }

    return factory;
});