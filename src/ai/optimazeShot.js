import {getPosition, getNextPosition, isInDanger} from 'player';
import {distance, damage} from 'utils';
import {PLAYER_SPEED, KILL_RANGE} from 'config'

export default function(enemy) {
    let playerNow = getPosition();
    let enemyNow = enemy.cords;

    let timeNow = enemy.getTimeToKill(playerNow);

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

    while (dist > KILL_RANGE) {
        dist = dist - dd;

        timeNew = Math.ceil(enemy.life / damage(dist));

        if (timeNow > timeNew) {
            return moveOrder();
        }
    }

    function moveOrder() {
        let order = {
            action: 'MOVE',
            x: enemy.x,
            y: enemy.y
        }
        if (isInDanger(getNextPosition(order))) {
            return shootOrder();
        }

        return order;
    }

    function shootOrder() {
        return {
            action: 'SHOOT',
            id: enemy.id
        }
    }

    return shootOrder();
}
