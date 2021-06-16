import { PolygonPainter } from './PolygonPainter';
import { PolygonRepository } from './PolygonRepository';
import { UnitSize } from './PolygonFactory';

export class PolygonLayerPainter {
  constructor(
                private repository: PolygonRepository,
                private painter: PolygonPainter,
  ) {}

  public paint(): void {
    const enums: UnitSize[] = [];
    for (const units in UnitSize) {
      enums.push(units as UnitSize);
    }

    const polygons = this.repository.findAll();

    for (let i = 0; i < polygons.length; i++) {
      this.painter.paint(polygons[i], enums[i]);
    }
  }
}
