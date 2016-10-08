import Enemies from 'enemies';
import optimazeShot from 'ai/optimazeShot';

export default function() {
    let enemy = Enemies.getFirst();

    return optimazeShot(enemy);
}
