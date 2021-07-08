import { Camera } from './Camera';
import { Point } from './Point';
import { PolygonRepository } from './PolygonRepository';
import { Widget } from './Widget';

export class MouseEventRouter {
    private lastselectedWidget: Widget | undefined;
    private oldMousePosition: Point;

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
    }

    public onMouseDown(position: Point): void {
        const allWidgets = this.polygonRepository.findAll();

        allWidgets.forEach((widget) => {
            const boundingBox = widget.getBoundingBox(this.camera);
            widget.setSelected(boundingBox.getSelectedPolygon(position, widget));
        });
    }

    public onMouseMove(position: Point): void {
        const selectedWidget = this.polygonRepository.getSelectedPolygon();

        if (selectedWidget) {
            const mousePositionDifference = position
                .toVector()
                .subtract(this.oldMousePosition.toVector());

            const polygon = selectedWidget.getPolygon();
            const translation = polygon.translate(mousePositionDifference);
            polygon.setPoints(translation.getPoints());
            this.lastselectedWidget = selectedWidget;
        }
        this.oldMousePosition = position;
    }

    public onMouseUp(): void {
        this.polygonRepository.findAll().forEach((polygon) => polygon.setSelected(false));
    }

    public onDeleteEvent(): void {
        if (this.lastselectedWidget) {
            this.polygonRepository.deletePolygon(this.lastselectedWidget.getId());
            this.lastselectedWidget = undefined;
        }
    }
}
