import { Matrix } from '~/engine/maths/Matrix';

export type Vector3 = {
    x: number;
    y: number;
    z: number;
};

export namespace Vector3 {
    export const make = (x: number, y: number, z: number): Vector3 => ({ x, y, z });

    export function add(lhs: Readonly<Vector3>, rhs: Readonly<Vector3>): Vector3 {
        return addAssign({ ...lhs }, rhs);
    }

    export function addAssign(lhs: Vector3, rhs: Readonly<Vector3>): Vector3 {
        lhs.x += rhs.x;
        lhs.y += rhs.y;
        lhs.z += rhs.z;

        return lhs;
    }

    export function subtract(lhs: Readonly<Vector3>, rhs: Readonly<Vector3>): Vector3 {
        return subtractAssign({ ...lhs }, rhs);
    }

    export function subtractAssign(lhs: Vector3, rhs: Readonly<Vector3>): Vector3 {
        lhs.x -= rhs.x;
        lhs.y -= rhs.y;
        lhs.z -= rhs.z;

        return lhs;
    }

    export function hadamard(lhs: Readonly<Vector3>, rhs: Readonly<Vector3>): Vector3 {
        return hadamardAssign({ ...lhs }, rhs);
    }

    export function hadamardAssign(lhs: Vector3, rhs: Readonly<Vector3>): Vector3 {
        lhs.x *= rhs.x;
        lhs.y *= rhs.y;
        lhs.z *= rhs.z;

        return lhs;
    }

    export function scale(lhs: Readonly<Vector3>, rhs: number): Vector3 {
        return scaleAssign({ ...lhs }, rhs);
    }

    export function scaleAssign(lhs: Vector3, rhs: number): Vector3 {
        lhs.x *= rhs;
        lhs.y *= rhs;
        lhs.z *= rhs;

        return lhs;
    }

    export function divide(lhs: Readonly<Vector3>, rhs: number): Vector3 {
        return divideAssign({ ...lhs }, rhs);
    }

    export function divideAssign(lhs: Vector3, rhs: number): Vector3 {
        lhs.x /= rhs;
        lhs.y /= rhs;
        lhs.z /= rhs;

        return lhs;
    }

    export function dot(lhs: Readonly<Vector3>, rhs: Readonly<Vector3>): number {
        return lhs.x * rhs.x
             + lhs.y * rhs.y
             + lhs.z * rhs.z;
    }

    export function magnitudeSquared(lhs: Readonly<Vector3>): number {
        return dot(lhs, lhs);
    }

    export function magnitude(lhs: Readonly<Vector3>): number {
        return Math.sqrt(magnitudeSquared(lhs));
    }

    export function normalise(lhs: Readonly<Vector3>): Vector3 {
        return normaliseAssign({ ...lhs });
    }

    export function normaliseAssign(lhs: Vector3): Vector3 {
        return divideAssign(lhs, magnitude(lhs));
    }

    export function transform(lhs: Readonly<Vector3>, matrix: Matrix): Vector3 {
        return transformAssign({ ...lhs }, matrix);
    }

    export function transformAssign(lhs: Vector3, matrix: Matrix): Vector3 {
        const { x, y, z } = lhs;

        lhs.x = x * matrix[0] + y * matrix[4] + z * matrix[8]  + matrix[12];
        lhs.y = x * matrix[1] + y * matrix[5] + z * matrix[9]  + matrix[13];
        lhs.z = x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14];

        return lhs;
    }

    export function negate(lhs: Readonly<Vector3>): Vector3 {
        return negateAssign({ ...lhs });
    }

    export function negateAssign(lhs: Vector3): Vector3 {
        lhs.x *= -1;
        lhs.y *= -1;
        lhs.z *= -1;

        return lhs;
    }

    export const cross = (lhs: Readonly<Vector3>, rhs: Readonly<Vector3>) =>
        crossAssign({ ...lhs }, rhs);

    export function crossAssign(lhs: Vector3, rhs: Readonly<Vector3>): Vector3 {
        const x = lhs.x;
        const y = lhs.y;
        const z = lhs.z;

        lhs.x = y * rhs.z - z * rhs.y;
        lhs.y = z * rhs.x - x * rhs.z;
        lhs.z = x * rhs.y - y * rhs.x;

        return lhs;
    }

    export function copyInto(lhs: Vector3, rhs: Readonly<Vector3>): Vector3 {
        lhs.x = rhs.x;
        lhs.y = rhs.y;
        lhs.z = rhs.z;

        return lhs;
    }

    export const splat = (value: number) => make(value, value, value);
    export const positiveX = () => make(1.0, 0.0, 0.0);
    export const negativeX = () => make(-1.0, 0.0, 0.0);
    export const positiveY = () => make(0.0, 1.0, 0.0);
    export const negativeY = () => make(0.0, -1.0, 0.0);
    export const positiveZ = () => make(0.0, 0.0, 1.0);
    export const negativeZ = () => make(0.0, 0.0, -1.0);
}
