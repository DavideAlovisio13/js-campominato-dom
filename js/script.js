/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Consigli del giorno:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri? Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.
*/

// dichiaro le variabili che mi interessano...
const genBtn = document.querySelector('.btn');
const divCont = document.getElementById('contgrid');
console.log(divCont);
let score;
let gameOver = false;

genBtn.addEventListener('click', function () {
    score = 0;
    divCont.innerHTML = '';
    let inpuSelect = document.getElementById("difficulty");
    let innerOptVal = parseInt(inpuSelect.value);
    let bombs = getRandUniqNumb(innerOptVal, 16)
    for (let x = 1; x <= innerOptVal; x++) {
        let newPlayCells = createNewCell(x);
        console.log(x);
        addClasses(innerOptVal, newPlayCells);
        gameDynamics(newPlayCells, bombs, x);
    }

})

function gameDynamics(square, bombs, content, score) {
    square.addEventListener('click', function () {
        let messUser = document.querySelector('.mex');
        if (bombs.includes(content)) {
            square.classList.add('press_none');
            messUser.innerHTML = 'hai perso';
            let gameOver = true;
            let totSquare = document.querySelectorAll('.playcell');
            for (let j = 0; j < totSquare.length; j++) {
                if (bombs.includes(j)) {
                    totSquare[j].classList.add('press_none');
                    totSquare[j].classList.remove('press');
                    console.log(totSquare);
                }
            }
        } else {
            square.classList.add('press');
            score++;
            console.log(score)
            messUser.innerHTML = + `il tuo punteggio è  ${score} `;
        }
    }, { once: true });
    return square;
}


function addClasses(value, element) {
    if (value === 100) {
        element.classList.add('cell-size100');
        // invece se ......
    } else if (value === 81) {
        element.classList.add('cell-size81');
        // altrimenti....
    } else {
        element.classList.add('cell-size49');
    }

}

// funzione per generare la prima cella 
function createNewCell(content) {
    const playCells = document.createElement('div');
    playCells.className = ('playcell opacity-transition scale');
    divCont.append(playCells);
    const textCells = document.createElement('p');
    playCells.append(textCells);
    textCells.className = ('number');
    textCells.innerHTML = content;
    return playCells;
}

function getRandUniqNumb(maximum, lenghtNum) {
    const uniNumb = new Set();
    let arrayNumb = [];
    while (uniNumb.size < lenghtNum) {
        const casualNumb = Math.floor(Math.random() * maximum) + 1;
        uniNumb.add(casualNumb);
    }
    uniNumb.forEach(item => arrayNumb.push(item));
    return arrayNumb;
}

