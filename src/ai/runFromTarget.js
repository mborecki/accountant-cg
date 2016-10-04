import {getPosition} from 'player';
import Targets from 'targets';
import {KILL_RANGE} from 'config';
import {distance, pointInDistance, middle} from 'utils';

export default function runFromTarget(order) {
    let targets = [];
    let pos = getPosition();

    Targets.data.forEach((target) => {
        printErr('TARGET', target.id, distance(pos, target.cords), KILL_RANGE, (distance(pos, target.cords) < KILL_RANGE))
        if (distance(pos, target.cords) < KILL_RANGE) {
            targets.push(target.cords);
        }
    });



    if (targets.length) {
        let middleTarget = middle(targets);
        printErr('runFromTarget', middleTarget)

        let moveTo = pointInDistance(middleTarget, [pos[0] - middleTarget[0], pos[1] - middleTarget[1]], KILL_RANGE);

        printErr('new MOVE FROM TARGET!');

        return {
            action: 'MOVE',
            x: Math.floor(moveTo[0]),
            y: Math.floor(moveTo[1]),
        }

    } else {
        return order;
    }
}
