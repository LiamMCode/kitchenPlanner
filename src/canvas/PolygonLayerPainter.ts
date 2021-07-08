import { PolygonPainter } from './PolygonPainter';
import { PolygonRepository } from './PolygonRepository';

export class PolygonLayerPainter {
    constructor(private repository: PolygonRepository, private painter: PolygonPainter) {}

    public paint(): void {
        this.painter.paint(this.repository.findAll());
    }
}
