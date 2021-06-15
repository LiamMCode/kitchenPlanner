import { Dimensions } from 'app/canvas/Dimensions';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export enum Units {
    A = 'a',
    B = 'b',
    C = 'c',
    D = 'd',
}

export class PolygonFactory {
    public createRectangle(dimensions: Dimensions, unit: Units): Polygon {
        const width = dimensions.getWidth(unit);
        const depth = dimensions.getDepth(unit);

        const topLeft = new Point(0, 0, depth);
        const topRight = new Point(width, 0, depth);
        const bottomRight = new Point(width, 0, 0);
        const bottomLeft = new Point(0, 0, 0);

        return new Polygon([topLeft, topRight, bottomRight, bottomLeft]);
    }
}
