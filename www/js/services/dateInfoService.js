/**
 * Created with IntelliJ IDEA.
 * User: jyu
 * Date: 12/1/14
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */

app.factory('dateInfoService', function($http, $q, $timeout, $filter ){

     var dateInfoService = {};

     var todayStr = {};
     var nextYearStr = {};

     //private use
     var dateToString = function(date) {
         return $filter('date')(date, "yyyy-MM-dd");
     };

    /**
     * Getting the date of coming weekend's date
     *
     * @param date
     * @param dayB4EndOfWeek - int; Friday is 2, Sat is 1, Sun is 0
     * @param noOfNextWeek - this coming week is 1, next week is 2
     * @returns {*}
     */
     var getNext = function(date, dayB4EndOfWeek, noOfNextWeek) {
        var normalizedDay = (date.getDay() + dayB4EndOfWeek) % 7;
        var daysForward = (7 * noOfNextWeek ) - normalizedDay;
        return dateToString(new Date(+date + (daysForward * 86400000)));
     };

     dateInfoService.getTodayStr = function(){
        return todayStr;
     }

     dateInfoService.getNextYearStr = function(){
        return nextYearStr;
     }

     dateInfoService.getTimeOptions = function(query) {
              var dateOptions = [
                {name:"Anytime",    from:"anytime",  to:""},
                {name:"Morning",    from:"morning",  to:""},
                {name:"Afternoon",  from:"afternoon",to:""},
                {name:"Evening",    from:"evening",  to:""},
                {name:"Night",      from:"night",    to:""},
                {name:"Pick A Time",from:null , to:null}
              ];
              return dateOptions;
     }

     dateInfoService.getDateOptions = function(query) {

        var data = $q.defer();

        var today = new Date();
        var str_today = dateToString(today);
        todayStr = str_today;
        var str_tomorrow = dateToString(new Date().setDate(today.getDate() + 1));
        var str_nextYear = dateToString(new Date(today.getFullYear()+1, today.getMonth(), today.getDate()));
        nextYearStr = str_nextYear;
        var str_thisFri = getNext(today, 2, 1);
        var str_thisSat = getNext(today, 1, 1);
        var str_thisSun = getNext(today, 0, 1);
        var str_nextFri = getNext(today, 2, 2);
        var str_nextSat = getNext(today, 1, 2);
        var str_nextSun = getNext(today, 0, 2);

        //TODO: query from the database for the full list once and cache them - shouldn't be a long list
        //TODO: show your friend's birthday within 30 days
        //TODO: show holiday within next 30 days
        //adding text before the from date to prevent duplicate id
         var dateOptions = [
           {name:"Any date",     from: "anyDate"          },
           {name:"Today",        from: "0:" + str_today   },
           {name:"Tomorrow",     from: "1:" + str_tomorrow},
           {name:"This Fri",     from: "2:" + str_thisFri },
           {name:"This Sat",     from: "3:" + str_thisSat },
           {name:"This Sun",     from: "4:" + str_thisSun },
           {name:"This Weekend", from: "5:" + str_thisSat + ":" + str_thisSun},
           {name:"Next Fri",     from: "6:" + str_nextFri },
           {name:"Next Sat",     from: "7:" + str_nextSat },
           {name:"Next Sun",     from: "8:" + str_nextSun },
           {name:"Next Weekend", from: "9:" + str_nextSat + ":" + str_nextSun},
           {name:"Pick A Date",  from: null , to:null}
         ];

        $timeout(function(){
            data.resolve(dateOptions);
        },1000);

        return data.promise
    };

    return dateInfoService;
});

