import { WidgetUnitData } from '../../axios/UnitsRepositoryService';
import { Point } from './Point';
import { Polygon } from './Polygon';

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
    public createRectangle(unit: WidgetUnitData): Polygon {
        const { dimensions } = unit;

        const width = dimensions.getWidth();
        const depth = dimensions.getDepth();

        const topLeft = new Point(0, 0, depth);
        const topRight = new Point(width, 0, depth);
        const bottomRight = new Point(width, 0, 0);
        const bottomLeft = new Point(0, 0, 0);

        return new Polygon(dimensions, [topLeft, topRight, bottomRight, bottomLeft]);
    }
}
