/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;


var GLITCH_ICON = './images/glitch.svg';
var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

var cardButtonCallback = function(t){
  return t.popup({
    title: "Track Value",
    url: 'value-tracker.html'
  });
};

var getBadges = function(t){
  return t.get('card', 'shared')
  .then(function(data){
      return [{
      text: `value: ${data.value_for_me}/${data.value_for_others}`,
      icon: GRAY_ICON, // for card front badges only
      color: null
    }];
  })
}

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return getBadges(t);
  },
  'card-buttons': function(t, options) {
    return [{
      // usually you will provide a callback function to be run on button click
      // we recommend that you use a popup on click generally
      icon: GRAY_ICON, // don't use a colored icon here
      text: 'Track Value',
      callback: cardButtonCallback
    }];
  },
  'authorization-status': function(t, options){
    return t.get('member', 'private', 'token')
    .then(function(token){
      if(token){
        return { authorized: true };
      }
      return { authorized: false };
    });
    // You can also return the object synchronously if you know the answer synchronously.
  },
  'show-authorization': function(t, options){
    let trelloAPIKey = '1c960ce5f9cdd7cfa5e8ece7a2cfbcc1';
    if (trelloAPIKey) {
      return t.popup({
        title: 'My Auth Popup',
        args: { apiKey: trelloAPIKey }, 
        url: './authorize.html',
        height: 140,
      });
    } else {
      console.log("🙈 Looks like you need to add your API key to the project!");
    }
  }
});

console.log('Loaded by: ' + document.referrer);