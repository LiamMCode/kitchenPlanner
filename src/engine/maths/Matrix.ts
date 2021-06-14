import { Dimensions } from '~/engine/maths/Dimensions';
import { Point2 } from '~/engine/maths/Point2';
import { Point3 } from '~/engine/maths/Point3';
import { Vector3 } from '~/engine/maths/Vector3';

export type Matrix = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
];

const MATRIX_WIDTH = 4;
const MATRIX_SIZE = MATRIX_WIDTH * MATRIX_WIDTH;

export namespace Matrix {
    export function copyInto(destination: Matrix, source: Readonly<Matrix>): void {
        for (let i = 0; i < MATRIX_SIZE; i += 1) {
            destination[i] = source[i];
        }
    }

    export function multiply(lhs: Readonly<Matrix>, rhs: Readonly<Matrix>): Matrix {
        return multiplyAssign([...lhs], rhs);
    }

    export function multiplyAssign(lhs: Matrix, rhs: Readonly<Matrix>): Matrix {
        for (let j = 0; j < MATRIX_WIDTH; j += 1) {
            const j0  = lhs[j + 0];
            const j4  = lhs[j + 4];
            const j8  = lhs[j + 8];
            const j12 = lhs[j + 12];

            for (let i = 0; i < MATRIX_SIZE; i += 4) {
                lhs[i + j] = rhs[i + 0] * j0
                           + rhs[i + 1] * j4
                           + rhs[i + 2] * j8
                           + rhs[i + 3] * j12;
            }
        }

        return lhs;
    }

    export const identity = (): Matrix => [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];

    export const translation = (x: number, y: number, z: number): Matrix => [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x  , y  , z  , 1.0,
    ];

    export const rotationX = (x: number): Matrix => {
        const cx = Math.cos(x);
        const sx = Math.sin(x);

        return [
            1.0, 0.0, 0.0, 0.0,
            0.0, cx , sx , 0.0,
            0.0, -sx, cx , 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];
    };

    export const rotationY = (y: number): Matrix => {
        const cy = Math.cos(y);
        const sy = Math.sin(y);

        return [
            cy , 0.0, -sy, 0.0,
            0.0, 1.0, 0.0, 0.0,
            sy , 0.0, cy , 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];
    };

    export const rotationZ = (z: number): Matrix => {
        const cz = Math.cos(z);
        const sz = Math.sin(z);

        return [
            cz , sz , 0.0, 0.0,
            -sz, cz , 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];
    };

    export const scale = (x: number, y: number, z: number): Matrix => [
        x  , 0.0, 0.0, 0.0,
        0.0, y  , 0.0, 0.0,
        0.0, 0.0, z  , 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];

    export const transformation = (position: Readonly<Point3>, rotation: number, scale: Readonly<Dimensions>) =>
        multiplyAssign(
            multiplyAssign(
                Matrix.translation(position.x, position.y, position.z),
                Matrix.rotationY(rotation),
            ),
            Matrix.scale(scale.width, scale.height, scale.depth)
        );

    export const view = (
        right   : Readonly<Vector3>,
        up      : Readonly<Vector3>,
        forward : Readonly<Vector3>,
        position: Readonly<Point2>,
    ): Matrix => [
        right   .x, right  .y, right   .z, 0.0,
        up      .x, up     .y, up      .z, 0.0,
        forward .x, forward.y, forward .z, 0.0,
        position.x, 0.0      , position.z, 1.0,
    ];
}
