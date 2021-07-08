import { Widget } from './Widget';

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
}
