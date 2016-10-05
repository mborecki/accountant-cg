import input from 'input';
import output from 'output';

import {getShotCount} from 'player';
import {getMaxPoints} from 'simulation';

let turnCounter = 0;

// game loop
while (true) {
    printErr(' --- TURN ' + turnCounter++ + ' | Shots:', getShotCount());
    input();

    if (turnCounter === 1) {
        printErr('MAX POINTS', getMaxPoints())
    }

    output();
}
