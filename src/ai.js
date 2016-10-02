import moveToMiddle from 'ai/moveToMiddle';
import shootFirstEnemy from 'ai/shootFirstEnemy';
import {isInDanger, getNextPosition} from 'player';

const MOVE = 'MOVE'

const MODE_MOVE_TO_MIDDLE = 0;
const MODE_SHOOT_FIRST_ENEMY = 1;



let mode = MODE_MOVE_TO_MIDDLE;

export function run() {


    let order = (function(){
        switch (mode) {
            case MODE_SHOOT_FIRST_ENEMY:
                return shootFirstEnemy();
                break;

            case MODE_MOVE_TO_MIDDLE:
            default:
                return moveToMiddle();
        }
    }());

    let next = getNextPosition(order);

    let danger = isInDanger(next);

    if (danger) {
        printErr('IN DANGER!', danger);
    } else {
        printErr('SAVE!');
    }

    return order;
}
