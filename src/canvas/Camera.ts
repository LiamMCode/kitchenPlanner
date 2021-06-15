import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';

export class Camera {
    private pan = Vector.zero();
    private zoom = 1;

    public apply(point: Point): Point {
        return this.pan.movePoint(point).scale(1 / this.zoom);
    }

    public invert(point: Point): Point {
        return this.pan.negate().movePoint(point.scale(this.zoom));
    }

    public findMouseEvent(event: MouseEvent): Point {
        return this.invert(new Point(event.offsetX, 0, event.offsetY));
    }
}
