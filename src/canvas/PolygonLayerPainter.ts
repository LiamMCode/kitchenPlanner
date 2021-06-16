import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { UnitSize } from 'app/canvas/PolygonFactory';

export class PolygonLayerPainter {
    constructor(
        private repository: PolygonRepository,
        private painter: PolygonPainter,
    ) {}

    public paint(): void {
        const enums: UnitSize[] = [];
        for (let units in UnitSize) {
            enums.push(units as UnitSize);
        }
        // let i = 0;
        // for (const polygon of this.repository.findAll()) {
        //     this.painter.paint(polygon, enums[i]);
        //     i++;
        // }

        const polygons = this.repository.findAll();
        
        for (let i = 0; i < polygons.length; i++) {
            this.painter.paint(polygons[i], enums[i]);
        }
    }
}
