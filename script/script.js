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