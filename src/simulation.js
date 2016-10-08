import Targets from 'targets';
import Enemies from 'enemies';
import {distance, getBonusPoints, damage} from 'utils';
import {ENEMY_SPEED, ENEMY_POINTS, TARGET_POINTS, KILL_RANGE} from 'config';

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

    return turns;
}

export function fullSimulation(enemies = Enemies, targets = Targets) {
    printErr('--- fullSimulation ---')
    Enemies.savePositions();
    Targets.saveTargets();

    enemies.data.forEach((enemy) => {
        enemy.value = 0;
        enemy.clearPath();
    });

    while (targets.size) {
        enemies.data.forEach((enemy) => {

            if (!targets.size) return;

            let next = enemy.getNextPosition();

            enemy.addToPath(next);
            enemy.move(next);

            targets.data.forEach((target) => {
                if (target.x === enemy.x && target.y === enemy.y) {
                    enemy.value = (enemy.value || 0) + 1;
                    Targets.delete(target.id);
                }
            });
        });
    }

    Targets.restoreTargets();
    Enemies.restorePositions();

    printErr(whenInDanger([0,0]));
}

export function getMaxDamage() {
    return damage(2000);
}

export function getMinShotCount(){
    const max = getMaxDamage();

    let shots = 0;

    Enemies.data.forEach((enemy) => {
        shots = shots + Math.ceil(enemy.life / max);
    });

    return shots;
}

export function getMaxPoints() {
    let targets = Targets.size * TARGET_POINTS;
    let enemies = Enemies.size * ENEMY_POINTS;

    let enemyLife = 0;

    Enemies.data.forEach((enemy) => {
        enemyLife = enemyLife + enemy.life;
    });

    let shots = getMinShotCount();

    let bonus = getBonusPoints(Targets.size, enemyLife, shots);

    return targets + enemies + bonus;
}

export function whenInDanger(cords) {
    let result = null;
    Enemies.data.forEach((enemy) => {
        let t = 0;

        pos = enemy.getPosition(t);

        while(pos && (!result || result > t)) {
            if (distance(pos, cords) < KILL_RANGE) {
                result = t;
                return;
            }

            pos = enemy.getPosition(++t);
        }
    });

    return result;
}
