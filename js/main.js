'use strict';

TrelloPowerUp.initialize({
  'card-detail-badges': card_badges,
  'board-buttons'     : board_buttons,
  'show-settings'     : show_settings,
  'card-badges'       : card_badges,
});

function card_badges(t, options) {
  return t.card('name')
    .get('name')
    .then(extractTimes);
}

function show_settings(t, opts) {
  return t.boardBar({
    url: './board-bar.html',
    args: {
      // optional arguments to pass to the page
      // accessed on that page with t.arg('rand')
      rand: (Math.random() * 100).toFixed(0)
    },
    height: 200 // initial height in pixels, can be changed later
  });
}

function board_buttons(t, options){
  return [{
    icon    : './images/logo.png',
    callback: open_board_bar,
  }];
}

function open_board_bar(t, options){
  console.log('[time-tracker]', 'Opening board bar.');

  return show_settings(t, options);
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
      // icon: './images/logo.png',
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
