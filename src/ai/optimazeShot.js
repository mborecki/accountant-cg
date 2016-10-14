import {getPosition, getNextPosition, isInDanger} from '../player.js';
import {distance, damage} from '../utils.js';
import {PLAYER_SPEED, KILL_RANGE} from '../config.js';
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

    let iter = 0;

    let optOrder = null

    while (dist > KILL_RANGE && iter < targetTime) {
        iter++;
        dist = dist - dd;

        let timeNew = Math.ceil(enemy.life / damage(dist));


        if (timeNow > timeNew && (timeNew < (targetTime - iter) || enemy.value > 1)) {
            optOrder = moveOrder(enemy.getPosition(iter));
        }
    }

    if (optOrder) {
        return optOrder;
    }

    function moveOrder() {
        let time = Math.floor(distNow / PLAYER_SPEED);
        let p = enemy.getPosition(time) || enemyNext;
        let order = {
            action: 'MOVE',
            x: p[0],
            y: p[1]
        }

        if (isInDanger(getNextPosition(order))) {
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
