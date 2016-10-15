import {getPosition, getNextPosition, isInDanger} from '../player.js';
import {distance, damage, pointInDistance, minDistance, normalTo} from '../utils.js';
import {PLAYER_SPEED, KILL_RANGE, ENEMY_SPEED} from '../config.js';
import {whenInDanger} from '../simulation.js';

export default function(enemy) {
    printErr('optimazeShot', enemy.id);
    let playerNow = getPosition();
    let enemyNow = enemy.cords;

    let timeNow = enemy.getTimeToKill(playerNow);
    let targetTime = enemy.getTimeToTarget();
    let target = enemy.getClosestTarget();

    let enemyNext = enemy.getNextPosition();
    let playerNext = getNextPosition({
        action: 'MOVE',
        x: enemyNext[0],
        y: enemyNext[1]
    });

    let distNow = distance(playerNow, enemy.cords);
    let distNext = distance(playerNext, enemyNext);

    let dd = distNow - distNext;

    let dist = distNow;

    let damageNow = damage(distance(playerNow, enemyNext));

    if (enemy.life <= damageNow) {
        printErr('JUST Kill!');
        return shootOrder();
    }

    if (enemy.life < 14 && distNow < KILL_RANGE + PLAYER_SPEED + ENEMY_SPEED) {
        printErr('WEAK EEMY CLOSE!');
        let deathPosition = enemy.getPosition(2);
        if (deathPosition) {
            let killRange = minDistance(enemy.life);
            printErr('killRange', killRange);

            let killerPosition = pointInDistance(deathPosition, normalTo(deathPosition, playerNow), killRange);

            return moveOrder(killerPosition);
        }
    }


    let iter = 0;

    let optOrder = null;

    while (dist > KILL_RANGE && iter < targetTime) {
        iter++;
        printErr('TURN', iter);
        dist = dist - dd;

        let timeNew = Math.ceil(enemy.life / damage(dist));

        printErr('timeNow', timeNow)
        printErr('timeNew', timeNew)
        printErr('(targetTime - iter)', targetTime - iter)
        printErr('enemy.value', enemy.value)


        if (timeNow >= timeNew && (timeNew <= (targetTime - iter) || enemy.value > 1)) {
            printErr('BETTER!');
            optOrder = moveOrder(enemy.getPosition(iter));
        }
    }

    if (optOrder) {
        return optOrder;
    }

    function moveOrder(cords = null) {
        printErr('moveOrder', cords)
        let time = Math.floor(distNow / PLAYER_SPEED);
        let p = cords || enemy.getPosition(time) || enemyNext;
        let order = {
            action: 'MOVE',
            x: Math.round(p[0]),
            y: Math.round(p[1])
        }

        let pos = getNextPosition(order)

        printErr('whenInDanger', whenInDanger(pos));

        // if (whenInDanger(pos) && whenInDanger(pos) < 3) {
        //     return shootOrder();
        // }

        if (isInDanger(pos)) {
            return shootOrder();
        }

        return order;
    }

    function shootOrder() {
        printErr('shootOrder', enemy.id);
        return {
            action: 'SHOOT',
            id: enemy.id
        }
    }

    return shootOrder();
}
