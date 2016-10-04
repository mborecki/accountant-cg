import moveToMiddle from 'ai/moveToMiddle';
import shootFirstEnemy from 'ai/shootFirstEnemy';
import orderValidate from 'ai/orderValidate';
import shootFastestEnemy from 'ai/shootFastestEnemy';
import shootHighValueTarget from 'ai/shootHighValueTarget';
import runFromTarget from 'ai/runFromTarget';

const MOVE = 'MOVE'

const MODE_MOVE_TO_MIDDLE = 0;
const MODE_SHOOT_FIRST_ENEMY = 1;
const MODE_SHOOT_FASTEST_ENEMY = 2;
const MODE_SHOOT_HIGH_VALUE_TARGET = 3;

let mode = MODE_SHOOT_HIGH_VALUE_TARGET;

export function run() {


    let order = (function(){
        switch (mode) {
            case MODE_SHOOT_FASTEST_ENEMY:
                return shootFastestEnemy();
                break;

            case MODE_SHOOT_FIRST_ENEMY:
                return shootFirstEnemy();
                break;

            case MODE_SHOOT_HIGH_VALUE_TARGET:
                return shootHighValueTarget();
                break;

            case MODE_MOVE_TO_MIDDLE:
            default:
                return moveToMiddle();
        }
    }());

    order = orderValidate(order);

    return order;
}
