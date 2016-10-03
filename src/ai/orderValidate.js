import {isInDanger, getNextPosition, getPosition} from 'player';
import {normal, add} from 'utils';
import {PLAYER_SPEED, MAP_W, MAP_H} from 'config';

export default function orderValidate(order) {
    let next = getNextPosition(order);

    printErr('orderValidate', next);

    let danger = isInDanger(next);

    if (!order) {
        return order;
    }

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

        printErr('run to #1', x, y);

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

        printErr('run to #2', x, y);

        return orderValidate({
            action: 'MOVE',
            x,
            y
        })
    } else {
        printErr('SAVE!');
    }

    return order;
}
