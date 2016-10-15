import {setPosition} from './player.js';
import Targets from './targets.js';
import Enemies from './enemies.js';

export default function() {

    // Read player position;
    let inputs = readline().split(' ');
    setPosition([parseInt(inputs[0]),parseInt(inputs[1])]);

    var dataCount = parseInt(readline());
    let targetsId = new Set();
    for (var i = 0; i < dataCount; i++) {
        let inputs = readline().split(' ');
        let id = parseInt(inputs[0]);
        let x = parseInt(inputs[1]);
        let y = parseInt(inputs[2]);

        Targets.add(id, [x, y]);
        targetsId.add(id);
    }

    Targets.updateList(targetsId);

    var enemyCount = parseInt(readline());
    let enemiesIds = new Set();
    for (var i = 0; i < enemyCount; i++) {
        let inputs = readline().split(' ');
        let id = parseInt(inputs[0]);
        let x = parseInt(inputs[1]);
        let y = parseInt(inputs[2]);
        let life = parseInt(inputs[3]);

        printErr('[E]', id, '[', x, y, ']', life);

        Enemies.update(id, [x,y], life);
        enemiesIds.add(id);
    }

    Enemies.updateList(enemiesIds);
}
