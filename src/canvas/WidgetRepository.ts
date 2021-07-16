import { Dimensions } from './Dimensions';
import { Point } from './Point';
import { WidgetStyle } from './BackUpUnits';
import { Widget } from './Widget';
import { sendData } from '../../axios/APIDataHandler';

interface DataToSend {
    widgetDimensions: Dimensions;
    widgetStyle: WidgetStyle;
    widgetPosition: Point[];
    widgetType: string;
    widgetName: string;
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
        const widgetsOnPlan: DataToSend[] = this.widgets.map((widget) => ({
            widgetDimensions: widget.getDimensions(),
            widgetStyle: widget.getWidgetStyles(),
            widgetPosition: widget.getPolygon().getPoints(),
            widgetType: widget.getType(),
            widgetName: widget.getId(),
        }));

        const jsonSavedPlan: string = JSON.stringify(widgetsOnPlan);
        const jsonEmail: string = JSON.stringify(email);
        const jsonPlanName: string = JSON.stringify(name).replace('"', '');

        const regex = new RegExp(/"/); //removes the speech marks from the filename
        const fileName = `${jsonPlanName}.json`;
        const filePath = fileName.replace(regex, '');

        const url = 'https://symfony-sandbox.dev.wrenkitchens.com/saved-plans/add';
        sendData(filePath, jsonEmail, jsonSavedPlan, url);
    }

    public loadPlan(planToDisplay: any[]) {}
}
