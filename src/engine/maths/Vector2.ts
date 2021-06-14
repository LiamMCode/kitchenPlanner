import { Matrix } from '~/engine/maths/Matrix';

export type Vector2 = {
    x: number;
    z: number;
};

export namespace Vector2 {
    export const make = (x: number, z: number): Vector2 => ({ x, z });

    export function add(lhs: Readonly<Vector2>, rhs: Readonly<Vector2>): Vector2 {
        return addAssign({ ...lhs }, rhs);
    }

    export function addAssign(lhs: Vector2, rhs: Readonly<Vector2>): Vector2 {
        lhs.x += rhs.x;
        lhs.z += rhs.z;

        return lhs;
    }

    export function subtract(lhs: Readonly<Vector2>, rhs: Readonly<Vector2>): Vector2 {
        return subtractAssign({ ...lhs }, rhs);
    }

    export function subtractAssign(lhs: Vector2, rhs: Readonly<Vector2>): Vector2 {
        lhs.x -= rhs.x;
        lhs.z -= rhs.z;

        return lhs;
    }

    export function hadamard(lhs: Readonly<Vector2>, rhs: Readonly<Vector2>): Vector2 {
        return hadamardAssign({ ...lhs }, rhs);
    }

    export function hadamardAssign(lhs: Vector2, rhs: Readonly<Vector2>): Vector2 {
        lhs.x *= rhs.x;
        lhs.z *= rhs.z;

        return lhs;
    }

    export function scale(lhs: Readonly<Vector2>, rhs: number): Vector2 {
        return scaleAssign({ ...lhs }, rhs);
    }

    export function scaleAssign(lhs: Vector2, rhs: number): Vector2 {
        lhs.x *= rhs;
        lhs.z *= rhs;

        return lhs;
    }

    export function divide(lhs: Readonly<Vector2>, rhs: number): Vector2 {
        return divideAssign({ ...lhs }, rhs);
    }

    export function divideAssign(lhs: Vector2, rhs: number): Vector2 {
        lhs.x /= rhs;
        lhs.z /= rhs;

        return lhs;
    }

    export function dot(lhs: Readonly<Vector2>, rhs: Readonly<Vector2>): number {
        return lhs.x * rhs.x
             + lhs.z * rhs.z;
    }

    export function magnitudeSquared(lhs: Readonly<Vector2>): number {
        return dot(lhs, lhs);
    }

    export function magnitude(lhs: Readonly<Vector2>): number {
        return Math.sqrt(magnitudeSquared(lhs));
    }

    export function normalise(lhs: Readonly<Vector2>): Vector2 {
        return normaliseAssign({ ...lhs });
    }

    export function normaliseAssign(lhs: Vector2): Vector2 {
        return divideAssign(lhs, magnitude(lhs));
    }

    export function transform(lhs: Readonly<Vector2>, matrix: Matrix): Vector2 {
        return transformAssign({ ...lhs }, matrix);
    }

    export function transformAssign(lhs: Vector2, matrix: Matrix): Vector2 {
        const { x, z } = lhs;

        lhs.x = x * matrix[0] + z * matrix[8]  + matrix[12];
        lhs.z = x * matrix[2] + z * matrix[10] + matrix[14];

        return lhs;
    }

    export function negate(lhs: Readonly<Vector2>): Vector2 {
        return negateAssign({ ...lhs });
    }

    export function negateAssign(lhs: Vector2): Vector2 {
        lhs.x *= -1;
        lhs.z *= -1;

        return lhs;
    }

    export function copyInto(lhs: Vector2, rhs: Readonly<Vector2>): Vector2 {
        lhs.x = rhs.x;
        lhs.z = rhs.z;

        return lhs;
    }

    export const leftPerpendicular = (lhs: Readonly<Vector2>): Vector2 =>
        leftPerpendicularAssign({ ...lhs });

    export function leftPerpendicularAssign(lhs: Vector2): Vector2 {
        lhs.x = -lhs.z;
        lhs.z =  lhs.x;

        return lhs;
    }

    export const rightPerpendicular = (lhs: Readonly<Vector2>): Vector2 =>
        rightPerpendicularAssign({ ...lhs });

    export function rightPerpendicularAssign(lhs: Vector2): Vector2 {
        lhs.x =  lhs.z;
        lhs.z = -lhs.x;

        return lhs;
    }

    /**
     * This is conceptually the same as doing `leftPerpendicular().dot(vector)` but without the extra memory allocation.
     */
    export function leftPerpendicularDot(lhs: Readonly<Vector2>, rhs: Readonly<Vector2>): number {
        return -lhs.z * rhs.x + lhs.x * rhs.z;
    }

    /**
     * This is conceptually the same as doing `rightPerpendicular().dot(vector)` but without the extra memory allocation.
     */
    export function rightPerpendicularDot(lhs: Readonly<Vector2>, rhs: Readonly<Vector2>): number {
        // This is also sometimes known as the cross product, but that's confusing because that operation
        // is not defined in 2D. If you imagine these as 3D vectors with their `y` value set to zero and then
        // perform the cross product on those, the resulting vector will have 0 for `x` and `z` and the result
        // for `y`. In that case this is also conceptually the same as:
        // const this3D  = Vector3.make(tx, 0, ty);
        // const other3D = Vector3.make(ox, 0, oy);
        // return this3D.cross(other3D).y;

        // Personally I think that `rightPerpendicularDot` is a better name because the result can be seen as the
        // cosine of the angle between the two vectors while the `dot` can be seen as the sine of the angle
        // between the two vectors.

        return lhs.z * rhs.x - lhs.x * rhs.z;
    }

    export const splat = (value: number) => make(value, value);
    export const positiveX = () => make(1.0, 0.0);
    export const negativeX = () => make(-1.0, 0.0);
    export const positiveZ = () => make(0.0, 1.0);
    export const negativeZ = () => make(0.0, -1.0);
}
