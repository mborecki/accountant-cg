import Targets from './targets.js';
import {ENEMY_SPEED, KILL_RANGE} from './config.js';
import {normal, distance, damage, middle} from './utils.js';
import {getPosition as getPlayerPosition} from './player.js';

import {getSoloCollectTime} from './simulation.js';

class Enemy {
    constructor(data) {
        this.id = data.id;
        this.x = data.cords[0];
        this.y = data.cords[1];
        this.life = data.life;
        this.active = true;

        this.soloTime = null;

        this.path = [];

        this.pickedTargets = [];
    }

    get cords() {
        return [this.x, this.y];
    }

    get value() {
        return this.pickedTargets.filter((pick) => {
            return pick.target.isSafeableBefore(pick.turn);
        }).length;
    }

    move([x,y]) {
        this.x = x;
        this.y = y;
    }

    getClosestTarget(targets = Targets) {
        let target = targets.getClosest(this.cords);

        return target;
    }

    getClosestSafeableTarget() {
        let result = null;
        let picks = this.pickedTargets.slice();

        if (!picks.length) return this.getClosestTarget();

        while(picks.length) {
            let p = picks.shift();
            if (p.target.isSafeableBefore(p.turn)) {
                return p.target;
            }
        }

        return p[p.length - 1].target;
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

    getPosition(turn = null) {
        if (!turn) {
            return this.cords;
        }

        return this.path[turn - 1];
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
        let target = this.getClosestSafeableTarget();
        let dist = distance(this.cords, target.cords);

        return Math.ceil(dist / ENEMY_SPEED);
    }

    addToPath(cords) {
        this.path.push(cords);
    }

    clearPath() {
        this.path.length = 0;
        this.pickedTargets.length = 0;
    }

    endTurn() {
        this.path.shift();
    }
}

class Enemies {
    constructor(data = []) {
        this.data = new Map();
        data.forEach((e) => {
            this.data.set(e.id, e);
        });
    }

    updateList(ids) {
        let toDel = [];
        this.data.forEach((t) => {
            if (!ids.has(t.id)) {
                toDel.push(t.id);
            }
        });

        toDel.forEach((id) => {
            this.data.delete(id);
        })
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
        let resultValue = null;
        let resultTTT = null;
        let resultTTK = null;

        function setEnemy(enemy) {
            printErr('setEnemy', enemy.id);

            result = enemy;
            resultValue = enemy.value;
            resultTTT = enemy.getTimeToTarget();
            resultTTK = enemy.getTimeToKill()
        }

        this.data.forEach((enemy) => {

            let value = enemy.value;

            if (!result) {
                setEnemy(enemy);
                return;
            }

            if (value > resultValue) {
                setEnemy(enemy);
                return;
            } else if (value !== resultValue) return;

            let ttk = enemy.getTimeToKill();
            if (ttk < resultTTK) {
                setEnemy(enemy);
                return;
            } else if (ttk !== resultTTT) return;

            let ttt = enemy.getTimeToTarget();
            if (ttt < resultTTT) {
                setEnemy(enemy);
                return;
            } else if (ttt !== resultTTT) return;
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
        });
    }

    getMiddle() {
        let e = [];

        this.data.forEach((enemy) => {
            e.push(enemy.cords);
        })

        return middle(e);
    }

    isSafe(cords) {
        let i = this.data.values();

        let enemy = i.next().value
        while (enemy) {
            if (distance(cords, (enemy.getPosition(1) || enemy.getPosition())) <= KILL_RANGE) {
                return false;
            }

            enemy = i.next().value
        }

        return true;
    }

    endTurn() {
        this.data.forEach((enemy) => {
            enemy.endTurn();
        })
    }

    filter(condition) {
        let pass = [];

        this.data.forEach((enemy) => {
            if (condition(enemy, this)) {
                pass.push(enemy);
                // printErr('pass', enemy.id)
            }
        })

        return new Enemies(pass);
    }

    getFarrest(cords) {
        let result = null;
        let resultDist = null;

        let setResult = function(enemy) {
            result = enemy;
            resultDist = distance(cords, enemy.cords);
        }

        this.data.forEach((enemy) => {
            if (!result) {
                setResult(enemy);
                return;
            }

            let dist = distance(cords, enemy.cords);
            if (dist > resultDist) {
                setResult(enemy);
            }
        });

        return result;
    }
}

export const EnemiesClass = Enemies;

export default new Enemies();
