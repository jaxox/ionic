/**
 * Created with IntelliJ IDEA.
 * User: jyu
 * Date: 12/1/14
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */

// the service that retrieves some movie title from an url
app.factory('IdeaTypeaheadService', function($http, $q, $timeout){
    var IdeaTypeaheadService = new Object();

    IdeaTypeaheadService.getmovies = function(i) {
        var moviedata = $q.defer();
        var movies;

        var someMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel"];

        var moreMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel", "The Way Way Back", "Before Midnight", "Only God Forgives", "I Give It a Year", "The Heat", "Pacific Rim", "Pacific Rim", "Kevin Hart: Let Me Explain", "A Hijacking", "Maniac", "After Earth", "The Purge", "Much Ado About Nothing", "Europa Report", "Stuck in Love", "We Steal Secrets: The Story Of Wikileaks", "The Croods", "This Is the End", "The Frozen Ground", "Turbo", "Blackfish", "Frances Ha", "Prince Avalanche", "The Attack", "Grown Ups 2", "White House Down", "Lovelace", "Girl Most Likely", "Parkland", "Passion", "Monsters University", "R.I.P.D.", "Byzantium", "The Conjuring", "The Internship"]

        if(i && i.indexOf('T')!=-1)
            movies=moreMovies;
        else
            movies=moreMovies;

        $timeout(function(){
            moviedata.resolve(movies);
        },1000);

        return moviedata.promise
    }

    return IdeaTypeaheadService;
});

