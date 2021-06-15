import { Dimensions } from 'app/canvas/Dimensions';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export class PolygonFactory {
    public createRectangle(dimensions: Dimensions): Polygon {
        const width = dimensions.getWidth();
        const depth = dimensions.getDepth();

        const topLeft = new Point(0, 0, depth);
        const topRight = new Point(width, 0, depth);
        const bottomRight = new Point(width, 0, 0);
        const bottomLeft = new Point(0, 0, 0);

        return new Polygon([topLeft, topRight, bottomRight, bottomLeft]);
    }
}
