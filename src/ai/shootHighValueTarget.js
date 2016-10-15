import Targets from '../targets.js';
import Enemies from '../enemies.js';
import {fullSimulation} from '../simulation.js';
import optimazeShot from './optimazeShot.js';

let targetsCount = null;
let enemiesCount = null;

export default function() {

    let enemy = Enemies.getHighValueTarget();

    return optimazeShot(enemy);
}
