const PLAYER = {
    x: null,
    y: null
}

let F = () => {
    ble();
}

exports.setPosition = (cords) => {
    let [x, y] = cords;
    PLAYER.x = x;
    PLAYER.y = y
}

exports.getPosition = () => {
    return [PLAYER.x, PLAYER.y];
}

