'use strict';

/**
 * Campo Minato in JavaScript puro.
 *
 * Regole (dalla consegna originale):
 * - 16 bombe in posizioni uniche, su una griglia di 100, 81 o 49 celle;
 * - cliccando una bomba la partita termina e si rivelano tutte le bombe;
 * - cliccando una cella sicura il punteggio sale di 1;
 * - si vince quando sono state rivelate tutte le celle senza bomba.
 * In più: ogni cella sicura mostra quante bombe ha intorno.
 */

const BOMB_COUNT = 16;

const els = {
    form: document.getElementById('controls'),
    select: document.getElementById('difficulty'),
    board: document.getElementById('board'),
    score: document.getElementById('score'),
    left: document.getElementById('left'),
    bombs: document.getElementById('bombs'),
    message: document.getElementById('message'),
};

let state = null;

/** Restituisce `count` numeri unici casuali tra 0 e `max - 1`. */
function uniqueRandomIndexes(max, count) {
    const picked = new Set();
    while (picked.size < count) {
        picked.add(Math.floor(Math.random() * max));
    }
    return picked;
}

/** Indici delle celle confinanti (anche in diagonale) con la cella `index`. */
function neighbours(index, side) {
    const row = Math.floor(index / side);
    const col = index % side;
    const result = [];
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < side && c >= 0 && c < side) result.push(r * side + c);
        }
    }
    return result;
}

function newGame(total) {
    const side = Math.sqrt(total);
    state = {
        total,
        side,
        bombs: uniqueRandomIndexes(total, BOMB_COUNT),
        revealed: new Set(),
        score: 0,
        over: false,
    };

    els.board.replaceChildren();
    els.board.style.setProperty('--side', side);
    els.board.classList.remove('is-over');

    for (let i = 0; i < total; i++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cell';
        cell.dataset.index = String(i);
        cell.setAttribute('aria-label', `Cella ${i + 1}`);
        els.board.append(cell);
    }

    els.bombs.textContent = String(BOMB_COUNT);
    els.message.textContent = 'Trova tutte le celle sicure. Buona fortuna!';
    els.message.className = 'message';
    render();
}

function reveal(index) {
    if (state.over || state.revealed.has(index)) return;

    const cell = els.board.children[index];

    if (state.bombs.has(index)) {
        state.over = true;
        cell.classList.add('is-exploded');
        revealAllBombs();
        finish(`Boom! Hai perso. Punteggio finale: ${state.score}.`, 'lose');
        return;
    }

    state.revealed.add(index);
    state.score++;
    const near = neighbours(index, state.side).filter((n) => state.bombs.has(n)).length;
    cell.classList.add('is-safe');
    cell.disabled = true;
    if (near > 0) {
        cell.textContent = String(near);
        cell.dataset.near = String(near);
    }
    cell.setAttribute('aria-label', near > 0 ? `${near} bombe vicine` : 'Nessuna bomba vicina');

    if (state.revealed.size === state.total - BOMB_COUNT) {
        state.over = true;
        revealAllBombs();
        finish(`Hai vinto! Tutte le ${state.score} celle sicure sono state trovate.`, 'win');
        return;
    }
    render();
}

function revealAllBombs() {
    state.bombs.forEach((i) => {
        const cell = els.board.children[i];
        cell.classList.add('is-bomb');
        cell.setAttribute('aria-label', 'Bomba');
    });
    Array.from(els.board.children).forEach((cell) => { cell.disabled = true; });
}

function finish(text, outcome) {
    els.board.classList.add('is-over');
    els.message.textContent = text;
    els.message.className = `message is-${outcome}`;
    render();
}

function render() {
    els.score.textContent = String(state.score);
    els.left.textContent = String(state.total - BOMB_COUNT - state.revealed.size);
}

els.form.addEventListener('submit', (event) => {
    event.preventDefault();
    newGame(parseInt(els.select.value, 10));
});

els.board.addEventListener('click', (event) => {
    const cell = event.target.closest('.cell');
    if (cell) reveal(parseInt(cell.dataset.index, 10));
});

newGame(parseInt(els.select.value, 10));
