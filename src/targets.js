import PLAYER from './player.js';
import {distance} from './utils.js';

class Target {
    constructor(data) {
        this.id = data.id;
        this.cords = data.cords;
        this.x = data.cords[0];
        this.y = data.cords[1];
    }

    isSafeableBefore(turn) {

    }
}

class Targets {
    constructor(data = []) {
        this.data = new Map(data);
    }

    clear() {
        this.data.clear();
    }

    update(id, cords) {
        this.data.set(id, new Target({
            id,
            cords
        }));
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
}

export default new Targets();
