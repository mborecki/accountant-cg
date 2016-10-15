import moveToMiddle from './ai/moveToMiddle.js';
import shootFirstEnemy from './ai/shootFirstEnemy.js';
import orderValidate from './ai/orderValidate.js';
import shootFastestEnemy from './ai/shootFastestEnemy.js';
import shootHighValueTarget from './ai/shootHighValueTarget.js';
import shootHighValueTeam from './ai/shootHighValueTeam.js';
import runFromTarget from './ai/runFromTarget.js';

import Enemies from './enemies';

const MOVE = 'MOVE'

const MODE_MOVE_TO_MIDDLE = 0;
const MODE_SHOOT_FIRST_ENEMY = 1;
const MODE_SHOOT_FASTEST_ENEMY = 2;
const MODE_SHOOT_HIGH_VALUE_TARGET = 3;
const MODE_SHOOT_HIGH_VALUE_TEAM = 4;

let mode = MODE_SHOOT_HIGH_VALUE_TEAM;

export function run() {

    let fastKill = Enemies.getOneTurnKill();

    if (fastKill) {
        return orderValidate({
            action: 'SHOOT',
            id: fastKill.id
        })
    }

    let order = (function(){
        switch (mode) {

            case MODE_SHOOT_HIGH_VALUE_TEAM:
                return shootHighValueTeam();
                break;

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
