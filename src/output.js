import {run} from 'ai';
import {addShot} from 'player';

function createCommand(order) {
    switch(order.action) {
        case 'MOVE':
            return `MOVE ${order.x} ${order.y}`;

        case 'SHOOT':
            addShot();
            return `SHOOT ${order.id}`;
    }
}

export default function() {
    print(createCommand(run()));
}
