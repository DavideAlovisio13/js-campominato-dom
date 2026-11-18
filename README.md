# Campo Minato

Il classico Campo Minato in **JavaScript puro**, senza librerie: griglia generata dinamicamente, tre livelli di difficoltà e 16 bombe.

## Regole

- Scegli un livello (10×10, 9×9 o 7×7) e premi **Nuova partita**.
- Ogni cella sicura rivelata vale 1 punto e mostra quante bombe ha intorno.
- Se clicchi una bomba la partita finisce e vengono rivelate tutte le bombe.
- Vinci quando hai rivelato tutte le celle sicure.

## Come avviarlo

Apri `index.html` nel browser: non serve nessuna installazione.

## Cosa è cambiato nella revisione del 2026

- Corretti i bug del primo esercizio: punteggio sempre `NaN`, partita che continuava dopo una bomba, bombe rivelate sulle celle sbagliate, nessuna condizione di vittoria.
- Aggiunto il conteggio delle bombe adiacenti, come nel gioco originale.
- Layout responsive (prima la griglia era fissa a 700 px) e celle come veri pulsanti, usabili anche da tastiera.
- Rimosse le dipendenze esterne (Bootstrap, Font Awesome, Google Fonts) e le immagini di personaggi protetti da copyright, sostituite da una grafica originale.

Progetto nato durante il corso Full-Stack di [Boolean](https://boolean.careers/).
