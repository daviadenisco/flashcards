export function createDeck() {
    let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    let suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    let deck = [];
    
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = {value: values[i], suit: suits[j]};
            deck.push(card);
        }
    }
    return deck;
};

let dealerHand = [];
let playerHand = [];

export function initialDealerDeal (deck) {
    let currentCard;
    // let newDeck = deck;

    for (let i = 0; i < 2; i++) {
      if (dealerHand.length < 2) {
        let random = Math.floor(Math.random() * Math.floor(deck.length));
        currentCard = deck[random];
        deck.splice(random, 1);
        dealerHand.push(currentCard);
      };
      dealerHandTotal = determineHandTotal(dealerHand);
    };
    return dealerHand;
};

export function initialPlayerDeal (deck) {
    let currentCard;
    // let newDeck = deck;

    for (let i = 0; i < 2; i++) {
        if (playerHand.length < 2) {
        let random = Math.floor(Math.random() * Math.floor(deck.length));
        currentCard = deck[random];
        deck.splice(random, 1);
        playerHand.push(currentCard);
        };
        playerHandTotal = determineHandTotal(playerHand);
    };
    return playerHand;
};
    
export function determineHandTotal (hand) {
    let sum = 0;
  
    for (let i = 0; i < hand.length; i++) {
      if (typeof hand[i].value === 'number') {
        sum += hand[i].value;
      } else if (typeof hand[i].value === 'string') {
        if (hand[i].value === 'A') {
          sum += 11;
        } else {
          sum += 10;
        }
      };
    };
  
    return sum;
};