'use strict';

console.log('[time-tracker]', 'board-bar loaded.');

/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// this function we be called once on initial load
// and then called each time something changes that
// you might want to react to, such as new data being
// stored with t.set()
t.render(function(){
  return t.cards('all')
    .then(function (cards) {
      console.log(JSON.stringify(cards, null, 2));
    });
});
