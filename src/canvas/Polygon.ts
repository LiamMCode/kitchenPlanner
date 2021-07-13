import { Dimensions } from './Dimensions';
import { Matrix } from './Matrix';
import { Point } from './Point';
import { Vector } from './Vector';

export class Polygon {
    private rotation: number = 0;

    constructor(private dimensions: Dimensions, private points: Point[]) {}

    public translate(vector: Vector): Polygon {
        return new Polygon(
            this.dimensions,
            this.points.map((point) => point.translate(vector)),
        );
    }

    public transform(matrix: Matrix): Polygon {
        return new Polygon(
            this.dimensions,
            this.points.map((point) => matrix.applyToPoint(point)),
        );
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public setPoints(points: Point[]): void {
        this.points = points;
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

    public resetRotation(): void {
        this.rotation = 0;
    }

    public setRotation(rotation: number): void {
        this.rotation += rotation;
    }

    public getRotation(): number {
        return this.rotation;
    }
}
