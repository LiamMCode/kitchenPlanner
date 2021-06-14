import { Matrix } from '~/engine/maths/Matrix';
import { Vector2 } from '~/engine/maths/Vector2';

export interface Point2 {
    x: number,
    z: number,
}

export namespace Point2 {
    export const make = (x: number, z: number): Point2 => ({ x, z });

    export function moveBy(point: Readonly<Point2>, vector: Readonly<Vector2>): Point2 {
        return moveByAssign({ ...point }, vector);
    }

    export function moveByAssign(point: Point2, vector: Readonly<Vector2>): Point2 {
        point.x += vector.x;
        point.z += vector.z;

        return point;
    }

    export function vectorBetween(to: Readonly<Point2>, from: Readonly<Point2>): Vector2 {
        return {
            x: to.x - from.x,
            z: to.z - from.z,
        };
    }

    export function asVector(point: Readonly<Point2>): Vector2 {
        return point;
    }

    export function intoVector(point: Readonly<Point2>): Vector2 {
        return { ...point };
    }

    export function transform(point: Readonly<Point2>, matrix: Readonly<Matrix>): Point2 {
        return transformAssign({ ...point }, matrix);
    }

    export function transformAssign(point: Point2, matrix: Readonly<Matrix>): Point2 {
        const { x, z } = point;

        point.x = x * matrix[0] + z * matrix[8]  + matrix[12];
        point.z = x * matrix[2] + z * matrix[10] + matrix[14];

        return point;
    }

    export function negate(point: Readonly<Point2>): Point2 {
        return negateAssign({ ...point });
    }

    export function negateAssign(point: Point2): Point2 {
        point.x *= -1;
        point.z *= -1;

        return point;
    }

    export function copyInto(lhs: Point2, rhs: Readonly<Point2>): Point2 {
        lhs.x = rhs.x;
        lhs.z = rhs.z;

        return lhs;
    }

    export const splat = (value: number) => make(value, value);
    export const positiveX = () => make(1.0, 0.0);
    export const negativeX = () => make(-1.0, 0.0);
    export const positiveZ = () => make(0.0, 1.0);
    export const negativeZ = () => make(0.0, -1.0);
}
