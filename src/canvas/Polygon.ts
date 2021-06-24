import { AxisAlignedBoundingBox } from './AxisAlignedBoundingBox';
import { Dimensions } from './Dimensions';
import { Camera } from './Camera';
import { Matrix } from './Matrix';
import { Point } from './Point';
import { Vector } from './Vector';

export class Polygon {
    private selected = false;

    constructor(private dimensions: Dimensions, private points: Point[]) {}

    polygonInBounds: Polygon;

    public isMoving = false;

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

    public getBoundingBox(camera: Camera): AxisAlignedBoundingBox {
        const topLeft = camera.invert(this.points[3]);
        const bottomRight = camera.invert(this.points[1]);

        return new AxisAlignedBoundingBox(topLeft, bottomRight);
    }

    public getDimensions(): Dimensions {
        return this.dimensions;
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

    public setSelected(value: boolean): void {
        this.selected = value;
    }

    public isSelected(): boolean {
        return this.selected;
    }
}
