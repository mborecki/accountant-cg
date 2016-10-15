import input from './input.js';
import output from './output.js';

import {getShotCount} from './player.js';
import {getMaxPoints} from './simulation.js';

import Enemies from './enemies.js';
import {fullSimulation} from './simulation.js';
import Teams, {buildTeams} from './teams.js';

let turnCounter = 0;

// game loop
while (true) {
    printErr(' --- TURN ' + turnCounter++ + ' | Shots:', getShotCount());
    input();

    fullSimulation();
    buildTeams();
    printErr('TEAMS COUNT:', Teams.size);

    if (turnCounter === 1) {
        printErr('MAX POINTS', getMaxPoints())

    }

    output();

    Enemies.endTurn();
}
