console.log('Banana');

TrelloPowerUp.initialize({
  'card-badges': card_badges,
  'card-detail-badges': card_badges,
});

function card_badges(t, options) {
  return t.card('name')
    .get('name')
    .then(extractTimes);
}

var name = 'A test card [3] [33] (44) (4)';

extractTimes(name);

function extractTimes(cardName){
  var badges = [];
  var match;


  var total = cardName
    .split(/[\(\)]/)
    .map(parseFloatSafe)
    .filter((o) => o);

  var consumed = cardName
    .split(/[\[\]]/)
    .map(parseFloatSafe)
    .filter((o) => o);

  var longest = consumed.length;

  if (consumed.length < total.length)
    longest = total.length;

  for (var j = consumed.length - 1; j >= 0; j--) {
    console.log('[time-tracker]', 'consumed', consumed[j]);
  }

  for (var k = total.length - 1; k >= 0; k--) {
    console.log('[time-tracker]', 'total', total[k]);
  }

  for (var i = longest - 1; i >= 0; i--) {
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

    console.log('[time-tracker]', i, '/', longest, color, 'badge:', text);

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

  function parseFloatSafe(str) {
    var float;

    try {
      float = parseFloat(str);
    } catch (e) {
      float = null;
    }

    return float;
  }

  function identity(o) {
    return o;
  }
}
