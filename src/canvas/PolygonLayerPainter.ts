import { PolygonPainter } from './PolygonPainter';
import { PolygonRepository } from './PolygonRepository';
import { UnitSize } from './PolygonFactory';

export class PolygonLayerPainter {
    private unit: UnitSize;

    constructor(
        private repository: PolygonRepository,
        private painter: PolygonPainter
    ) {}

    public paint(): void {
        const polygons = this.repository.findAll();
        // for (let i = 0; i < polygons.length; i++) {
        this.painter.paint(polygons, this.unit);
        // }
    }

    public setUnit(unitSize: UnitSize): void {
        this.unit = unitSize;
    }
}
