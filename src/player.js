import Enemies from 'enemies';
import {distance, normal} from 'utils';
import {KILL_RANGE, PLAYER_SPEED} from 'config'

const PLAYER = {
    x: null,
    y: null,
    cords: null,
}

let shotCount = 0;

export function setPosition(cords) {
    let [x, y] = cords;
    PLAYER.cords = cords;
    PLAYER.x = x;
    PLAYER.y = y;
}

export function getPosition() {
    return [PLAYER.x, PLAYER.y];
}

export function isInDanger(cords = PLAYER.cords) {
    let dangers = [];

    Enemies.data.forEach((enemy) => {
        let next = enemy.getNextPosition()
        let dist = distance(cords, next)
        if (dist <= KILL_RANGE ) {
            // TODO next -> point of entry
            dangers.push(next);
        };
    });

    if (dangers.length) {
        return dangers;
    }

    return false;
}

export function getNextPosition(order){
    switch(order.action) {
        case 'SHOOT':
            return PLAYER.cords;
            break;

        case 'MOVE':

            if (distance(PLAYER.cords, [order.x, order.y]) < PLAYER_SPEED) {
                return [order.x, order.y];
            }

            let n = normal([order.x - PLAYER.x, order.y - PLAYER.y]);
            return [Math.floor(PLAYER.x + n[0] * PLAYER_SPEED), Math.floor(PLAYER.y + n[1] * PLAYER_SPEED)];

        default:
            return PLAYER.cords;
    }
}

export function addShot() {
    shotCount++;
}

export function getShotCount() {
    return shotCount;
}
