import { Dimensions } from './Dimensions';
import { UnitSize } from './PolygonFactory';
import { UnitMapping, UnitStyle } from './UnitUtils';

export const UNIT_CATEGORIES = new Map<string, UnitSize[]>([
    ['Wall Units', [UnitSize.WallSizeA, UnitSize.WallSizeB]],
    ['Base Units', [UnitSize.BaseSizeA, UnitSize.BaseSizeB]],
    ['Tower Units', [UnitSize.TowerSizeA, UnitSize.TowerSizeB]],
    ['Decor Units', [UnitSize.DecorSizeA, UnitSize.DecorSizeB]],
    ['Worktop Units', [UnitSize.WorktopSizeA, UnitSize.WorktopSizeB]],
]);

export const UNIT_MAPPING: UnitMapping = {
    [UnitSize.WallSizeA]: {
        borderColour: '#72757B',
        fillColour: '#E5EBF7',
        dimensions: new Dimensions(600, 720, 400),
        unitID: 3762,
    },
    [UnitSize.WallSizeB]: {
        borderColour: '#72757B',
        fillColour: '#E5EBF7',
        dimensions: new Dimensions(600, 720, 330),
        unitID: 3568,
    },
    [UnitSize.BaseSizeA]: {
        borderColour: '#72757B',
        fillColour: '#FFFEE7',
        dimensions: new Dimensions(600, 720, 620),
        unitID: 10810,
    },
    [UnitSize.BaseSizeB]: {
        borderColour: '#72757B',
        fillColour: '#FFFEE7',
        dimensions: new Dimensions(650, 720, 450),
        unitID: 8874,
    },
    [UnitSize.TowerSizeA]: {
        borderColour: '#72757B',
        fillColour: '#FCE5F1',
        dimensions: new Dimensions(500, 1920, 620),
        unitID: 11000,
    },
    [UnitSize.TowerSizeB]: {
        borderColour: '#72757B',
        fillColour: '#FCE5F1',
        dimensions: new Dimensions(500, 1920, 450),
        unitID: 4240,
    },
    [UnitSize.DecorSizeA]: {
        borderColour: '#72757B',
        fillColour: '#121214',
        dimensions: new Dimensions(20, 870, 620),
        unitID: 14000,
    },
    [UnitSize.DecorSizeB]: {
        borderColour: '#72757B',
        fillColour: '#121214',
        dimensions: new Dimensions(20, 870, 450),
        unitID: 14001,
    },
    [UnitSize.WorktopSizeA]: {
        borderColour: '#E8A81A',
        fillColour: '#F0F0F0',
        dimensions: new Dimensions(3000, 40, 600),
        unitID: 1200,
    },
    [UnitSize.WorktopSizeB]: {
        borderColour: '#44B84A',
        fillColour: '#F0F0F0',
        dimensions: new Dimensions(3000, 40, 600),
        unitID: 1201,
    },
};

export function getUnit(unit: UnitSize): UnitStyle {
    return UNIT_MAPPING[unit];
}
