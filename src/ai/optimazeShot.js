import {getPosition, getNextPosition, isInDanger} from '../player.js';
import {distance, damage, pointInDistance, normalTo} from '../utils.js';
import {PLAYER_SPEED, KILL_RANGE} from '../config.js';
import {whenInDanger} from '../simulation.js';
import Enemies from '../enemies.js';

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

    if (enemy.life <= 14) {
        printErr('weak enemy!', enemy.life);
        printErr('targetTime', targetTime);
        for(let i = 0; i < enemy.path.length && i <= targetTime && i < 3; i++) {
            let ePos = enemy.getPosition(i);
            let dist = distance(playerNow, ePos);
            let d = damage(dist)
            printErr(i,':', d);
            if (d >= enemy.life) {
                printErr('wait turn!', i);
                return waitOrder(enemy);
            }
        }
    }

    while (dist > KILL_RANGE) {
        iter++;
        dist = dist - dd;

        let timeNew = Math.ceil(enemy.life / damage(dist));

        if (Enemies.size < 10) {
            printErr('timeNow', timeNow);
            printErr('timeNew', timeNew);
            printErr('targetTime', targetTime);
            printErr('iter', iter);
            printErr('enemy.value', enemy.value);
            if (timeNow >= timeNew && (timeNew <= (targetTime - iter) || enemy.value > 1)) {
                return moveOrder();
            }

        } else {
            if (timeNow > timeNew && (timeNew < (targetTime - iter) || enemy.value > 1)) {
                return moveOrder();
            }
        }


    }

    function waitOrder(enemy) {
        printErr('waitOrder');

        let easyEnemy = Enemies.getOneTurnKill();

        if (easyEnemy) {
            return {
                action: 'SHOOT',
                id: easyEnemy.id
            }
        }

        let next = enemy.getPosition(2);

        printErr('distance', distance(next, playerNow), next);

        if (distance(next, playerNow) > KILL_RANGE) {
            printErr('STAY');
            return {
                action: 'MOVE',
                x: playerNow[0],
                y: playerNow[1]
            }
        } else {
            printErr('MOVE A BIT!');

            let [x,y] = pointInDistance(next, normalTo(next, playerNow), KILL_RANGE + 1);
            return {
                action: 'MOVE',
                x: Math.floor(x),
                y: Math.floor(y)
            }
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
