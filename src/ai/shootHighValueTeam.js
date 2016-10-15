import Teams from '../teams.js';
import optimazeShot from './optimazeShot.js';

export default function() {

    let team = Teams.getHighestValueTeam();
    let enemy = team.getHighValueTarget();

    return optimazeShot(enemy);
}
