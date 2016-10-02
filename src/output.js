import {run} from 'ai';

function createCommand(order) {
    switch(order.action) {
        case 'MOVE':
            return `MOVE ${order.x} ${order.y}`;

        case 'SHOOT':
            return `SHOOT ${order.id}`;
    }
}

export default function() {
    print(createCommand(run()));
}
