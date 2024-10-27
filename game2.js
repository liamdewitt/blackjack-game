const cardType = {
  suit: ["Hearts", "Diamonds", "Clubs", "Spades"],
  card: [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    { name: "jack", value: 10 },
    { name: "queen", value: 10 },
    { name: "king", value: 10 },
    { name: "ace", value: 1 },
  ],
};
const cardTrackerMap = new Map();
const playerHand = [];
const dealerHand = [];
const pulledCardArray = []; // these will log card values

const suitDeleter = (key) => {
  if (cardTrackerMap.get(key) === undefined) {
    cardTrackerMap.delete(key);
  }
};

const randNum = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

// this loop makes a map based off cardType obj to build a key value pair map quickly
for (i = 0; i < cardType.suit.length; i++) {
  for (card of cardType.card) {
  }
  cardTrackerMap.set(cardType.suit[i], cardType.card);
}

const cardSelector = () => {
  const suitIndex = randNum(0, cardType.suit.length - 1);
  const suitString = cardType.suit[suitIndex];
  console.log("Suit string: ", suitString);
  let cardIndex = randNum(0, cardTrackerMap.get(suitString).length - 1); //picks a random number available at the current array in map
  cardIndex = cardTrackerMap.get(suitString)[cardIndex]; // updates cardIndex to be whatever is at that random number's index value
  console.log("Card index: ", cardIndex);
  const deckUpdater = cardTrackerMap.get(suitString).filter((card) => {
    if (card !== cardIndex) {
      // console.log("kept card");
      return true;
    } else {
      // console.log("threw out card");
      return false;
    }
  });
  suitDeleter(suitString);
  cardTrackerMap.set(suitString, deckUpdater);
  // console.log(
  //   "Updated deck for suit:",
  //   suitString,
  //   cardTrackerMap.get(suitString)
  // );
  pulledCardArray.push(cardIndex);
  // console.log(cardIndex);
};
// cardSelector();
// console.log(cardTrackerMap);
// console.log(pulledCardArray);

//checks to see if card pulled is a face card so we can use the value
const faceCardChecker = () => {
  if (pulledCardArray[0].value) {
    pulledCardArray[0] = pulledCardArray[0].value;
  }
};

// picks two cards
const dealTwoCardsFunction = (hand) => {
  for (i = 0; i < 2; i++) {
    cardSelector();
    faceCardChecker();
    hand.push(pulledCardArray[0]);
    pulledCardArray.pop();

    // console.log(hand);
  }
  return hand;
};
const dealOneCardFunction = (hand) => {
  for (i = 0; i < 1; i++) {
    cardSelector();
    if (pulledCardArray[0].value) {
      pulledCardArray[0] = pulledCardArray[0].value;
    }
    return hand.push(pulledCardArray[0]), pulledCardArray.pop();
  }
};

//loop till deck is complete
//dont forget to stop loop when map has nothing

const sumOfHand = (hand) => {
  return hand.reduce((result, num) => {
    return result + num;
  }, 0);
};

// Helper function to end the game and reset hands
const endGame = () => {
  console.log("------END GAME RESULTS------");
  console.log("Player's end Hand: ", playerHand, sumOfHand(playerHand));
  console.log("Dealers's end Hand: ", dealerHand, sumOfHand(dealerHand));
  playerHand.length = 0;
  dealerHand.length = 0;
};

console.log("------Player's dealt cards------");
dealTwoCardsFunction(playerHand);
console.log("------Dealer's dealt cards------");
dealTwoCardsFunction(dealerHand);
console.log("Player's starter Hand: ", playerHand, sumOfHand(playerHand));
console.log("Dealer's starter Hand: ", dealerHand, sumOfHand(dealerHand));

while (true) {
  if (sumOfHand(playerHand) === 21) {
    endGame();
    console.log("Player wins!");
    break;
  } else if (sumOfHand(dealerHand) === 21) {
    endGame();
    console.log("Dealer wins!");
    break;
  }

  if (sumOfHand(playerHand) > 21) {
    endGame();
    console.log("Dealer wins!");
    break;
  } else if (sumOfHand(dealerHand) > 21) {
    endGame();
    console.log("Player wins!");
    break;
  }

  // Deal more cards if both hands are under 21
  if (sumOfHand(playerHand) < 21) {
    console.log("------Player draws a new card------");
    dealOneCardFunction(playerHand);
    console.log("Player's new Hand: ", playerHand, sumOfHand(playerHand));
  }
  if (sumOfHand(dealerHand) < 21) {
    console.log("------Dealer draws a new card------");
    dealOneCardFunction(dealerHand);
    console.log("Dealers's new Hand: ", dealerHand, sumOfHand(dealerHand));
  }
}
