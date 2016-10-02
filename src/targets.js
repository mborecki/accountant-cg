import PLAYER from 'player';
import {distance} from 'utils';

class Target {
    constructor(data) {
        this.id = data.id;
        this.cords = data.cords;
        this.x = data.cords[0];
        this.y = data.cords[1];
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
        this.data.remove(id);
    }

    clone() {
        return new Targets(this.data);
    }

    getClosest(cords = [PLAYER.x, PLAYER.y]) {
        let result = null;

        this.data.forEach((value) => {
            if (!result) {
                result = value;
                return;
            }

            if (distance(cords, value.cords) < distance(cords, result.cords)) {
                result = value;
            }
        })

        return result;
    }
}

export default new Targets();
