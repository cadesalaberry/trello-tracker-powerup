console.log('Banana');

TrelloPowerUp.initialize({
  'card-badges': card_badges,
  'card-detail-badges': card_badges,
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

      var consumed = brackets.exec(cardName);
      var total = parenthesis.exec(cardName);

      var longest = consumed.length;

      if (consumed.length > total.length)
        longest = total.length;



      for (var i = longest - 1; i >= 1; i--) {
        var consumedTime = consumed[i];
        var totalTime = total[i];
        var color = getColor(consumedTime, totalTime);
        var text = '';

        if (consumedTime)
          text += consumedTime;

        if (consumedTime && totalTime)
          text += '/';

        if (totalTime)
          text += totalTime;

        console.log('[time-tracker]', color, 'badge:', text);

        badges.push({
          dynamic: getTimeTrackingBadge.bind(null, text, color),
        });
      }

      console.log('[time-tracker]', 'will return badges', badges);

      return badges;

      function getTimeTrackingBadge(text, color){
        return {
          text: text,
          icon: './images/logo.png',
          color: color,
          refresh: 4 // in seconds
        };
      }

      function getColor(a, b) {
        if (a <= b)
          return 'green';

        if (b < a)
          return 'red';
      }
    });
}
