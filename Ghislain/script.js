let board = document.querySelector('.game-board');
let cardValues = ['1', '1', 'A', 'A', '2', '2', 'B', 'B', '3', '3', 'C', 'C', '4', '4', 'D', 'D']

cardValues.sort(() => 0.5 - Math.random())

cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.textContent = '?';
    board.appendChild(card);
});

