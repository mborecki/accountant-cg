import {setPosition as playerSetPosition} from 'player';
import {update as targetUpdate, clear as targetClear} from 'target';

export const readInput = () => {

    // Read player position;
    var inputs = readline().split(' ');
    playerSetPosition([parseInt(inputs[0]),parseInt(inputs[1])]);

    targetClear();

    var dataCount = parseInt(readline());
    for (var i = 0; i < dataCount; i++) {
        var inputs = readline().split(' ');
        let id = parseInt(inputs[0]);
        let x = parseInt(inputs[1]);
        let y = parseInt(inputs[2]);

        targetUpdate(id, [x,y]);
    }

    var enemyCount = parseInt(readline());
    for (var i = 0; i < enemyCount; i++) {
        var inputs = readline().split(' ');
        var enemyId = parseInt(inputs[0]);
        var enemyX = parseInt(inputs[1]);
        var enemyY = parseInt(inputs[2]);
        var enemyLife = parseInt(inputs[3]);
    }
}
