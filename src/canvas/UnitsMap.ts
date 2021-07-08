import { Dimensions } from './Dimensions';
import { UnitSize } from './WidgetRepository';
import { UnitMapping } from './UnitUtils';

export const UNIT_MAPPING: UnitMapping = {
    [UnitSize.WallSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#E5EBF7',
        },
        dimensions: new Dimensions(600, 720, 400),
        unitID: 3762,
    },
    [UnitSize.WallSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#E5EBF7',
        },
        dimensions: new Dimensions(600, 720, 330),
        unitID: 3568,
    },
    [UnitSize.BaseSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FFFEE7',
        },
        dimensions: new Dimensions(600, 720, 620),
        unitID: 10810,
    },
    [UnitSize.BaseSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FFFEE7',
        },
        dimensions: new Dimensions(650, 720, 450),
        unitID: 8874,
    },
    [UnitSize.TowerSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FCE5F1',
        },
        dimensions: new Dimensions(500, 1920, 620),
        unitID: 11000,
    },
    [UnitSize.TowerSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#FCE5F1',
        },
        dimensions: new Dimensions(500, 1920, 450),
        unitID: 4240,
    },
    [UnitSize.DecorSizeA]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#121214',
        },
        dimensions: new Dimensions(20, 870, 620),
        unitID: 14000,
    },
    [UnitSize.DecorSizeB]: {
        widgetStyle: {
            borderColour: '#72757B',
            fillColour: '#121214',
        },
        dimensions: new Dimensions(20, 870, 450),
        unitID: 14001,
    },
    [UnitSize.WorktopSizeA]: {
        widgetStyle: {
            borderColour: '#E8A81A',
            fillColour: '#F0F0F0',
        },
        dimensions: new Dimensions(3000, 40, 600),
        unitID: 1200,
    },
    [UnitSize.WorktopSizeB]: {
        widgetStyle: {
            borderColour: '#44B84A',
            fillColour: '#F0F0F0',
        },
        dimensions: new Dimensions(3000, 40, 600),
        unitID: 1201,
    },
};
