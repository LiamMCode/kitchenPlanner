import { Widget } from 'canvas/Widget';
import { Camera } from './Camera';
import { Point } from './Point';
import { WidgetRepository } from './WidgetRepository';
import { Matrix } from './Matrix';

export class MouseEventRouter {
    private lastSelectedWidget: Widget | undefined;
    private oldMousePosition: Point;
    private pointsWithin: number[];

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
            if (event.key === 'r') {
                this.onRotate(45);
            }
            if (event.key === 't') {
                this.onRotate(-45);
            }
        });
    }

    public onMouseDown(position: Point): void {
        const allWidgets = this.WidgetRepository.getWidgets();
        let polygonRotation: number;

        allWidgets.forEach((widget) => {
            const boundingBox = widget.getBoundingBox(this.camera);
            polygonRotation = widget.getPolygon().getRotation();

            if (polygonRotation === 360 || polygonRotation === -360) {
                widget.getPolygon().resetRotation();
                polygonRotation = 0;
            }

            if (polygonRotation < 360 && polygonRotation > -360) {
                this.pointsWithin = this.calculateMinMax(polygonRotation);
                widget.setSelected(
                    boundingBox.getSelectedPolygon(position, widget, this.pointsWithin),
                );
            }
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

            this.lastSelectedWidget.getPolygon().setRotation(rotation);

            const translation = newWidgetPosition.translate(
                this.lastSelectedWidget
                    .getPolygon()
                    .getCentre()
                    .toVector()
                    .subtract(newWidgetPosition.getCentre().toVector()),
            );
            this.lastSelectedWidget.getPolygon().setPoints(translation.getPoints());
        }
    }

    public calculateMinMax(polygonRotation: number): number[] {
        switch (polygonRotation) {
            case 90:
            case -270:
            case 315:
            case -45: {
                return [0, 2];
            }
            case 135:
            case -225: {
                // can't move
                return [3, 2];
            }
            case 180:
            case -180:
            case 225:
            case -135: {
                // cant move 225 -135
                return [1, 3];
            }
            case 270:
            case -90: {
                return [2, 0];
            }
            default:
                return [3, 1];
        }
    }
}
