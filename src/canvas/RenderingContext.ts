import { Camera } from 'app/canvas/Camera';
import { AxisAlignedBoundingBox } from 'app/canvas/AxisAlignedBoundingBox';
import { Point } from 'app/canvas/Point';

export class RenderingContext {
    constructor(
        private context: CanvasRenderingContext2D,
        private camera: Camera,
    ) {}

    public clear(): void {
        const canvas = this.context.canvas;

        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    public getDimensions(): AxisAlignedBoundingBox {
        const canvas = this.context.canvas;

        const topLeft = this.camera.invert(new Point(0, 0, 0))
        const bottomRight = this.camera.invert(new Point(canvas.width, 0, canvas.height));

        return new AxisAlignedBoundingBox(topLeft, bottomRight);
    }

    public fitToScreen(): void {
        const canvas = this.context.canvas;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    public strokeLine(from: Point, to: Point): void {
        this.beginPath();
        this.moveTo(from);
        this.lineTo(to);
        this.closePath();
    }

    public setFillStyle(fillStyle: string): void {
        this.context.fillStyle = fillStyle;
    }

    public setStrokeStyle(strokeStyle: string): void {
        this.context.strokeStyle = strokeStyle;
    }

    public setLineWidth(lineWidth: number): void {
        this.context.lineWidth = lineWidth;
    }

    public beginPath(): void {
        this.context.beginPath();
    }

    public closePath(): void {
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }

    public lineTo(point: Point): void {
        point = this.camera.apply(point);

        this.context.lineTo(point.getX(), point.getZ());
    }

    public moveTo(point: Point): void {
        point = this.camera.apply(point);

        this.context.moveTo(point.getX(), point.getZ());
    }
}
