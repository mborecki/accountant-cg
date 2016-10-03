import {setPosition as playerSetPosition} from 'player';
import Targets from 'targets';
import Enemies from 'enemies';

export default function() {

    // Read player position;
    let inputs = readline().split(' ');
    playerSetPosition([parseInt(inputs[0]),parseInt(inputs[1])]);

    Targets.clear();
    Enemies.beforeInput();

    var dataCount = parseInt(readline());
    for (var i = 0; i < dataCount; i++) {
        let inputs = readline().split(' ');
        let id = parseInt(inputs[0]);
        let x = parseInt(inputs[1]);
        let y = parseInt(inputs[2]);

        Targets.update(id, [x,y]);
    }

    var enemyCount = parseInt(readline());
    for (var i = 0; i < enemyCount; i++) {
        let inputs = readline().split(' ');
        let id = parseInt(inputs[0]);
        let x = parseInt(inputs[1]);
        let y = parseInt(inputs[2]);
        let life = parseInt(inputs[3]);

        printErr('[E]', id, '[', x, y, ']', life);

        Enemies.update(id, [x,y], life);
    }

    Enemies.afterInput();
}
