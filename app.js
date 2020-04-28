const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const settingsInfo = document.getElementById('settings-info');
const startBtn = document.getElementById('button-start');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

let randomWord;

let score = 0;

let time = 10;

// Set Difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : "medium";

// Set Difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : "medium";

// Focus on text on start
text.focus();

// Start countdown
let timeInterval = 0;

/*FUNCTIONS*/

function startTheGame() {
  addWordToDOM();
  timeInterval = setInterval((updateTime), 1000);
}

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + ' сек';
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game Over
function gameOver() {
  endgameEl.innerHTML =
    `
  <h1>Время вышло!</h1>
  <p>Набрано очков: ${score}</p>
  <button onclick="location.reload()">Начать заново</button>
  `;
  endgameEl.style.display = 'flex';
}


/* EVENT LISTENERS */

text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('show');
});

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout((() => {
    settingsInfo.classList.add('show');
  }), 1200);
  setTimeout((() => {
    settingsInfo.classList.remove('show');
  }), 6000);
});

startBtn.addEventListener('click', startTheGame);

