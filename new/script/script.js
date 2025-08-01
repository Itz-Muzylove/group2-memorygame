const gameContainer = document.getElementById('card-holder');
const score = document.getElementById('score');
const message = document.getElementById('message');

//List of cards
const cardValues = ['2', '4', '6', '8', 'G', 'F', 'L', 'A'];
const card = [...cardValues, ...cardValues]; //Duplicate CardValue

//Shuffle the cards
function shuffle(array) {
    for (let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[i], array[j]];
    }
}
shuffle(cards);

//Create cards
let firstCard = null;
let secondCard = null;
let matchedCount = 0;

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const content = document.createElement('div');
    card.textContent.add('card');
    content.classList.add('hidden');
    card.appendChild(content);

    card.addEventListener('click', () => {
        if (card.classList.contains('flipped') || card.classList.constains('matched')) return;

        card.classList.add('flipped');
        content.classList.remove('hidden');

        if (!firstCard) {
          firstCard = card;
        } else if (!secondCard) {
          secondCard = card;
          checkMatch();
        }
      });

      return card;
}
    // Check if two cards match
    function checkMatch() {
      if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCount += 2;

        // Reset card selection
        firstCard = null;
        secondCard = null;

        // Check if the game is won
        if (matchedCount === cards.length) {
          message.textContent = 'Congrats You won 🎉';
        }
      } else {
        // Flip cards back after a short delay
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard.querySelector('div').classList.add('hidden');
          secondCard.querySelector('div').classList.add('hidden');
          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }

    // Initialize the game
    function initializeGame() {
      gameContainer.innerHTML = '';
      message.textContent = '';
      matchedCount = 0;
      firstCard = null;
      secondCard = null;

      shuffle(cards);
      cards.forEach(value => {
        const card = createCard(value);
        gameContainer.appendChild(card);
      });
    }

    // Start the game
    initializeGame();
