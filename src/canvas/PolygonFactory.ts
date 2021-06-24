import { Dimensions } from './Dimensions';
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
    DecorSizeC = 'DecorSizeC',
    DecorSizeD = 'DecorSizeD',
    DecorSizeE = 'DecorSizeE',
    DecorSizeF = 'DecorSizeF',
    WorktopSizeA = 'WorktopSizeA',
    WorktopSizeB = 'WorktopSizeB',
}

export class PolygonFactory {
    public createRectangle(dimensions: Dimensions, unit: UnitSize): Polygon {
        const width = dimensions.getWidth(dimensions);
        const depth = dimensions.getDepth(dimensions);

        const topLeft = new Point(0, 0, depth);
        const topRight = new Point(width, 0, depth);
        const bottomRight = new Point(width, 0, 0);
        const bottomLeft = new Point(0, 0, 0);

        return new Polygon(dimensions, [topLeft, topRight, bottomRight, bottomLeft]);
    }
}
