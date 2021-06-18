import { Polygon } from './Polygon';
import { RenderingContext } from './RenderingContext';
import { UnitSize } from './PolygonFactory';
import { getUnit } from './UnitsMap';

export class PolygonPainter {
    constructor(private context: RenderingContext) {}

    public paint(polygon: Polygon[], unit: UnitSize): void {
        for (let i = 0; i < polygon.length; i++) {
            const { fillColour, borderColour } = getUnit(unit);
            this.context.setFillStyle(fillColour);
            this.context.setStrokeStyle(borderColour);

            this.context.setLineWidth(2);
            this.context.beginPath();
            this.context.moveTo(polygon[i].getStart());

            for (const point of polygon[i].getTail()) {
                this.context.lineTo(point);
            }
            this.context.closePath();
        }
    }
}
