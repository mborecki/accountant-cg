import Enemies from '../enemies.js';
import optimazeShot from './optimazeShot.js';

export default function() {
    let enemy = Enemies.getFirst();

    return optimazeShot(enemy);
}
