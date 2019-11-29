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

  const longest = Math.max(consumed.length, total.length);

  consumed.forEach((item) => console.log('[time-tracker]', 'consumed', item));
  total.forEach((item) => console.log('[time-tracker]', 'total', item));

  for (let i = longest - 1; i >= 0; i--) {
    const consumedTime = consumed[i];
    const totalTime = total[i];
    const color = getColor(consumedTime, totalTime);
    let text = '';

    if (consumedTime)
      text += consumedTime;

    if (consumedTime && totalTime)
      text += '/';

    if (totalTime)
      text += totalTime;

    console.log('[time-tracker]', i, '/', longest, color, 'badge:', text);

    badges.push({
      dynamic: () => ({
        text,
        icon,
        color,
        refresh: 4 // in seconds
      }),
    });
  }

  console.log('[time-tracker]', 'will return badges', badges);

  return badges;
}

export default {
  getBadgesFromName,
}