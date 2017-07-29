console.log('Banana');

TrelloPowerUp.initialize({
  'card-badges': card_badges,
});

function card_badges(t, options) {
  return t.card('name')
    .get('name')
    .then(function extract(cardName){
      console.log('We just loaded the card name for fun: ' + cardName);
      var badges = [];
      // cardName = 'A test card [3] [33] (44) (4)';

      var parenthesis = new RegExp(/.*\((\d+)\).*/);
      var brackets = new RegExp(/.*\[(\d+)\].*/);

      var consumed = brackets.exec(cardName)[1];
      var total = parenthesis.exec(cardName)[1];

      console.log('[time-tracker]', consumed, '/', total);

      for (var i = consumed.length - 1; i >= 1; i--) {
        var consumedTime = consumed[i];

        badges.push({
          dynamic: getConsumedTimeBadge.bind(null, consumedTime),
        });
      }

      for (var j = consumed.length - 1; j >= 1; j--) {
        var totalTime = consumed[j];

        badges.push({
          dynamic: getTotalTimeBadge.bind(null, totalTime),
        });
      }

      return badges;

      function getConsumedTimeBadge(time){
        return {
          text: time,
          // icon: './images/icon.svg',
          color: 'green', // Valid values: 'green', 'yellow', 'red', 'none'
          refresh: 1 // in seconds
        };
      }

      function getTotalTimeBadge(time){
        return {
          text: time,
          // icon: './images/icon.svg',
          color: 'red', // Valid values: 'green', 'yellow', 'red', 'none'
          refresh: 1 // in seconds
        };
      }
    });
}
