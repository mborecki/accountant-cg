import Targets from 'targets';
import {ENEMY_SPEED} from 'config';
import {normal, distance} from 'utils';

class Enemy {
    constructor(data) {
        this.id = data.id;
        this.x = data.cords[0];
        this.y = data.cords[1];
        this.life = data.life;
    }

    get cords() {
        return [this.x, this.y];
    }

    getClosestTarget() {
        let target = Targets.getClosest(this.cords);

        printErr('E', this.id, '-> T' + target.id)

        return target;
    }

    getNextPosition() {
        let target = this.getClosestTarget();
        let n = normal([target.x - this.x, target.y - this.y]);

        let pos = [Math.floor(this.x + n[0] * ENEMY_SPEED), Math.floor(this.y + n[1] * ENEMY_SPEED)];

        return pos;
    }
}

class Enemies {
    constructor(data = []) {
        this.data = new Map(data);
    }

    clear() {
        this.data.clear();
    }

    update(id, cords, life) {
        this.data.set(id, new Enemy({
            id,
            cords,
            life
        }));
    }

    get(id) {
        return this.data.get(id);
    }

    delete(id) {
        this.data.remove(id);
    }

    clone() {
        return new Enemies(this.data);
    }

    getFirst() {
        return this.data.values().next().value;
    }
}

export default new Enemies();
