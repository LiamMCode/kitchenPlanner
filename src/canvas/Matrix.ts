import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';

export class Matrix {
    private constructor(private rows: number[][]) {}

    public static rotateXZ(angle: number): Matrix {
        return new Matrix([
            [Math.cos(angle), 0, -Math.sin(angle)],
            [0, 1, 0],
            [Math.sin(angle), 0, Math.cos(angle)],
        ]);
    }

    public applyToVector(vector: Vector): Vector {
        return this.applyToPoint(vector.toPoint()).toVector();
    }

    public applyToPoint(point: Point): Point {
        const vector = [point.getX(), point.getY(), point.getZ()];
        const result = [];

        for (let i = 0; i < 3; i++) {
            let sumProduct = 0;

            for (let j = 0; j < 3; j++) {
                sumProduct += this.rows[i][j] * vector[j];
            }

            result.push(sumProduct);
        }

        return new Point(result[0], result[1], result[2]);
    }
}
