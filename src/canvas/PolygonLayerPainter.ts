import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { PolygonRepository } from 'app/canvas/PolygonRepository';

export class PolygonLayerPainter {
    constructor(
        private repository: PolygonRepository,
        private painter: PolygonPainter,
    ) {}

    public paint(): void {
        for (const polygon of this.repository.findAll()) {
            this.painter.paint(polygon);
        }
    }
}
