const twit = require('twit');
const config = require('./config')
const Twitter = new twit(config)

const retweet = function() {
  const params = {
    // Search for these hashtags
    q: '#100daysofcode, #Reactjs, #reactjs',
    // Recently posted
    result_type: 'recent',
    lang: 'en'
  }
  // twitter.get function provided by twit 
  Twitter.get('search/tweets', params, function(err,data) {
      // if no errors
      if (!err) {
        // Grab ID of tweet and re-tweet
        let retweetId = data.statuses[0].id_str;
        // Tell Twitter to retweet
        Twitter.post('statuses/retweet/:id', {
          id: retweetId
        }, function(err, response) {
          if (response) {
            console.log("Retweet success[O_o]!!!!");
          }
          if (err) {
            console.log("Something went wrong while retweeting. Maybe a duplication o_O" + err)
          }
        });
      }
    else {
      console.log('Something went wrong while trying to search o_O' + err)
    }
  });
}

// Grab and retweet as soon as bot starts
retweet();
// Retweet every hour
setInterval(retweet, 3600000);

const favoriteTweet = function () {
  const params = {
    // stuff bot should like
    q: "#reactjs, #ReactJS, #Javascript",
    result_type: 'recent',
    lang: 'en'
  }
  
  //Initialize finding tweet with GET
  Twitter.get('search/tweets', params, function(err,data){

    // find the specific tweet from the data provided by get
    let tweet = data.statuses;
    // pick a random tweet with ranDom function
    let randomTweet = ranDom(tweet);

    // if a random tweet exists
    if(typeof randomTweet != 'undefined') {
      // Tell twitter to 'favorite' Tweet
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there is an error while trying to 'favorite'
        if(err) {
          console.log("This cannot be your favorite!... o_0 Error")
        }
        else {
          console.log('Favorited! Success!!!! O_O')
        }
      });
    }
  });
}
// Grab and favorite as soon as program is running
favoriteTweet();
// Fav a tweet every 60 minutes
setInterval(favoriteTweet, 3600000)

function ranDom(arr) {
  let index = Math.floor(Math.random()*arr.length);
  return arr[index]
}