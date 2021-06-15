import { Matrix } from 'app/canvas/Matrix';
import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';

export class Polygon {
    constructor(private points: Point[]) {}

    public translate(vector: Vector): Polygon {
        return new Polygon(
            this.points.map((point) => point.translate(vector)),
        );
    }

    public transform(matrix: Matrix): Polygon {
        return new Polygon(
            this.points.map((point) => matrix.applyToPoint(point)),
        );
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public getStart(): Point {
        return this.points[0];
    }

    public getTail(): Point[] {
        return this.points.slice(1);
    }
}
