import Polygon from './Polygon';
import RenderingContext from './RenderingContext';

export default class PolygonPainter {
    constructor(private context: RenderingContext) {}

    public paint(
        polygon: Polygon[],
        polygonFillColours: string[],
        polygonBorderColours: string[]
    ): void {
        for (let i = 0; i < polygon.length; i++) {
            this.context.setFillStyle(polygonFillColours[i]);
            this.context.setStrokeStyle(polygonBorderColours[i]);

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
