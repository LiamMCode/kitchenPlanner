import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Units } from 'app/canvas/PolygonFactory';

export class PolygonLayerPainter {
    constructor(
        private repository: PolygonRepository,
        private painter: PolygonPainter,
    ) {}

    public paint(): void {
        for (const polygon of this.repository.findAll()) {
            this.painter.paint(polygon, Units.A);
        }
    }
}
