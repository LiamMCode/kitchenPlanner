import { PolygonPainter } from './PolygonPainter';
import { PolygonRepository } from './PolygonRepository';

export class PolygonLayerPainter {
    private unit: string;

    constructor(private repository: PolygonRepository, private painter: PolygonPainter) {}

    public paint(): void {
        const polygons = this.repository.findAll();
        const fillColours = this.repository.findFillColours();
        const borderColour = this.repository.findBorderColours();
        this.painter.paint(polygons, fillColours, borderColour);
    }

    public setUnit(unitSize: string): void {
        this.unit = unitSize;
    }
}
