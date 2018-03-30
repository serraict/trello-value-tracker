/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

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
      text: `💎 ${data.value_for_me || '-'}/${data.value_for_others || '-'}`,
      color: null,
      callback: cardButtonCallback
    }];
  })
}

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return getBadges(t);
  },
  'card-detail-badges': function(t, options) {
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
  }
});

console.log('Loaded by: ' + document.referrer);