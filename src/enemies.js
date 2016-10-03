import Targets from 'targets';
import {ENEMY_SPEED} from 'config';
import {normal, distance} from 'utils';

import {getSoloCollectTime} from 'simulation';

class Enemy {
    constructor(data) {
        this.id = data.id;
        this.x = data.cords[0];
        this.y = data.cords[1];
        this.life = data.life;
        this.active = true;

        this.soloTime = null;
    }

    get cords() {
        return [this.x, this.y];
    }

    getClosestTarget(targets = Targets) {
        let target = targets.getClosest(this.cords);

        printErr('E', this.id, '-> T' + target.id)

        return target;
    }

    getNextPosition() {
        let target = this.getClosestTarget();
        let n = normal([target.x - this.x, target.y - this.y]);

        let pos = [Math.floor(this.x + n[0] * ENEMY_SPEED), Math.floor(this.y + n[1] * ENEMY_SPEED)];

        return pos;
    }

    /**
     * Time to collect all targets by this enemy
     */
    getSoloCollectTime() {
        if (!this.soloTime) {
            this.soloTime = getSoloCollectTime(this);
        }

        return this.soloTime;
    }
}

class Enemies {
    constructor(data = []) {
        this.data = new Map(data);
    }

    beforeInput() {
        this.data.forEach((enemy) => {
            enemy.active = false;
        });
    }

    afterInput() {
        let toDelete = [];
        this.data.forEach((enemy) => {
            if (!enemy.active) {
                toDelete.push(enemy.id);
            }
        });

        if (toDelete.length) {
            toDelete.forEach((id) => {
                this.data.delete(id);
            });
        }
    }

    update(id, cords, life) {
        let enemy = this.data.get(id);

        if (!enemy) {
            this.data.set(id, new Enemy({
                id,
                cords,
                life
            }));
        } else {
            enemy.x = cords[0];
            enemy.y = cords[1];
            enemy.life = life;
            enemy.active = true;
        }

    }

    get(id) {
        return this.data.get(id);
    }

    delete(id) {
        this.data.delete(id);
    }

    get size() {
        return this.data.size;
    }

    clone() {
        return new Enemies(this.data);
    }

    getFirst() {
        return this.data.values().next().value;
    }

    getFastest() {
        let result = null;

        this.data.forEach((enemy) => {
            if (!result) {
                result = enemy;
                return;
            }

            if (enemy.getSoloCollectTime() < result.getSoloCollectTime()) {
                result = enemy;
            }
        });

        return result;
    }
}

export default new Enemies();
