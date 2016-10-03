import Targets from 'targets';
import Enemies from 'enemies';
import {fullSimulation} from 'simulation';

let targetsCount = null;

export default function() {

    if (targetsCount === null) {
        targetsCount = Targets.size;
        fullSimulation();
    }

    if (targetsCount !== Targets.size) {
        fullSimulation();
        targetsCount = Targets.size;
    }

    let enemy = Enemies.getHighValueTarget();
    return {
        action: 'SHOOT',
        id: enemy.id
    }
}
