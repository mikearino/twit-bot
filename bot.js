const twit = require('twit');
const config = require('./config')

const Twitter = new twit(config)

const retweet = function() {
  const params = {
    // Search for these hashtags
    q: '#react',
    //  #React, #100daysofcode, #Reactjs, #reactjs',
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
