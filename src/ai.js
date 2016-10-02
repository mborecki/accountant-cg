import moveToMiddle from 'ai/moveToMiddle';

const MOVE = 'MOVE'

const MODE_MOVE_TO_MIDDLE = 0;
const MODE_SHOOT_FIRST_ENEMY = 1;



let mode = MODE_MOVE_TO_MIDDLE;

export function run() {

    switch (mode) {

        case MODE_MOVE_TO_MIDDLE:
        default:
            return moveToMiddle();
    }
}
