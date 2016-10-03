import Targets from 'targets';
import Enemies from 'enemies';
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

export function fullSimulation(enemies = Enemies, targets = Targets) {
    printErr('--- fullSimulation ---')
    Enemies.savePositions();
    Targets.saveTargets();

    enemies.data.forEach((enemy) => {
        enemy.value = 0;
    })

    while (targets.size) {
        enemies.data.forEach((enemy) => {

            if (!targets.size) return;

            enemy.move(enemy.getNextPosition());

            targets.data.forEach((target) => {
                if (target.x === enemy.x && target.y === enemy.y) {
                    enemy.value = (enemy.value || 0) + 1;
                    Targets.delete(target.id);
                }
            });
        });
    }

    Enemies.restorePositions();
    Targets.restoreTargets();
}
