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

export class PolygonRepository {
    private widgets: Widget[] = [];

    public findAll(): Widget[] {
        return this.widgets;
    }

    public push(widget: Widget): void {
        this.widgets.push(widget);
    }

    public deletePolygon(id: string): void {
        this.widgets = this.widgets.filter((widget) => widget.getId() !== id);
    }

    public getSelectedPolygon(): Widget {
        return this.widgets.find((widget) => widget.isSelected());
    }

    public deleteAll(): void {
        this.widgets = [];
    }
}
