import Enemies from 'enemies';
import optimazeShot from 'ai/optimazeShot';

let enemiesCount = null;

export default function() {
    let enemy = Enemies.getFastest();

    return optimazeShot(enemy);
}
