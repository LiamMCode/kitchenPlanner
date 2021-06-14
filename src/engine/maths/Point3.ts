import { Matrix } from '~/engine/maths/Matrix';
import { Vector3 } from '~/engine/maths/Vector3';

export interface Point3 {
    x: number,
    y: number,
    z: number,
}

export namespace Point3 {
    export const make = (x: number, y: number, z: number): Point3 => ({ x, y, z });

    export function moveBy(point: Readonly<Point3>, vector: Readonly<Vector3>): Point3 {
        return moveByAssign({ ...point }, vector);
    }

    export function moveByAssign(point: Point3, vector: Readonly<Vector3>): Point3 {
        point.x += vector.x;
        point.y += vector.y;
        point.z += vector.z;

        return point;
    }

    export function vectorBetween(to: Readonly<Point3>, from: Readonly<Point3>): Vector3 {
        return {
            x: to.x - from.x,
            y: to.y - from.y,
            z: to.z - from.z,
        };
    }

    export function asVector3(point: Point3): Vector3 {
        return point;
    }

    export function intoVector3(point: Point3): Vector3 {
        return { ...point };
    }

    export function transform(point: Readonly<Point3>, matrix: Readonly<Matrix>): Point3 {
        return transformAssign({ ...point }, matrix);
    }

    export function transformAssign(point: Point3, matrix: Readonly<Matrix>): Point3 {
        const { x, y, z } = point;

        point.x = x * matrix[0] + y * matrix[4] + z * matrix[8]  + matrix[12];
        point.y = x * matrix[1] + y * matrix[5] + z * matrix[9]  + matrix[13];
        point.z = x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14];

        return point;
    }

    export function negate(point: Readonly<Point3>): Point3 {
        return negateAssign({ ...point });
    }

    export function negateAssign(point: Point3): Point3 {
        point.x *= -1;
        point.y *= -1;
        point.z *= -1;

        return point;
    }

    export function copyInto(lhs: Point3, rhs: Readonly<Point3>): Point3 {
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
