import { PolygonPainter } from './PolygonPainter';
import { PolygonRepository } from './PolygonRepository';
import { UnitSize } from './PolygonFactory';

export class PolygonLayerPainter {
    private unit: UnitSize;

    constructor(private repository: PolygonRepository, private painter: PolygonPainter) {}

    public paint(): void {
        const polygons = this.repository.findAll();
        const fillColours = this.repository.findFillColours();
        const borderColour = this.repository.findBorderColours();
        this.painter.paint(polygons, fillColours, borderColour);
    }

    public setUnit(unitSize: UnitSize): void {
        this.unit = unitSize;
    }
}
