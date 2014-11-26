/**
 * Created by Jay on 9/24/2014.
 */
 'use strict';

app.factory('loginService', function($http){

    var factory ={};

    factory.login = function(userReqObj){
        console.log("enter login service");
        var $promise=$http.post('http://localhost:8080/api/login',JSON.stringify(userReqObj)); //send data to the api

        $promise.
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("success login, ID:" + data.id );
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("error login, login:" + userReqObj.login);
            });
    }

    return factory;
});