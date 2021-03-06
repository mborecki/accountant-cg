import PLAYER from './player.js';
import {distance} from './utils.js';

import {getGameTime} from './simulation.js';

class Target {
    constructor(data) {
        this.id = data.id;
        this.cords = data.cords;
        this.x = data.cords[0];
        this.y = data.cords[1];

        this.timeline = new Map();
    }

    isSafeableBefore(_turnLimit) {
        let turnLimit = getGameTime();
        let ttk = 0;
        for (let i = 0; i <= turnLimit; i++) {
            let pickUps = this.timeline.get(i);

            if (pickUps) {
                ttk = ttk + pickUps.ttk;

                if (ttk > i) {
                    return false;
                }
            }
        }

        return true;
    }


    addPickUp({enemy, turn}) {
        // printErr('addPickUp')
        let turnArr = this.timeline.get(turn)
        if (!turnArr) {
            turnArr = {enemies: [], ttk: 0, life: 0};
            this.timeline.set(turn, turnArr);
        }

        turnArr.enemies.push(enemy);
        turnArr.ttk += enemy.getTimeToKill();
        turnArr.life += enemy.life;
    }

    clearTimeline() {
        this.timeline = new Map();
    }
}

class Targets {
    constructor(data = []) {
        this.data = new Map();
        data.forEach((e) => {
            this.data.set(e.id, e);
        });
    }

    clear() {
        this.data.clear();
    }

    add(id, cords) {

        if (this.data.get(id)) return;

        this.data.set(id, new Target({
            id,
            cords
        }));
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

    delete(id) {
        this.data.delete(id);
    }

    clone() {
        return new Targets(this.data);
    }

    getClosest(cords = [PLAYER.x, PLAYER.y]) {
        let result = null;
        let resultDistance = null;

        this.data.forEach((value) => {
            if (!result) {
                result = value;
                resultDistance = distance(cords, value.cords)
                return;
            }

            let dist = distance(cords, value.cords)

            if (dist < resultDistance) {
                result = value;
                resultDistance = dist;
            }
        })

        return result;
    }

    get size() {
        return this.data.size;
    }

    saveTargets() {
        this.targetCache = new Map(this.data);
    }

    restoreTargets() {
        this.data = this.targetCache;
    }

    clearTimeline() {
        this.data.forEach((target) => {
            target.clearTimeline();
        })
    }
}

export default new Targets();
