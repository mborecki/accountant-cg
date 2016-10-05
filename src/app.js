import input from 'input';
import output from 'output';

import {getShotCount} from 'player';

let turnCounter = 0;

// game loop
while (true) {
    printErr(' --- TURN ' + turnCounter++ + ' | Shots:', getShotCount());
    input();

    output();
}
