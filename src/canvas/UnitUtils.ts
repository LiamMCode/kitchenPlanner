import { UnitSize } from './PolygonFactory';
import { WIDGET_MAP } from './UnitsMap';

interface UnitStyle {
    borderColour: string, 
    fillColour: string, 
    height: number,
    width: number,
    depth: number,
    unitID: number, 
};

export type UnitMapping = Record<UnitSize, UnitStyle>
//{[key in UnitSize]?: UnitStyle;}

export function pick(a: UnitSize) {
    return WIDGET_MAP[a];
}