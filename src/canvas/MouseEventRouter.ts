import { Camera } from './Camera';
import { Point } from './Point';
import { Polygon } from './Polygon';
import { PolygonRepository } from './PolygonRepository';
import { Vector } from './Vector';

export class MouseEventRouter {
    private oldPosition: Point;

    constructor(private camera: Camera, private polygonRepository: PolygonRepository) {}

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
        const allPolygons = this.polygonRepository.findAll();

        allPolygons.forEach((polygon) => {
            const boundingBox = polygon.getBoundingBox(this.camera);

            polygon.setSelected(boundingBox.getSelectedPolygon(position, polygon));
        });
    }

    public onMouseMove(position: Point): void {
        const selectedPolygon = this.polygonRepository.getSelectedPolygon();

        if (selectedPolygon) {
            const mouseToPolygon = position
                .toVector()
                .subtract(selectedPolygon.getCentre().toVector());
            const translation = selectedPolygon.translate(mouseToPolygon);

            selectedPolygon.setPoints(translation.getPoints());
        }
    }

    public onMouseUp(position: Point): void {
        this.polygonRepository.findAll().forEach((polygon) => polygon.setSelected(false));
    }
}
