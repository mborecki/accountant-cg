import {MAP_W, MAP_H} from './config.js';

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

export function middle(v = []) {
    let n = v.length;
    let s = add(v);

    return [s[0] / n, s[1] / n];
}

export function rotate([x,y], rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    return [x*c - y*s, x*s + y*c];
}

export function pointInDistance([x,y], vector, distance) {
    // printErr('pointInDistance', [x,y], vector, distance);
    let v = normal(vector);

    return [x + v[0] * distance, y + v[1] * distance];
}

export function damage(distance) {
    return Math.round(125000 / Math.pow(distance, 1.2));
}

export function minDistance(damage) {
    return Math.pow(125000 / damage, (1 / 1.2));
}

export function log(n, base) {
    return Math.log(n) / Math.log(base);
}

export function getBonusPoints(targetsCount, life, shots) {
    return targetsCount * Math.max(0, life - 3*shots) * 3;
}

export function normalTo(source, target) {
    return normal([target[0] - source[0], target[1] - source[1]]);
}

export function inMap([x,y]) {
    if (x < 0) return false;
    if (y < 0) return false;
    if (x >= MAP_W) return false;
    if (y >= MAP_H) return false;

    return true;
}
