import { doesEventOccurWithProbability } from "../utils.js";

describe("doesEventOccurWithProbability", () => {
    it("returns a boolean", () => {
        const result = doesEventOccurWithProbability(50);
        expect(typeof result).toBe("boolean");
    });

    it("throws a TypeError if percentage is not a number", () => {
        expect(() => doesEventOccurWithProbability("a")).toThrow(TypeError);
        expect(() => doesEventOccurWithProbability(true)).toThrow(TypeError);
    });

    it("throws a TypeError if percentage is less than 0 or greater than 100", () => {
        expect(() => doesEventOccurWithProbability(-1)).toThrow(TypeError);
        expect(() => doesEventOccurWithProbability(101)).toThrow(TypeError);
    });

    it("returns true with the specified probability", () => {
        const percentage = 50;
        let trueCount = 0;
        const measuresCount = 100000;
        for (let i = 0; i < measuresCount; i++) {
            if (doesEventOccurWithProbability(percentage)) {
                trueCount++;
            }
        }
        expect(trueCount / measuresCount).toBeCloseTo(percentage / 100, 2);
    });
});
