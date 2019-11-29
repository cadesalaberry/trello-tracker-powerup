import { parseFloatSafe, getColor } from './helper';
import icon from '../images/logo.png';

const getBadgesFromName = (cardName) => {
  var badges = [];

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
      text,
      icon,
      color,
      refresh: 4 // in seconds
    };
  }
}

export default {
  getBadgesFromName,
}