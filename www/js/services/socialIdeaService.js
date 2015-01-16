/**
 * Created by Jay on 12/11/2014.
 */
 'use strict';

app.factory('socialIdeaService', function(){

    var factory ={};

    factory.add = function(reqObj,Restangular ){
        console.log("enter social idea service");

        //convert the reqObj into SocialIdea object that api take
        var socialIdea = convert(reqObj);

        return Restangular.all('secure/ideas').post(JSON.stringify(socialIdea));
    };

    var convert = function(reqObj){

        var socialIdea ={};


        // NOT USE INFO
        // dateOptions: Array[12]
        // selectedDate: null
        // selectedTime: null
        // str_nextYear: "2015-12-14"
        // str_today: "2014-12-14"
        // timeOptions: Array[6]


	    // locations: Object
        // - Castro St: "Castro St, San Francisco, CA, USA"
        // - Metreon: "135 4th Street, San Francisco, CA 94103, United States"
	    // ideas: Object
        // - Dinner: undefined
        // - Dinner party: undefined
        // fromDate: "2014-12-14"
        // toDate: "2014-12-14"
        // startTime: "14:01"
        // endTime: "15:01"

        socialIdea.creatorId = reqObj.creatorId;
	  //  socialIdea.locations = reqObj.locations;
	    socialIdea.ideas = reqObj.ideas;

        if(reqObj.selectedDate===null){ //Means user is picking specific dates
            socialIdea.fromDate = reqObj.fromDate;
            socialIdea.toDate = reqObj.toDate;
        }else if(reqObj.selectedDate==='anyDate'){ //no need to set dates
        }else {
            var res = reqObj.selectedDate.split(":");


            socialIdea.fromDate = res[1];
            if(res.length===3){
                socialIdea.toDate = res[2];
            }
        }

	    socialIdea.startTime = reqObj.startTime;
	    socialIdea.endTime = reqObj.endTime;

        return socialIdea;
    }

    return factory;
});