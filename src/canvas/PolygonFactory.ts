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
        console.log(unit);
        const { dimensions } = unit;

        const height = dimensions.getHeight();
        const width = dimensions.getWidth();
        const depth = dimensions.getDepth();

        const topLeft = new Point(0, height, depth);
        const topRight = new Point(width, height, depth);
        const bottomRight = new Point(width, height, 0);
        const bottomLeft = new Point(0, height, 0);

        return new Polygon(dimensions, [topLeft, topRight, bottomRight, bottomLeft]);
    }
}
