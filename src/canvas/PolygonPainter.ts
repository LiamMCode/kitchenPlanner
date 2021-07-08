import { RenderingContext } from './RenderingContext';
import { Widget } from './Widget';

export class PolygonPainter {
    constructor(private context: RenderingContext) {}

    public paint(widgets: Widget[]): void {
        for (let i = 0; i < widgets.length; i++) {
            const { fillColour, borderColour } = widgets[i].getWidgetStyles();
            const polygon = widgets[i].getPolygon();

            this.context.setFillStyle(fillColour);
            this.context.setStrokeStyle(borderColour);

            this.context.setLineWidth(2);
            this.context.beginPath();
            this.context.moveTo(polygon.getStart());

            for (const point of polygon.getTail()) {
                this.context.lineTo(point);
            }

            this.context.closePath();
        }
    }
}
