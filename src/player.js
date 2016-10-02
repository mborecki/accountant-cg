const PLAYER = {
    x: null,
    y: null
}

let F = () => {
    ble();
}

export function setPosition(cords) {
    let [x, y] = cords;
    PLAYER.x = x;
    PLAYER.y = y
}

export function getPosition() {
    return [PLAYER.x, PLAYER.y];
}

