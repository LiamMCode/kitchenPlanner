import { Point } from './Point';
import { Polygon } from './Polygon';
import { UnitStyle } from './UnitUtils';

export enum UnitSize {
    WallSizeA = 'WallSizeA',
    WallSizeB = 'WallSizeB',
    BaseSizeA = 'BaseSizeA',
    BaseSizeB = 'BaseSizeB',
    TowerSizeA = 'TowerSizeA',
    TowerSizeB = 'TowerSizeB',
    DecorSizeA = 'DecorSizeA',
    DecorSizeB = 'DecorSizeB',
    WorktopSizeA = 'WorktopSizeA',
    WorktopSizeB = 'WorktopSizeB',
}

export class PolygonFactory {
    public createRectangle(unit: UnitStyle): Polygon {
        const width = unit.dimensions.getWidth();
        const depth = unit.dimensions.getDepth();

        const topLeft = new Point(0, 0, depth);
        const topRight = new Point(width, 0, depth);
        const bottomRight = new Point(width, 0, 0);
        const bottomLeft = new Point(0, 0, 0);

        return new Polygon(unit.dimensions, [
            topLeft,
            topRight,
            bottomRight,
            bottomLeft,
        ]);
    }
}
