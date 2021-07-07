import { Point } from './Point';
import { Polygon } from './Polygon';

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

    public getSelectedPolygon(mousePosition: Point, polygon: Polygon): boolean {
        const polygonPoints = polygon.getPoints();

        return mousePosition.gte(polygonPoints[2]) && mousePosition.lte(polygonPoints[1]);
    }
}
