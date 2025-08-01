const gameContainer = document.getElementById('card-holder');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const popup = document.getElementById('win-popup');
const popupRestartBtn = document.getElementById('popup-restart-btn');
const finalTime = document.getElementById('final-time');
const welcomeOverlay = document.getElementById('welcome-overlay');
const startBtn = document.getElementById('start-btn');
const playerNameInput = document.getElementById('player-name');
let playerName = "";


const cardValues = ['2', '4', '6', '8', 'G', 'F', 'L', 'A'];
let cards = [...cardValues, ...cardValues];

let firstCard = null;
let secondCard = null;
let matchedCount = 0;
let score = 5;
let timerInterval;
let secondsElapsed = 0;
let timerStarted = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateScore() {
  scoreDisplay.textContent = score;

  // Turn red if score is negative
  if (score < 0) {
    scoreDisplay.classList.add('negative');
  } else {
    scoreDisplay.classList.remove('negative');
  }
}

function updateTimer() {
  const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
  const secs = String(secondsElapsed % 60).padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
}

function startTimer() {
  secondsElapsed = 0;
  updateTimer();
  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');

  const inner = document.createElement('div');
  inner.classList.add('card-inner');

  const front = document.createElement('div');
  front.classList.add('card-front');
  front.textContent = value;

  const back = document.createElement('div');
  back.classList.add('card-back');

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.dataset.value = value;

  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || secondCard) return;

    if (!timerStarted) {
      startTimer();
      timerStarted = true;
    }

    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  });

  return card;
}

function checkMatch() {
  const val1 = firstCard.dataset.value;
  const val2 = secondCard.dataset.value;

  if (val1 === val2) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard = null;
    secondCard = null;
    matchedCount += 2;

    score += 5;
    updateScore();

    if (matchedCount === cards.length) {
      stopTimer();
      finalTime.textContent = timerDisplay.textContent;
      popup.classList.remove('hidden');
    }

  } else {
    score -= 2;
    updateScore();

    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard = null;
      secondCard = null;
    }, 1000);
  }
}

function initializeGame() {
  gameContainer.innerHTML = '';
  message.textContent = '';
  message.classList.remove("win");
  document.body.classList.remove("win");
  popup.classList.add('hidden');

  score = 5;
  updateScore();

  matchedCount = 0;
  firstCard = null;
  secondCard = null;

  clearInterval(timerInterval);
  secondsElapsed = 0;
  updateTimer();
  timerStarted = false;

  shuffle(cards);
  cards.forEach(value => {
    const card = createCard(value);
    gameContainer.appendChild(card);
  });
}

restartBtn.addEventListener('click', () => {
  cards = [...cardValues, ...cardValues];
  initializeGame();
});

popupRestartBtn.addEventListener('click', () => {
  cards = [...cardValues, ...cardValues];
  initializeGame();
});

startBtn.addEventListener('click', () => {
  playerName = playerNameInput.value.trim() || "Player";
  document.getElementById('greeting').textContent = `${playerName}!.`;
  welcomeOverlay.style.display = 'none';
  initializeGame();
});


initializeGame();
