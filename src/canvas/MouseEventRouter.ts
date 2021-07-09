import { Camera } from './Camera';
import { Point } from './Point';
import { WidgetRepository } from './WidgetRepository';
import { Widget } from './Widget';
import { Matrix } from './Matrix';

export class MouseEventRouter {
    private lastSelectedWidget: Widget | undefined;
    private oldMousePosition: Point;

    constructor(private camera: Camera, private WidgetRepository: WidgetRepository) {}

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
        const allWidgets = this.WidgetRepository.getWidgets();

        allWidgets.forEach((widget) => {
            const boundingBox = widget.getBoundingBox(this.camera);
            widget.setSelected(boundingBox.getSelectedPolygon(position, widget));
        });
    }

    public onMouseMove(position: Point): void {
        const selectedWidget = this.WidgetRepository.getSelectedWidget();

        if (selectedWidget) {
            const mousePositionDifference = position
                .toVector()
                .subtract(this.oldMousePosition.toVector());

            const polygon = selectedWidget.getPolygon();
            const translation = polygon.translate(mousePositionDifference);
            polygon.setPoints(translation.getPoints());
            this.lastSelectedWidget = selectedWidget;
        }
        this.oldMousePosition = position;
    }

    public onMouseUp(): void {
        this.WidgetRepository.getWidgets().forEach((polygon) => polygon.setSelected(false));
    }

    public onDeleteEvent(): void {
        if (this.lastSelectedWidget) {
            this.WidgetRepository.deletePolygon(this.lastSelectedWidget.getId());
            this.lastSelectedWidget = undefined;
        }
    }
    public onRotate(rotation: number): void {
        if (this.lastSelectedWidget) {
            const radian = (Math.PI * rotation) / 180.0;
            const newWidgetPosition = this.lastSelectedWidget
                .getPolygon()
                .transform(Matrix.rotateXZ(radian));

            const translation = newWidgetPosition.translate(
                this.lastSelectedWidget
                    .getPolygon()
                    .getCentre()
                    .toVector()
                    .subtract(newWidgetPosition.getCentre().toVector()),
            );
            console.log(this.lastSelectedWidget.getPolygon().getPoints());
            this.lastSelectedWidget.getPolygon().setPoints(translation.getPoints());
            console.log(this.lastSelectedWidget.getBoundingBox(this.camera));
        }
    }
}
