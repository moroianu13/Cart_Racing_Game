export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const lerp = (start, end, t) => {
    return start + (end - start) * t;
};

export const clamp = (value, min, max) => {
    return Math.max(min, Math.min(max, value));
};

export const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

export const radiansToDegrees = (radians) => {
    return radians * (180 / Math.PI);
};