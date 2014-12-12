/**
 * Created by Jay on 12/11/2014.
 */
 'use strict';

app.factory('eventIdeaService', function(){

    var factory ={};

    factory.login = function(reqObj,Restangular ){
        console.log("enter event idea service");

        return Restangular.all('event').post(JSON.stringify(reqObj));
    };

    return factory;
});