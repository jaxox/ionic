/**
 * Created by Jay on 9/24/2014.
 */
 'use strict';

app.factory('accountService', function($http){
    return{
        join:function(scope){

            console.log("enter account service");
            var $promise=$http.post('http://localhost:8080/signup',JSON.stringify(scope.model)); //send data to the api

            $promise.success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('success signup ' + data);
                scope.joinModal.hide();
                scope.loginModal.show();

               // scope.model ='';


            });

            $promise.error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                console.log('error signup ' + status);
                scope.errormessage = data.message;

            });
        }
    }
});