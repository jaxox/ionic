/**
 * Created with IntelliJ IDEA.
 * User: jyu
 * Date: 12/1/14
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */

// the service that retrieves some movie title from an url
app.factory('ideaTypeaheadService', function($http, $q, $timeout){
    var ideaTypeaheadService = {};

    ideaTypeaheadService.getIdeas = function(query) {
        var ideaData = $q.defer();

        //TODO: query from the database for the full list once and cache them - shouldn't be a long list
        //var ideas = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel", "The Way Way Back", "Before Midnight", "Only God Forgives", "I Give It a Year", "The Heat", "Pacific Rim", "Pacific Rim", "Kevin Hart: Let Me Explain", "A Hijacking", "Maniac", "After Earth", "The Purge", "Much Ado About Nothing", "Europa Report", "Stuck in Love", "We Steal Secrets: The Story Of Wikileaks", "The Croods", "This Is the End", "The Frozen Ground", "Turbo", "Blackfish", "Frances Ha", "Prince Avalanche", "The Attack", "Grown Ups 2", "White House Down", "Lovelace", "Girl Most Likely", "Parkland", "Passion", "Monsters University", "R.I.P.D.", "Byzantium", "The Conjuring", "The Internship"]
 var ideas = [
          {name: 'Coffee shop', id:''},
          {name: 'Food', id:''},
          {name: 'Brunch ', id:''},
          {name: 'Lunch', id:''},
          {name: 'Dinner', id:''},
          {name: 'Drink', id:''},
          {name: 'Home TV / Movie', id:''},
          {name: 'Dinner party', id:''},
          {name: 'Movie', id:''},
          {name: 'Concert', id:''},
          {name: 'Live music', id:''},
          {name: 'Stand-up comedy', id:''},
          {name: 'Shopping', id:''},
          {name: 'Go for a walk', id:''},
          {name: 'Watch a game', id:''},
          {name: 'Exercise ', id:''},
          {name: 'Go to a game', id:''},
          {name: 'House party', id:''},
          {name: 'Clubbing', id:''},
          {name: 'Hiking', id:''},
          {name: 'Vacation', id:''},
          {name: 'Video game', id:''},
          {name: 'Pool party', id:''},
          {name: 'BBQ', id:''},
          {name: 'Potluck', id:''},
          {name: 'Birthday party', id:''},
          {name: 'Board game', id:''},
          {name: 'Card game', id:''},
          {name: 'Chit Chat', id:''},
          {name: 'Double date', id:''},
          {name: 'Tennis', id:''},
          {name: 'Throw a party', id:''}
    ];

        $timeout(function(){
            ideaData.resolve(ideas);
        },1000);

        return ideaData.promise
    };

    return ideaTypeaheadService;
});

