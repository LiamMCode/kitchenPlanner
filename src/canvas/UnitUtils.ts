import { Units } from "./PolygonFactory";
import { MAP } from "./UnitsMap";

interface UnitStyle {
    borderColour: string, 
    fillColour: string, 
    height: number,
    width: number,
    depth: number,
    unitID: number, 
}

export type map = Partial<Record<Units, UnitStyle>>;

export function pick(a: Units) {
    return MAP[a];
}