import { Camera } from 'app/canvas/Camera';
import { Point } from 'app/canvas/Point';

export class MouseEventRouter {
    constructor(private camera: Camera) {}

    public register(target: EventTarget): void {
        target.addEventListener('mousedown', (event: MouseEvent) => {
            this.onMouseDown(this.camera.findMouseEvent(event));
        });

        target.addEventListener('mousemove', (event: MouseEvent) => {
            this.onMouseMove(this.camera.findMouseEvent(event));
        });

        target.addEventListener('mouseup', (event: MouseEvent) => {
            this.onMouseUp(this.camera.findMouseEvent(event));
        });
    }

    public onMouseDown(position: Point): void {
        console.debug(position);
    }

    public onMouseMove(position: Point): void {
        console.debug(position);
    }

    public onMouseUp(position: Point): void {
        console.debug(position);
    }
}
