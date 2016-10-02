import {MAP_W, MAP_H} from 'config';

export default function() {
    return {
        action: 'MOVE',
        x: Math.floor(MAP_W / 2),
        y: Math.floor(MAP_H / 2)
    }
}
