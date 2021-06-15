import { Point } from 'app/canvas/Point';

export class Vector {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly z: number,
    ) {}

    public static zero(): Vector {
        return new Vector(0, 0, 0);
    }

    public add(vector: Vector): Vector {
        return new Vector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z,
        );
    }

    public subtract(vector: Vector): Vector {
        return new Vector(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z,
        );
    }

    public hadamard(vector: Vector): Vector {
        return new Vector(
            this.x * vector.x,
            this.y * vector.y,
            this.z * vector.z,
        );
    }

    public rightPerpendicularXZ(): Vector {
        return new Vector(
            this.z,
            this.y,
            -this.x,
        );
    }

    public leftPerpendicularXZ(): Vector {
        return new Vector(
            -this.z,
            this.y,
            this.x,
        );
    }

    public negate(): Vector {
        return new Vector(-this.x, -this.y, -this.z);
    }

    public normalize(): Vector {
        return this.divide(this.length());
    }

    public divide(divisor: number): Vector {
        if (divisor === 0) {
            throw 'Cannot divide vector by zero';
        }

        return new Vector(
            this.x / divisor,
            this.y / divisor,
            this.z / divisor,
        );
    }

    public scale(factor: number): Vector {
        return new Vector(
            this.x * factor,
            this.y * factor,
            this.z * factor,
        );
    }

    public scaleToLength(length: number): Vector {
        return this.divide(this.length()).scale(length);
    }

    public length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    public lengthSquared(): number {
        return this.dot(this);
    }

    public dot(vector: Vector): number {
        return this.x * vector.x
            + this.y * vector.y
            + this.z * vector.z;
    }

    public cross(vector: Vector): Vector {
        return new Vector(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x,
        );
    }

    public movePoint(point: Point): Point {
        return new Point(
            this.x + point.getX(),
            this.y + point.getY(),
            this.z + point.getZ(),
        );
    }

    public toPoint(): Point {
        return new Point(this.x, this.y, this.z);
    }

    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}, z: ${this.z}}`;
    }
}
