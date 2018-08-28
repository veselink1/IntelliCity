export function float(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}

export function integer(min: number, max: number) {
    return Math.round(float(min, max));
}