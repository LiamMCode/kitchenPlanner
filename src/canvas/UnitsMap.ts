import { Dimensions } from './Dimensions';
import { UnitSize } from './PolygonFactory';
import { UnitMapping, UnitStyle } from './UnitUtils';

export const WIDGET_MAP: UnitMapping = {
  [UnitSize.A]: {
    borderColour: '#72757B',
    fillColour: '#E5EBF7',
    dimensions: new Dimensions(600, 720, 400),
    unitID: 3762,
  },
  [UnitSize.B]: {
    borderColour: '#72757B',
    fillColour: '#E5EBF7',
    dimensions: new Dimensions(600, 720, 330),
    unitID: 3568,
  },
  [UnitSize.C]: {
    borderColour: '#72757B',
    fillColour: '#FFFEE7',
    dimensions: new Dimensions(600, 720, 620),
    unitID: 10810,
  },
  [UnitSize.D]: {
    borderColour: '#72757B',
    fillColour: '#FFFEE7',
    dimensions: new Dimensions(650, 720, 450),
    unitID: 8874,
  },
};

export function getUnit(unit: UnitSize): UnitStyle {
  return WIDGET_MAP[unit];
}
