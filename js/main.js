console.log('Banana');

TrelloPowerUp.initialize({
  'card-badges': card_badges,
});

function card_badges(t, options) {
  return t.card('name')
    .get('name')
    .then(function extract(cardName){
      console.log('We just loaded the card name for fun: ' + cardName);
      var newName = '';

      var parenthesis = new RegExp(/.*\((\d*)\).*/);
      var brackets = new RegExp(/.*\[(\d*)\].*/);

      var consumed = parenthesis.match(name);
      var total = brackets.match(name);

      return [
        {
          dynamic: function getConsumedTime(){
            return {
              text: consumed,
              // icon: './images/icon.svg',
              color: 'green', // Valid values: 'green', 'yellow', 'red', 'none'
              refresh: 1 // in seconds
            };
          },
        },
        {
          dynamic: function getTotalTime(){
            return {
              text: total,
              // icon: './images/icon.svg',
              color: 'red', // Valid values: 'green', 'yellow', 'red', 'none'
              refresh: 1 // in seconds
            };
          },
        },
        // {
          // its best to use static badges unless you need your
          // badges to refresh you can mix and match between
          // static and dynamic
          // title: 'Detail Badge', // for detail badges only
          // text: 'Static',
          // icon: HYPERDEV_ICON, // for card front badges only
          // color: null
        // },
      ];
    });
}
