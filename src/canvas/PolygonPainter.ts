import { Polygon } from 'app/canvas/Polygon';
import { RenderingContext } from 'app/canvas/RenderingContext';
import { pick } from './UnitUtils';
import { Units } from 'app/canvas/PolygonFactory';

export class PolygonPainter {
    constructor(private context: RenderingContext) {}

    public paint(polygon: Polygon, unit: Units): void {
        this.context.setFillStyle(pick(unit).fillColour);
        this.context.setStrokeStyle(pick(unit).borderColour);
        this.context.setLineWidth(2);
        this.context.beginPath();
        this.context.moveTo(polygon.getStart());

        for (const point of polygon.getTail()) {
            this.context.lineTo(point);
        }

        this.context.closePath();
    }
}

