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

      var parenthesis = new RegExp(/.*\((\d*)\).*/);
      var brackets = new RegExp(/.*\[(\d*)\].*/);

      var consumed = parenthesis.exec(name);
      var total = brackets.exec(name);

      console.log('[time-tracker]', consumed, '/', total);

      if (consumed) {
        badges.push({
          dynamic: function getConsumedTime(){
            return {
              text: consumed,
              // icon: './images/icon.svg',
              color: 'green', // Valid values: 'green', 'yellow', 'red', 'none'
              refresh: 1 // in seconds
            };
          },
        });
      }

      if (total) {
        badges.push({
          dynamic: function getConsumedTime(){
            return {
              text: total,
              // icon: './images/icon.svg',
              color: 'red', // Valid values: 'green', 'yellow', 'red', 'none'
              refresh: 1 // in seconds
            };
          },
        });
      }

      return badges;
    });
}
