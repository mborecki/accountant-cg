import {isInDanger, getNextPosition, getPosition, getNewPosition} from '../player.js';
import {normal, add, rotate, pointInDistance, inMap} from '../utils.js';
import {PLAYER_SPEED, MAP_W, MAP_H} from '../config.js';
import Enemies from '../enemies.js';
import {whenInDanger} from '../simulation';

function runByCircle(pos, path) {
    printErr('runByCircle', pos, path);

    function moveOrder([x,y]) {
        return {
            action: 'MOVE',
            x: Math.floor(x),
            y: Math.floor(y)
        }
    }

    const STEPS = 32;

    let safePoints = [];

    for (let i = 0; i < Math.PI; i = i + Math.PI / STEPS) {
        let p1 = getNewPosition(pointInDistance(pos, rotate(path, i), PLAYER_SPEED));
        if (Enemies.isSafe(p1)) {
            safePoints.push(p1);
        }
        let p2 = getNewPosition(pointInDistance(pos, rotate(path, -i), PLAYER_SPEED));
        if (Enemies.isSafe(p2)) {
            safePoints.push(p2);
        }
    }



    let pointsSorted = safePoints.sort((a, b) => {
        let at = whenInDanger(a);
        let bt = whenInDanger(b);

        let aIsIn = inMap(a);
        let bIsIn = inMap(b);

        if (aIsIn !== bIsIn) {
            if (aIsIn) return -1;
            if (bIsIn) return 1;
        }

        if (at === null) return -1;
        if (bt === null) return 1;

        if (at > bt) {
            return -1;
        } else {
            return 1;
        }
    });

    return moveOrder(pointsSorted[0]);

}

export default function orderValidate(order) {
    let next = getNextPosition(order);

    let danger = isInDanger(next);

    if (!order) {
        return order;
    }

    let i = order.i || 0;

    if (danger) {


        // TODO: PLAYER_SPPED -> closest safe place;
        printErr('IN DANGER!', danger);
        let escapePaths = danger.map((enemy) => {
            return normal([next[0] - enemy[0], next[1] - enemy[1]]);
        });

        let escapePath = normal(add(escapePaths));
        let pos = getPosition();

        return runByCircle(pos, escapePath);

        return orderValidate({
            action: 'MOVE',
            x,
            y,
            i: ++i
        })
    } else {
        printErr('SAVE!');
    }

    return order;
}
