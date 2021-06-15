import { FuzzyMath } from 'app/canvas/FuzzyMath';
import { Vector } from 'app/canvas/Vector';

export class Point {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly z: number,
    ) {}

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getZ(): number {
        return this.z;
    }

    public translate(vector: Vector): Point {
        return this.toVector().add(vector).toPoint();
    }

    public scale(factor: number): Point {
        return new Point(this.x * factor, this.y * factor, this.z * factor);
    }

    public distance(point: Point): number {
        return Math.hypot(
            point.x - this.x,
            point.y - this.y,
            point.z - this.z,
        );
    }

    public gte(point: Point): boolean {
        return this.x >= point.x
            && this.y >= point.y
            && this.z >= point.z;
    }

    public lte(point: Point): boolean {
        return this.x <= point.x
            && this.y <= point.y
            && this.z <= point.z;
    }

    public vectorTo(point: Point): Vector {
        return new Vector(
            point.x - this.x,
            point.y - this.y,
            point.z - this.z,
        );
    }

    public relativeTo(point: Point): Point {
        return new Point(
            this.x - point.x,
            this.y - point.y,
            this.z - point.z,
        );
    }

    public midpointTo(point: Point): Point {
        return this.vectorTo(point)
            .divide(2)
            .movePoint(this);
    }

    public equals(point: Point): boolean {
        return FuzzyMath.eq(this.getX(), point.getX())
            && FuzzyMath.eq(this.getY(), point.getY())
            && FuzzyMath.eq(this.getZ(), point.getZ());
    }

    public toVector(): Vector {
        return new Vector(this.x, this.y, this.z);
    }

    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}, z: ${this.z}}`;
    }
}
