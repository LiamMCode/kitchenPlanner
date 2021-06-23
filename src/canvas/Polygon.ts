import Matrix from './Matrix';
import Point from './Point';
import Vector from './Vector';

export default class Polygon {
    constructor(private points: Point[]) {}

    public translate(vector: Vector): Polygon {
        return new Polygon(this.points.map((point) => point.translate(vector)));
    }

    public transform(matrix: Matrix): Polygon {
        return new Polygon(
            this.points.map((point) => matrix.applyToPoint(point))
        );
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public getCentre(): Point {
        const points = this.getPoints();
        return points[0].midpointTo(points[2]);
    }

    public getStart(): Point {
        return this.points[0];
    }

    public getTail(): Point[] {
        return this.points.slice(1);
    }
}
