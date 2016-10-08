import {getPosition, getNextPosition, isInDanger} from 'player';
import {distance, damage} from 'utils';
import {PLAYER_SPEED, KILL_RANGE} from 'config'
import {whenInDanger} from 'simulation';

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

    dd = distNow - distNext;

    let dist = distNow;

    let iter = 0;

    while (dist > KILL_RANGE) {
        iter++;
        dist = dist - dd;

        timeNew = Math.ceil(enemy.life / damage(dist));


        if (timeNow > timeNew && (timeNew < (targetTime - iter) || enemy.value > 1)) {
            return moveOrder();
        }
    }

    function moveOrder() {
        let order = {
            action: 'MOVE',
            x: enemyNext[0],
            y: enemyNext[1]
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
