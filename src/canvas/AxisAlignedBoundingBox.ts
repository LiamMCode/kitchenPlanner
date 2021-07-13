import { Point } from './Point';
import { Widget } from './Widget';

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

    public getSelectedPolygon(
        mousePosition: Point,
        widget: Widget,
        pointsWithin: number[],
    ): boolean {
        const polygonPoints = widget.getPolygon().getPoints();
        return (
            mousePosition.gte(polygonPoints[pointsWithin[0]])
            && mousePosition.lte(polygonPoints[pointsWithin[1]])
        );
    }
}
