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

export const UNIT_MAPPING: UnitMapping = {
    [UnitSize.WallSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#E5EBF7',
        },
        dimensions: new Dimensions(600, 720, 400),
        price: 10.99,
        unitID: 3762,
    },
    [UnitSize.WallSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#E5EBF7',
        },
        dimensions: new Dimensions(600, 720, 330),
        price: 10.99,
        unitID: 3568,
    },
    [UnitSize.BaseSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FFFEE7',
        },
        dimensions: new Dimensions(600, 720, 620),
        price: 10.99,
        unitID: 10810,
    },
    [UnitSize.BaseSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FFFEE7',
        },
        dimensions: new Dimensions(650, 720, 450),
        price: 10.99,
        unitID: 8874,
    },
    [UnitSize.TowerSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FCE5F1',
        },
        dimensions: new Dimensions(1920, 500, 620),
        price: 10.99,
        unitID: 11000,
    },
    [UnitSize.TowerSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FCE5F1',
        },
        dimensions: new Dimensions(1920, 500, 450),
        price: 10.99,
        unitID: 4240,
    },
    [UnitSize.DecorSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#121214',
        },
        dimensions: new Dimensions(870, 20, 620),
        price: 10.99,
        unitID: 14000,
    },
    [UnitSize.DecorSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#121214',
        },
        dimensions: new Dimensions(870, 20, 450),
        price: 10.99,
        unitID: 14001,
    },
    [UnitSize.WorktopSizeA]: {
        widgetStyle: {
            borderColour: '#E8A81A',
            fillColour: '#F0F0F0',
        },
        dimensions: new Dimensions(1500, 400, 600),
        price: 10.99,
        unitID: 1200,
    },
    [UnitSize.WorktopSizeB]: {
        widgetStyle: {
            borderColour: '#44B84A',
            fillColour: '#F0F0F0',
        },
        dimensions: new Dimensions(1500, 400, 600),
        price: 10.99,
        unitID: 1201,
    },
};
