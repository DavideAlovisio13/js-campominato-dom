/*

Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Consigli del giorno: :party_wizard:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.
:laptop_parrot: :laptop_parrot: Buon lavoro a tutte e a tutti! 

*/
// dichiaro le variabili che mi interessano...
const genBtn = document.querySelector('.btn');
const divCont = document.getElementById('contgrid');
console.log(divCont);

genBtn.addEventListener('click', function () {
    // variabile reset
    divCont.innerHTML = '';
    // variabili relative alla selezione della difficoltà
    let inpuSelect = document.getElementById("difficulty");
    let indexSelect = inpuSelect.selectedIndex;
    let valueSel = inpuSelect.options[indexSelect];
    let innerOptVal = parseInt(valueSel.value);
    // ciclo per inserire le celle di gioco all'interno del contenitore principale e i numeri all'interno delle celle
    for (let x = 0; x < innerOptVal; x++) {
        let newPlayCells = createNewCell(x + 1);
        const textCells = document.createElement('p');
        let numbers = x + 1;
        textCells.className = ('number')
        newPlayCells.append(textCells);
        textCells.append(numbers);
        // se il valore di difficoltà selezionato è ....
        if (innerOptVal === 100) {
            newPlayCells.classList.add('cell-size100');
            // invece se ......
        } else if (innerOptVal === 81) {
            newPlayCells.classList.add('cell-size81');
            // altrimenti....
        } else {
            newPlayCells.classList.add('cell-size49');
        }
        newPlayCells.addEventListener('click', function () {
            if (divNum(x + 1)) {
                newPlayCells.classList.add('press');
            } else {
                textCells.classList.add('d-none');
                newPlayCells.classList.add('press_none');
            }
        });

    }
    // funzione per la divisione x 3, 5 e 15
    function divNum(number) {
        if (number % 5 === 0) {
            return true;
        } else if (number % 3 === 0) {
            return true;
        } else if (number % 15 === 0) {
            return true;
        } else {
            return false;
        }
    }
    // funzione per generare la prima cella 
    function createNewCell(element) {
        const playCells = document.createElement('div');
        playCells.className = ('playcell opacity-transition scale');
        divCont.append(playCells);
        return playCells;
    }
});

