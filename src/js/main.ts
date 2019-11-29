'use strict';

import Parser from './parser';
import boardBar from '../html/board-bar.html';
import logoIcon from '../images/logo.png';

TrelloPowerUp.initialize({
  'card-detail-badges': card_badges,
  'board-buttons'     : board_buttons,
  'show-settings'     : show_settings,
  'card-badges'       : card_badges,
});

function card_badges(t, options) {
  return t.card('name')
    .get('name')
    .then(Parser.getBadgesFromName);
}

function show_settings(t, opts) {
  return t.boardBar({
    url: boardBar,
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
    icon    : logoIcon,
    callback: open_board_bar,
  }];
}

function open_board_bar(t, options){
  console.log('[time-tracker]', 'Opening board bar.');

  return show_settings(t, options);
}

var name = 'A test card [3] [33] (44) (4)';

Parser.getBadgesFromName(name);
