import Enemies from './enemies.js';
import {distance, normal, inMap, pointInDistance} from './utils.js';
import {KILL_RANGE, PLAYER_SPEED} from './config.js';

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
            printErr('in danger because of enemy', enemy.id, dist);
            dangers.push(next);
        };
    });

    if (dangers.length) {
        return dangers;
    }

    return false;
}

export function isInDangerInFuture(cords = PLAYER.cords, turns = 1) {
    let dangers = [];

    Enemies.data.forEach((enemy) => {
        for (let i=0; i < turns; i++) {
            dangers.push(enemy.path[i]);
        }
    })

    return !!dangers.filter((danger) => {
        return distance(cords, danger) <= KILL_RANGE;
    })
}

export function getNewPosition(cords) {
    let n = normal([cords[0] - PLAYER.x, cords[1] - PLAYER.y]);
    let pos = pointInDistance(PLAYER.cords, n, PLAYER_SPEED);

    if (inMap(pos)) {
        return pos;
    }

    let speed = PLAYER_SPEED / 2;
    let ds = speed / 2;

    while(ds >= 1) {

        if (inMap(pointInDistance(PLAYER.cords, n, speed))) {
            speed = speed + ds;
        } else {
            speed = speed - ds;
        }

        ds = Math.floor(ds / 2);
    }

    return pointInDistance(PLAYER.cords, n, speed);


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

            return getNewPosition([order.x, order.y])

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

export function findSafety(seed) {
    let pos = seed;
    const GRID = 20;

    points = [seed];
    checked = new Set();
    safe = [];

    function add(p) {
        if (distance(p, pos) <= PLAYER_SPEED && !checked.has(String(p))) {
            points.push(p)
        }
    }

    while (points.length) {
        let p = points.shift();
        let [x,y] = p;
        add([x+GRID, y]);
        add([x-GRID, y]);
        add([x, y-GRID]);
        add([x, y+GRID]);

        checked.add(String(p));

        if (!isInDanger(p)) {
            if (!isInDangerInFuture(p, 2)) {
                return p;
            }
            safe.push(p);
        }
    }

    return safe.sort((a, b) => {
        let enemyMiddle = Enemies.getMiddle();
        let enemyMiddleDistanceA = distance(a, enemyMiddle)
        let enemyMiddleDistanceB = distance(b, enemyMiddle);

        if (enemyMiddleDistanceA != enemyMiddleDistanceB) {
            return enemyMiddleDistanceA < enemyMiddleDistanceB;
        }

        return 0;
    })[0];

}

export default PLAYER;
