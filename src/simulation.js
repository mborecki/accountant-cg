import Targets from 'targets';
import {distance} from 'utils';
import {ENEMY_SPEED} from 'config';

export function getSoloCollectTime(enemy, _targets = Targets) {
    printErr('SIM getSoloCollectTime', enemy.id)
    let targets = _targets.clone();
    let pown = enemy.cords;

    let turns = 0;

    printErr('there is ' + targets.size + ' targets.');

    while (targets.size) {
        let nextTarget = targets.getClosest(pown);
        let dist = distance(pown, nextTarget.cords);

        printErr('distance to target', dist, Math.ceil(dist / ENEMY_SPEED));

        turns = turns + Math.ceil(dist / ENEMY_SPEED);

        pown = nextTarget.cords;
        targets.delete(nextTarget.id);
    }

    printErr('return', turns)

    return turns
}
