import { AxisAlignedBoundingBox } from './AxisAlignedBoundingBox';
import { Camera } from './Camera';
import { Dimensions } from './Dimensions';
import { Point } from './Point';
import { Polygon } from './Polygon';
import { WidgetStyle } from './UnitUtils';

export class Widget {
    private polygon: Polygon;
    private selected: boolean;

    constructor(
        private id: string,
        private dimensions: Dimensions,
        private widgetStyles: WidgetStyle,
    ) {
        const width = dimensions.getWidth();
        const depth = dimensions.getDepth();

        this.polygon = new Polygon(dimensions, [
            new Point(0, 0, depth),
            new Point(width, 0, depth),
            new Point(width, 0, 0),
            new Point(0, 0, 0),
        ]);
    }

    public getId(): string {
        return this.id;
    }

    public getDimensions(): Dimensions {
        return this.dimensions;
    }

    public getWidgetStyles(): WidgetStyle {
        return this.widgetStyles;
    }

    public getPolygon(): Polygon {
        return this.polygon;
    }

    public setSelected(value: boolean): void {
        this.selected = value;
    }

    public isSelected(): boolean {
        return this.selected;
    }

    public getBoundingBox(camera: Camera): AxisAlignedBoundingBox {
        const points = this.polygon.getPoints();

        const topLeft = camera.invert(points[3]);
        const bottomRight = camera.invert(points[1]);

        return new AxisAlignedBoundingBox(topLeft, bottomRight);
    }
}
