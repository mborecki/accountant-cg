import moveToMiddle from 'ai/moveToMiddle';
import shootFirstEnemy from 'ai/shootFirstEnemy';
import orderValidate from 'ai/orderValidate';

const MOVE = 'MOVE'

const MODE_MOVE_TO_MIDDLE = 0;
const MODE_SHOOT_FIRST_ENEMY = 1;



let mode = MODE_SHOOT_FIRST_ENEMY;

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

    order = orderValidate(order);

    return order;
}
