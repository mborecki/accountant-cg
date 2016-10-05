import Targets from 'targets';
import {ENEMY_SPEED} from 'config';
import {normal, distance, damage} from 'utils';
import {getPosition as getPlayerPosition} from 'player';

import {getSoloCollectTime} from 'simulation';

class Enemy {
    constructor(data) {
        this.id = data.id;
        this.x = data.cords[0];
        this.y = data.cords[1];
        this.life = data.life;
        this.active = true;

        this.soloTime = null;
        this.value = 0;

        this.path = [];
    }

    get cords() {
        return [this.x, this.y];
    }

    move([x,y]) {
        this.x = x;
        this.y = y;
    }

    getClosestTarget(targets = Targets) {
        let target = targets.getClosest(this.cords);

        return target;
    }

    getNextPosition() {
        let target = this.getClosestTarget();
        let n = normal([target.x - this.x, target.y - this.y]);

        let pos;

        if  (distance(target.cords, this.cords) < ENEMY_SPEED) {
            pos = target.cords;
        } else {
            pos = [Math.floor(this.x + n[0] * ENEMY_SPEED), Math.floor(this.y + n[1] * ENEMY_SPEED)];
        }

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

    getTimeToKill(cords = getPlayerPosition()) {
        //TODO - moving target

        return Math.ceil(this.life / damage(distance(cords, this.cords)));
    }

    getTimeToTarget() {
        let target = this.getClosestTarget();
        let dist = distance(this.cords, target.cords);

        return Math.ceil(dist / ENEMY_SPEED);
    }

    addToPath(cords) {
        this.path.push(cords);
    }

    clearPath() {
        this.path.length = 0;
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

    getHighValueTarget() {
        let result = null;

        this.data.forEach((enemy) => {
            if (!result) {
                result = enemy;
                return;
            }

            function setEnemy(enemy) {
                if (enemy.value === 1 && enemy.getTimeToKill() > enemy.getTimeToTarget()){
                    return;
                }

                result = enemy;
            }

            if (enemy.value > result.value) {
                setEnemy(enemy);
            } else if (enemy.value === result.value && enemy.getTimeToTarget() < result.getTimeToTarget()) {
                setEnemy(enemy);
            }
        })

        return result;
    }

    savePositions() {
        this.posCache = new Map();
        this.data.forEach((enemy) => {
            this.posCache.set(enemy.id, {x: enemy.x, y: enemy.y});
        })
    }

    restorePositions() {
        this.data.forEach((enemy) => {
            let pos = this.posCache.get(enemy.id);
            enemy.x = pos.x;
            enemy.y = pos.y;

            printErr('Enemy', enemy.id, 'value:', enemy.value, enemy.getTimeToKill(), enemy.getTimeToTarget());
        })
    }
}

export default new Enemies();
