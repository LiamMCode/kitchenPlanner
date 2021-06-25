import { Camera } from './Camera';
import { Point } from './Point';
import { Polygon } from './Polygon';
import { PolygonRepository } from './PolygonRepository';

export class MouseEventRouter {
    private lastSelectedPolygon: Polygon | undefined;
    private deleteUnitButton: HTMLElement = document.getElementById('deleteUnit');

    constructor(private camera: Camera, private polygonRepository: PolygonRepository) {}

    public register(target: EventTarget): void {
        target.addEventListener('mousedown', (event: MouseEvent) => {
            this.onMouseDown(this.camera.findMouseEvent(event));
        });

        target.addEventListener('mousemove', (event: MouseEvent) => {
            this.onMouseMove(this.camera.findMouseEvent(event));
        });

        target.addEventListener('mouseup', (event: MouseEvent) => {
            this.onMouseUp();
        });

        target.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Delete') {
                this.onDeleteEvent();
            }
        });
        this.deleteUnitButton.addEventListener('click', () => {
            this.onDeleteEvent();
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

    public onMouseUp(): void {
        const selectedPolygon = this.polygonRepository.getSelectedPolygon();
        if (selectedPolygon) {
            this.lastSelectedPolygon = selectedPolygon;
            this.polygonRepository.findAll().forEach((polygon) => polygon.setSelected(false));
        }
    }
    public onDeleteEvent() {
        if (this.lastSelectedPolygon) {
            this.polygonRepository.deletePolygon(this.lastSelectedPolygon);
            this.lastSelectedPolygon = undefined;
        }
    }
}
