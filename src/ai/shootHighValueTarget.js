import Targets from 'targets';
import Enemies from 'enemies';
import {fullSimulation} from 'simulation';
import optimazeShot from 'ai/optimazeShot';

let targetsCount = null;
let enemiesCount = null;

export default function() {

    if (targetsCount === null || enemiesCount === null) {
        targetsCount = Targets.size;
        enemiesCount = Enemies.size;
        fullSimulation();
    }

    if (targetsCount !== Targets.size || enemiesCount !== Enemies.size) {
        fullSimulation();
        targetsCount = Targets.size;
    }

    let enemy = Enemies.getHighValueTarget();

    // printErr('4:', Enemies.data.get(4).path);

    return optimazeShot(enemy);
}
