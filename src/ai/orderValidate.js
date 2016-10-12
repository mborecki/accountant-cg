import {isInDanger, getNextPosition, getPosition} from '../player.js';
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
        let p1 = pointInDistance(pos, rotate(path, i), PLAYER_SPEED);
        if (inMap(p1) && Enemies.isSafe(p1)) {
            safePoints.push(p1);
        }
        let p2 = pointInDistance(pos, rotate(path, -i), PLAYER_SPEED);
        if (inMap(p2) && Enemies.isSafe(p2)) {
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

        let x = Math.floor(pos[0] + escapePath[0] * PLAYER_SPEED);
        let y = Math.floor(pos[1] + escapePath[1] * PLAYER_SPEED);


        if (x < 0) {
            x = 0;
            y = ((pos[1] - y) > 0) ? 0 : MAP_H;
        }

        if (x > MAP_W) {
            x = MAP_W;
            y = ((pos[1] - y) > 0) ? 0 : MAP_H;
        }

        if (y < 0) {
            x = ((pos[0] - x) > 0) ? 0 : MAP_W;
            y = 0;
        }

        if (y > MAP_H) {
            x = ((pos[0] - x) > 0) ? 0 : MAP_W;
            y = MAP_H;
        }

        // if (!Enemies.isSafe([x,y])) {
            return runByCircle(pos, escapePath);
        // }

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
