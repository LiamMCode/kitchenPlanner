import { Dimensions } from './Dimensions';
import { Point } from './Point';
import { WidgetStyle } from './UnitUtils';
import { Widget } from './Widget';
import { sendData } from '../../axios/APIDataHandler';

export enum UnitSize {
    WallSizeA = 'WallSizeA',
    WallSizeB = 'WallSizeB',
    BaseSizeA = 'BaseSizeA',
    BaseSizeB = 'BaseSizeB',
    TowerSizeA = 'TowerSizeA',
    TowerSizeB = 'TowerSizeB',
    DecorSizeA = 'DecorSizeA',
    DecorSizeB = 'DecorSizeB',
    WorktopSizeA = 'WorktopSizeA',
    WorktopSizeB = 'WorktopSizeB',
}

interface DataToSend {
    widgetDimensions: Dimensions;
    widgetStyle: WidgetStyle;
    widgetPosition: Point[];
    widgetType: string;
}

export class WidgetRepository {
    private widgets: Widget[] = [];

    public getWidgets(): Widget[] {
        return this.widgets;
    }

    public add(widget: Widget): void {
        this.widgets.push(widget);
    }

    public deletePolygon(id: string): void {
        this.widgets = this.widgets.filter((widget) => widget.getId() !== id);
    }

    public getSelectedWidget(): Widget {
        return this.widgets.find((widget) => widget.isSelected());
    }

    public deleteAll(): void {
        this.widgets = [];
    }

    public saveAndSerialise(name: string, email: string): void {
        const widgetsOnPlan: DataToSend[] = this.widgets.map((widget) => {
            return {
                widgetType: widget.getType(),
                widgetStyle: widget.getWidgetStyles(),
                widgetDimensions: widget.getDimensions(),
                widgetPosition: widget.getPolygon().getPoints(),
            };
        });

        const jsonSavedPlan: string = JSON.stringify(widgetsOnPlan);
        const jsonEmail: string = JSON.stringify(email);
        const jsonPlanName: string = JSON.stringify(name);
        const fileName: string = jsonPlanName + '.json';

        const url: string = 'https://symfony-sandbox.dev.wrenkitchens.com/saved-plans/add';
        sendData(fileName, jsonEmail, jsonSavedPlan, url);
    }
}
