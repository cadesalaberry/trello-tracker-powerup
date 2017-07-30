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
      var context = t.getContext();
      var memberId = context.member;

      var myCards = cards.filter(getMyCards);

      var cardNames = myCards.map(getName);

      var div = document.getElementById('my-cards');

      div.textContent = cardNames.join('\n');

      console.log(JSON.stringify(cards, null, 2));

      function getName(c) {
        return c.name;
      }

      function getMyCards(card) {
        return card.members.filter(getMe);

        function getMe(member) {
          return member.id === memberId;
        }
      }
    });
});
