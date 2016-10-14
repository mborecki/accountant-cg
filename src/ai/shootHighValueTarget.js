import Targets from '../targets.js';
import Enemies from '../enemies.js';
import {fullSimulation} from '../simulation.js';
import optimazeShot from './optimazeShot.js';

let targetsCount = null;
let enemiesCount = null;

export default function() {

    // if (targetsCount === null || enemiesCount === null) {
    //     targetsCount = Targets.size;
    //     enemiesCount = Enemies.size;
    //     fullSimulation();
    // }

    // if (targetsCount !== Targets.size || enemiesCount !== Enemies.size) {
    //     fullSimulation();
    //     targetsCount = Targets.size;
    // }

    let enemy = Enemies.getHighValueTarget();

    // printErr('4:', Enemies.data.get(4).path);

    return optimazeShot(enemy);
}
