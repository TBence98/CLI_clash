// The maximum is inclusive and the minimum is inclusive
export const getRandomInt = (min, max) => {
    if (typeof min !== "number" || typeof max !== "number") {
        throw new TypeError("min and max must be a number");
    }
    if (min > max) {
        throw new RangeError("min can't be bigger than max");
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const doesEventOccurWithProbability = (percentage) => {
    if (typeof percentage !== "number" || percentage < 0 || percentage > 100) {
        throw new TypeError("percentage must be a number between 0 and 100");
    }
    return Math.random() < percentage / 100;
};
