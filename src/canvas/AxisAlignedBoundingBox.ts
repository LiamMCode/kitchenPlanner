import { Point } from 'app/canvas/Point';

export class AxisAlignedBoundingBox {
    constructor(private min: Point, private max: Point) {}

    public getLeft(): number {
        return this.min.getX();
    }

    public getRight(): number {
        return this.max.getX();
    }

    public getTop(): number {
        return this.min.getZ();
    }

    public getBottom(): number {
        return this.max.getZ();
    }
}
