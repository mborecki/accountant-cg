class Enemies {
    constructor(data = []) {
        this.data = new Map(data);
    }

    clear() {
        this.data.clear();
    }

    update(id, cords) {
        this.data.set(id, cords);
    }

    delete(id) {
        this.data.remove(id);
    }

    clone() {
        return new Targets(this.data);
    }
}

export default new Enemies()
