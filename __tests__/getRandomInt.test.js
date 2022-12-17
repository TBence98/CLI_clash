import { getRandomInt } from "../utils.js";

describe("getRandomInt", () => {
    it("returns a random integer within the specified range", () => {
        const min = 1;
        const max = 10;
        const randomInt = getRandomInt(min, max);

        expect(randomInt).toBeGreaterThanOrEqual(min);
        expect(randomInt).toBeLessThanOrEqual(max);
    });

    it("returns an integer", () => {
        const result = getRandomInt(1, 10);
        expect(Number.isInteger(result)).toBe(true);
    });

    it("throws a TypeError if min or max is not a number", () => {
        expect(() => getRandomInt("a", 10)).toThrow(TypeError);
        expect(() => getRandomInt(1, true)).toThrow(TypeError);
    });

    it("throws an error if min is greater than max", () => {
        expect(() => getRandomInt(10, 1)).toThrow(RangeError);
    });

    it("returns the minimum value if min and max are equal", () => {
        const min = 1;
        const max = 1;
        const result = getRandomInt(min, max);
        expect(result).toB;
    });
});
