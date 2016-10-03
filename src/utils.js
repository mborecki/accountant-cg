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

export function reverse(v) {
    return [-v[0], -v[1]];
}

export function add(v = []) {
    let r = [0,0];

    v.forEach((vector) => {
        r[0] = r[0] + vector[0];
        r[1] = r[1] + vector[1];
    })

    return r;
}

export function pointInDistance([x,y], vector, distance) {
    let v = normal(v);

    return [x + v[0] * distance, y + v[1] * distance];
}

export function damage(distance) {
    return Math.round(125000 / Math.pow(distance, 1.2));
}
