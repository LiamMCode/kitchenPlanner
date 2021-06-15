import { Point } from 'app/canvas/Point';
import { RenderingContext } from 'app/canvas/RenderingContext';

const MINOR_INTERVAL = 20;
const MAJOR_INTERVAL = 200;

export class GridLayerPainter {
    constructor(private context: RenderingContext) {}

    public paint(): void {
        this.context.setStrokeStyle('#EEE');
        this.strokeInterval(MINOR_INTERVAL);
        this.context.setStrokeStyle('#CCC');
        this.strokeInterval(MAJOR_INTERVAL);
    }

    private strokeInterval(interval: number) {
        const box = this.context.getDimensions();

        const left = Math.floor(box.getLeft() / interval) * interval;
        const right = box.getRight();

        const top = Math.floor(box.getTop() / interval) * interval;
        const bottom = box.getBottom();

        for (let x = left; x < right; x += interval) {
            this.strokeVertical(top, bottom, x);

            for (let z = top; z < bottom; z+= interval) {
                this.strokeHorizontal(left, right, z);
            }
        }
    }

    private strokeVertical(top: number, bottom: number, x: number): void {
        this.context.strokeLine(
            new Point(x, 0, top),
            new Point(x, 0, bottom),
        );
    }

    private strokeHorizontal(left: number, right: number, z: number): void {
        this.context.strokeLine(
            new Point(left, 0, z),
            new Point(right, 0, z),
        );
    }
}
