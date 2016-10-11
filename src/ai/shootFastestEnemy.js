import Enemies from '../enemies.js';
import optimazeShot from './optimazeShot.js';

let enemiesCount = null;

export default function() {
    let enemy = Enemies.getFastest();

    return optimazeShot(enemy);
}
