import { PolygonPainter } from './PolygonPainter';
import { WidgetRepository } from './WidgetRepository';

export class PolygonLayerPainter {
    constructor(private repository: WidgetRepository, private painter: PolygonPainter) {}

    public paint(): void {
        this.painter.paint(this.repository.getWidgets());
    }
}
