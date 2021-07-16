import { Dimensions } from './Dimensions';

export interface WidgetStyle {
    fillColour: string;
    borderColour: string;
}

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

export interface UnitStyle {
    widgetStyle: {
        borderColour: string;
        fillColour: string;
    };
    dimensions: Dimensions;
    price: number;
    unitID: number;
}

export type UnitMapping = Record<UnitSize, UnitStyle>;
