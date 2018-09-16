// Variables
const keyboard = document.getElementById('qwerty');
const phraseUl = document.getElementById('phrase');
const keyrowButtons = document.querySelectorAll('.keyrow button');
let missed = 0;
const btnReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const title = document.getElementsByClassName('title')[0];
const titleSubtitle = document.querySelectorAll('#overlay h3')[0];
const headerTitle = document.getElementsByClassName('header')[0];
const headerSubtitle = document.querySelectorAll('#banner h3')[0]


// Hide start game overlay
btnReset.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// The Phrases
const gameStrings = [
  'Java',
  'C',
  'Python',
  'Swift',
  'Ruby',
  'JavaScript',
  'PHP',
  'C++',
  'C#',
  'Objective-C',
  'Go',
  'Scratch',
  'SQL'
];



//choose number 1-5 randomly
const getNumberPhrase = Math.floor(Math.random() * 13);
const getPhrase = gameStrings[getNumberPhrase];


// choose random phrase and split the characters
function getRandomPhraseArray(arr) {
  let choosedString = arr[getNumberPhrase];
  const charactersArray = choosedString.split('');
  return charactersArray;
};
const charactersArray = getRandomPhraseArray(gameStrings);


// set the game display
function addPhraseToDisplay(arr) {
  for(let i = 0; i < arr.length; i += 1) {
    const li = document.createElement('li');
    phraseUl.appendChild(li);
    li.textContent = arr[i];
    if(arr[i] !== ' ') {
      li.className = 'letter';
    } else if(arr[i] === ' ') {
      li.className = 'space';
    }
  }
};
addPhraseToDisplay(charactersArray);


 // The checkLetter function
function checkLetter(btn) {
  const theLetters = document.getElementsByClassName('letter');
  let letterFound = null;
  for(let i = 0; i < theLetters.length; i += 1) {
    if (btn.textContent === theLetters[i].textContent.toLowerCase()) {
      theLetters[i].classList.add('show');
      btn.classList.add('chosen-correct');

      letterFound = theLetters[i].textContent;
    }
  }

  return letterFound;
};


// The checkWin function
function checkWin() {
  const theLetters = document.getElementsByClassName('letter');
  const show = document.getElementsByClassName('show');
  const maxTries = 5;

  if(theLetters.length === show.length && show.length !== 0) {
    overlay.className = 'win';
    overlay.style.display = 'flex';
    titleSubtitle.textContent = 'correct'
    title.innerHTML = 'Congratulations, well done!';
    btnReset.textContent = 'New Round';
 } else if(missed >= maxTries) {
    overlay.className = 'lose';
    overlay.style.display = 'flex';
    titleSubtitle.textContent = 'wrong';
    title.innerHTML = 'Sorry, try again';
    btnReset.textContent = 'New Round';
  }
};


// Click event listener --> keyboard buttons
for(let i = 1; i < keyrowButtons.length; i += 1) {
  keyrowButtons[i].addEventListener('click', (e) => {
    let clickedButton = e.target;
    clickedButton.classList.add('chosen');

    clickedButton.setAttribute('disabled', true);
    clickedButton.style.cursor = 'default';
    let letterFound = checkLetter(clickedButton);
    if(letterFound === null) {
      const scoreboard = document.getElementById('scoreboard');
      const scoreboardHeart = scoreboard.querySelectorAll('.tries img')[missed];
      scoreboardHeart.setAttribute("src", "images/lostHeart.png");
      missed += 1;
    }
    checkWin()
  })
};


// Start new round --> reset button
btnReset.addEventListener('click', () => {
if(overlay.className === 'lose' || overlay.className === 'win') {
  if(overlay.className === 'lose') {
    headerSubtitle.innerHTML = 'Please try a little harder this time!';
  } else if(overlay.className === 'win') {
    headerSubtitle.innerHTML = 'Excellent, well done. Good luck also for this round!';
  }

  for(let i = 0; i < keyrowButtons.length; i += 1) {
    keyrowButtons[i].classList.remove('chosen');
    keyrowButtons[i].removeAttribute('disabled');
    keyrowButtons[i].classList.remove('chosen-correct');
    keyrowButtons[i].style.cursor = 'pointer';
  }

// set the number of missed to zero
  missed = 0;

  // set back live images
  const allScoreboardHearts = scoreboard.querySelectorAll('.tries img');
  allScoreboardHearts[0].setAttribute("src", "images/image1.png");
  allScoreboardHearts[1].setAttribute("src", "images/image2.png");
  allScoreboardHearts[2].setAttribute("src", "images/image3.png");
  allScoreboardHearts[3].setAttribute("src", "images/image4.png");
  allScoreboardHearts[4].setAttribute("src", "images/image5.png");

  // Remove old phrase
  const theLetters = document.getElementsByClassName('letter');
  const theSpaces = document.getElementsByClassName('space');
  for (let i = theLetters.length - 1; i >= 0; i--) {
    theLetters[i].parentNode.removeChild(theLetters[i]);
  }
  for (let i = theSpaces.length - 1; i >=0; i--) {
    theSpaces[i].parentNode.removeChild(theSpaces[i]);
  }

  // Generate a new phrase
  const getNewNumberPhrase = Math.floor(Math.random() * 13);

  function getNewRandomPhraseArray(arr) {
    let choosedString = arr[getNewNumberPhrase];
    const charactersArray = choosedString.split('');
    return charactersArray;
  };
  const newCharactersArray = getNewRandomPhraseArray(gameStrings);
  addPhraseToDisplay(newCharactersArray);
  }

});
