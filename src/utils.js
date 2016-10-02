export function distance([x1,y1], [x2, y2]) {
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);

    return Math.sqrt(dx*dx + dy*dy);
}

export function normal(v) {
    let [x,y] = v;
    let size = distance(v, [0,0]);

    return [x / size, y / size];
}
