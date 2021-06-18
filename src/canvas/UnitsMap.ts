import { Dimensions } from './Dimensions';
import { UnitSize } from './PolygonFactory';
import { UnitMapping, UnitStyle } from './UnitUtils';

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
};

export function getUnit(unit: UnitSize): UnitStyle {
    return UNIT_MAPPING[unit];
}
