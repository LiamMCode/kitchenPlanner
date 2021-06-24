import { Dimensions } from './Dimensions';
import { UnitSize } from './PolygonFactory';

export interface UnitStyle {
    borderColour: string;
    fillColour: string;
    dimensions: Dimensions;
    unitID: number;
}

export type UnitMapping = Record<UnitSize, UnitStyle>;
