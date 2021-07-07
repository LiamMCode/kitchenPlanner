import { dataStuff } from '../../axios/UnitsRepositoryService';
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
    public createRectangle(unit: dataStuff): Polygon {
        console.log(unit);
        const { dimensions } = unit;
        console.log(dimensions);

        const width = dimensions.getWidth();
        const height = dimensions.getHeight();
        const depth = dimensions.getDepth();

        const topLeft = new Point(0, height, depth);
        const topRight = new Point(width, height, depth);
        const bottomRight = new Point(width, height, 0);
        const bottomLeft = new Point(0, height, 0);

        return new Polygon(unit.dimensions, [topLeft, topRight, bottomRight, bottomLeft]);
    }
}
