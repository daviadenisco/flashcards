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
    
export function determineHandTotal (hand) {
    let sum = 0;
    let acesCount = 0;

    for (let i = 0; i < hand.length; i++) {
        if (typeof hand[i].value === 'number') {
          sum += hand[i].value;
        };
        
        if (typeof hand[i].value === 'string') {
          if (hand[i].value === 'A') {
            acesCount++;
          } else {
            sum += 10;
          };
        };
      };
    
    while (acesCount > 0) {
      if (sum < 11) {
        sum += 11;
      } else {
        sum += 1;
      };
      acesCount--;
    };
    return sum;
};

export function dealCard (deck) {
    let currentCard;

    for (let i = 0; i < deck.length; i++) {
        let random = Math.floor(Math.random() * Math.floor(deck.length));
        currentCard = deck[random];
    };

    return currentCard;
};

export const message = {
  dealer: 'Dealer Wins!',
  player: 'Player Wins!',
  push: 'Push!',
  keepPlaying: 'Keep Playing',
  placeBet: 'Place a bet to deal the cards!',
  totalChips: 'Total Chips: ',
  hit: 'Hit',
  stand: 'Stand',
  dealerHand: 'Dealer Hand',
  playerHand: 'Player Hand',
  total: 'Total: ',
  blackjack: 'Blackjack!',
  bust: 'Bust!',
  currentBet: 'Current Bet',
  playerLosesBet: 'Player busts, bet lost!',
};

export const amt = [
  {
    value: 1,
    color: 'white',
  },
  {
    value: 2,
    color: 'yellow',
  },
  {
    value: 5,
    color: 'red',
  },
  {
    value: 10,
    color: 'blue',
  },
  {
    value: 20,
    color: 'grey',
  },
  {
    value: 25,
    color: 'green',
  },
  {
    value: 50,
    color: 'orange',
  },
  {
    value: 100,
    color: 'black',
  },
  {
    value: 250,
    color: 'pink',
  },
  {
    value: 500,
    color: 'purple',
  },
];