/**
 * Created with IntelliJ IDEA.
 * User: jyu
 * Date: 12/3/14
 * Time: 1:24 PM
 * To change this template use File | Settings | File Templates.
 */

// It seems a bit over complicated to share property between controllers.
// http://stackoverflow.com/questions/12008908/how-can-i-pass-variables-between-controllers

/**
 * this service is for sharing the obj (hashmap) between controllers.
 */
app.service('shareMapService', function () {

    var map = {};

    return {
        get:function (key) {
            return map[key];
        },
        set:function (key,value) {
            map[key] = value;
        },
        isExist:function (key){
            return key in map;
        }
    };
});