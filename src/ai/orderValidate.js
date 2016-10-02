import {isInDanger, getNextPosition, getPosition} from 'player';
import {normal, add} from 'utils';
import {PLAYER_SPEED} from 'config';

export default function orderValidate(order) {
    let next = getNextPosition(order);

    let danger = isInDanger(next);

    if (!order) {
        return order;
    }

    if (danger) {
        printErr('IN DANGER!', danger);
        let escapePaths = danger.map((enemy) => {
            return normal([next[0] - enemy[0], next[1] - enemy[1]]);
        });

        let escapePath = normal(add(escapePaths));
        let pos = getPosition();

        printErr('run to', escapePath);

        // TODO: PLAYER_SPPED -> closest safe place;
        return orderValidate({
            action: 'MOVE',
            x: Math.floor(pos[0] + escapePath[0] * PLAYER_SPEED),
            y: Math.floor(pos[1] + escapePath[1] * PLAYER_SPEED)
        })
    } else {
        printErr('SAVE!');
    }

    return order;
}
