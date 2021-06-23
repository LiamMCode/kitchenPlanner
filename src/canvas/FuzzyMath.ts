const EPSILON = 1e-8;

export default class FuzzyMath {
    public static eq(a: number, b: number): boolean {
        return Math.abs(b - a) < EPSILON;
    }

    public static gt(a: number, b: number): boolean {
        return a > b + EPSILON;
    }

    public static gte(a: number, b: number): boolean {
        return a > b - EPSILON;
    }

    public static lt(a: number, b: number): boolean {
        return a < b - EPSILON;
    }

    public static lte(a: number, b: number): boolean {
        return a < b + EPSILON;
    }
}
